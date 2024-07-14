import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { MongooseModule } from '@nestjs/mongoose';
import ViewSchema from '../../schema/View.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: ViewSchema, name: "View" }])
  ],
  providers: [ViewService],
  exports: [ViewService]
})
export class ViewModule { }
