import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from "ws"
import { AuthService } from '../components/auth/auth.service';
import { Member } from '../libs/dto/member/member';
import * as url from "url"
import { MemberType } from '../libs/enums/member.enum';
import { NoticeService } from '../components/notice/notice.service';
import { NoticeInput } from '../libs/dto/notice/notice.input';
import { shapeIntoMongoObjectId } from '../libs/config';
import moment from 'moment';

interface MessagePayload {
  event: string;
  text: string;
  date: any;
  memberData: Member
}

interface InfoPayload {
  event: string;
  totalClients: number;
  memberData: Member;
  action: string;
}

@WebSocketGateway({ transports: ["websocket"], secure: false })
export class SocketGateway implements OnGatewayInit {
  private logger = new Logger()
  private connectedClients = new Map<WebSocket, Member>()
  private totalClients: number = 0;
  private messages = []

  constructor(
    private readonly authService: AuthService,
    private readonly noticeService: NoticeService
  ) { }

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    this.logger.verbose(`WebSocket Server Initialized && total [${this.totalClients}]`)
  }


  @SubscribeMessage('message')
  async handleMessage(client: WebSocket, payload: any) {
    const member = this.connectedClients.get(client)
    if (payload.event === "notice" && member) {
      const noticeInput: NoticeInput = {
        noticeTitle: payload.noticeTitle,
        noticeContent: payload.noticeContent,
        noticeGroup: payload.noticeGroup,
        memberId: shapeIntoMongoObjectId(member._id),
      }
      if (payload.noticeTargetId) {
        noticeInput.noticeTargetId = shapeIntoMongoObjectId(payload.noticeTargetId)
      }
      await this.noticeService.createNotice(noticeInput)
      const notices = await this.noticeService.getAllNotices(member._id, { limit: 10, search: { noticeGroup: payload.noticeGroup } })
      const noticesMessage = {
        event: "notices",
        notices: notices
      }
      client.send(JSON.stringify(noticesMessage))
      await this.emitMessage(noticesMessage)
    } else {
      const messagePayload: MessagePayload = {
        event: "message",
        text: payload,
        memberData: member,
        date: Date.now()
      }
      this.messages.push(messagePayload)
      await this.emitMessage(messagePayload)
      const messagesPayload = {
        event: "messages",
        messages: this.messages
      }
      await client.send(JSON.stringify(messagesPayload))
    }
  }
  async handleConnection(client: WebSocket, req: any) {
    const member = await this.retrieveAuth(req);
    this.totalClients++;
    this.connectedClients.set(client, member)
    const clientNick: string = member?.memberNick ?? "Guest"
    this.logger.verbose(`Connection [${clientNick}] & total [${this.totalClients}]`, "WebSocket");

    const infoPayload: InfoPayload = {
      event: "info",
      totalClients: this.totalClients,
      memberData: member || null,
      action: "joined",
    }
    this.messages.push(infoPayload)
    if (member) {
      const notices = await this.noticeService.getAllNotices(member, { page: 1, limit: 5, search: {} })
      const noticePayload = {
        event: "notices",
        notices
      }
      await this.emitMessage(noticePayload)
    }
    await this.emitMessage(infoPayload)
    const messagesPayload = {
      event: "messages",
      messages: this.messages
    }
    client.send(JSON.stringify(messagesPayload))
  }

  async retrieveAuth(req: any) {
    try {
      const urlParse = url.parse(req.url, true)
      const { token } = urlParse.query;
      let member = null
      if (token) {
        member = await this.authService.jwtVerify(token as string)
      }
      return member
    } catch (err: any) {
      console.log(`Error: retrieveAuth, ${err.message}`)
    }
  }
  async emitMessage(msg: any) {
    this.server.clients?.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg))
      }
    })
  }

  async broadCasting(sender: WebSocket, msg: InfoPayload | MessagePayload) {
    this.server.clients.forEach((client: WebSocket) => {
      if (client !== sender) {
        client.send(JSON.stringify(msg))
      }
    })
  }

  async handleDisconnect(client: WebSocket, req: any) {
    const member = this.connectedClients.get(client)
    this.totalClients--
    const clientNick: string = member?.memberNick ?? "Guest"
    this.logger.verbose(`Connection [${clientNick}] & total [${this.totalClients}]`, "WebSocket");

    const infoPayload: InfoPayload = {
      event: "info",
      totalClients: this.totalClients,
      memberData: member || null,
      action: "left",
    }

    await this.broadCasting(client, infoPayload)
  }

}
