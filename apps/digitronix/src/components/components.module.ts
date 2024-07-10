import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';

@Module({
  imports: [MemberModule]
})
export class ComponentsModule {}
