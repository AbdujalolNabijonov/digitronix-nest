import { Module } from '@nestjs/common';
import { ViewService } from './view.service';

@Module({
  providers: [ViewService]
})
export class ViewModule {}
