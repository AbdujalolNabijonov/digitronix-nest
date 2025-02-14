import { Module } from '@nestjs/common';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';
import { MongooseModule } from '@nestjs/mongoose';
import followSchema from '../../schema/Follow.model';
import { MemberModule } from '../member/member.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Follow", schema: followSchema }]),
    MemberModule,
    AuthModule
  ],
  providers: [FollowResolver, FollowService],
  exports:[FollowService]
})
export class FollowModule { }
