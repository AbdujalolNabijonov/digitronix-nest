import { Injectable } from '@nestjs/common';
import { Member } from '../../libs/dto/member/member';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { AuthService } from '../auth/auth.service';
import { Message } from '../../libs/common';

@Injectable()
export class MemberService {
    constructor(
        @InjectModel("Member") private readonly memberModel: Model<Member>,
        private readonly authService: AuthService
    ) { };

    public async signup(input: MemberInput): Promise<Member | Error> {
        input["memberPassword"] = await this.authService.hashPassword(input.memberPassword);
        try {
            const member = await this.memberModel.create(input);
            member.accessToken = await this.authService.jwtGenerator(member);
            return member
        } catch (err: any) {
            console.log("Error, Service.model:", err.message);
            return new Error(Message.USED_MEMBER_OR_PHONE)
        }
    }

    public async login(input: LoginInput): Promise<Member | Error> {
        try {
            const member: Member = await this.memberModel.findOne({ memberNick: input.memberNick }).exec();
            if (!member) {
                throw new Error(Message.NO_DATA_FOUND);
            }
            const isCorrectPassword = await this.authService.comparePassword(input.memberPassword, member.memberPassword);
            if (!isCorrectPassword) {
                throw new Error(Message.WRONG_PASSWORD)
            } else {
                member.accessToken = await this.authService.jwtGenerator(member);
                return member
            }
        } catch (err: any) {
            console.log("Error: Service.model:", err.message);
            return err
        }
    }

}
