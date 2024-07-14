import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [MemberModule, ProductModule, AuthModule, LikeModule]
})
export class ComponentsModule {}
