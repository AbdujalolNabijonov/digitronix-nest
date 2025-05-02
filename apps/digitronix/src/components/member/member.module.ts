import { Module } from '@nestjs/common';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import MemberSchema from '../../schema/Member.model';
import { AuthModule } from '../auth/auth.module';
import { LikeModule } from '../like/like.module';
import { ViewModule } from '../view/view.module';
import { MailerModule } from '../mailer/mailer.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Member", schema: MemberSchema }]),
    AuthModule,
    LikeModule,
    ViewModule,
    MailerModule
  ],
  providers: [MemberResolver, MemberService],
  exports: [MemberService]
})
export class MemberModule { }
