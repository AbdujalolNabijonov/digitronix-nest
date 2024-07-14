import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { MongooseModule } from '@nestjs/mongoose';
import LikeSchema from '../../schema/Like.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: LikeSchema, name: "Like" },]),
  ],
  providers: [LikeService],
  exports: [LikeService]
})
export class LikeModule { }
