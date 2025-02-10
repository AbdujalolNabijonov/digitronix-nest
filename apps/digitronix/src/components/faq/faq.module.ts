import { Module } from '@nestjs/common';
import { FaqResolver } from './faq.resolver';
import { FaqService } from './faq.service';
import { MongooseModule } from '@nestjs/mongoose';
import faqSchema from '../../schema/Faq.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:
    [
      MongooseModule.forFeature([{ schema: faqSchema, name: "Faq" }]),
      AuthModule
    ],
  providers: [FaqResolver, FaqService],
  exports: []
})
export class FaqModule { }
