import { Module } from '@nestjs/common';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import articleSchema from '../../schema/Article.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { ViewModule } from '../view/view.module';
import { LikeModule } from '../like/like.module';

@Module({
  imports:
    [
      MongooseModule.forFeature([{ schema: articleSchema, name: "Article" }]),
      AuthModule,
      MemberModule,
      ViewModule,
      LikeModule
    ],
  providers: [ArticleResolver, ArticleService]
})
export class ArticleModule { }
