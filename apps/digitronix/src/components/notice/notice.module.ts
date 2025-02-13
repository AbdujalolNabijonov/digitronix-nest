import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeResolver } from './notice.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import NoticeSchema from '../../schema/Notice.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: NoticeSchema, name: "Notice" }]),
    AuthModule,
    ViewModule
  ],
  providers: [NoticeService, NoticeResolver],
  exports: [NoticeService]
})
export class NoticeModule { }
