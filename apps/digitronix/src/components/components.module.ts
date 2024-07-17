import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MemberModule, AuthModule, LikeModule, ViewModule, ProductModule]
})
export class ComponentsModule { }
