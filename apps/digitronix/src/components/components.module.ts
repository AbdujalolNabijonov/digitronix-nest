import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MemberModule, ProductModule]
})
export class ComponentsModule {}
