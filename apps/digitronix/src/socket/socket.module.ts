import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from '../components/auth/auth.module';
import { NoticeModule } from '../components/notice/notice.module';

@Module({
  imports:[
    AuthModule,
    NoticeModule
  ],
  providers: [SocketGateway]
})
export class SocketModule {}
