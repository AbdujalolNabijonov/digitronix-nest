import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { ProductModule } from './product/product.module';
import { FollowModule } from './follow/follow.module';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { FaqModule } from './faq/faq.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    MemberModule,
    AuthModule,
    LikeModule,
    ViewModule,
    ProductModule,
    FollowModule,
    ArticleModule,
    CommentModule,
    FaqModule,
    NoticeModule
  ]
})
export class ComponentsModule { }
