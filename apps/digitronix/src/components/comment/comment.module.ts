import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import commentSchema from '../../schema/Comment.model';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { MemberModule } from '../member/member.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"Comment",schema:commentSchema}]),
    AuthModule,
    ArticleModule,
    MemberModule,
    ProductModule,
  ],
  providers: [CommentResolver, CommentService]
})
export class CommentModule {}
