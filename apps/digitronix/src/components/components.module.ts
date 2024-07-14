import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [MemberModule, ProductModule, AuthModule, LikeModule, ViewModule]
})
export class ComponentsModule {}
