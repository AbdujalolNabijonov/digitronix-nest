import { Module } from '@nestjs/common';
import { DigitonixBatchController } from './digitonix-batch.controller';
import { DigitonixBatchService } from './digitonix-batch.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import productSchema from 'apps/digitronix/src/schema/Product.model';
import MemberSchema from 'apps/digitronix/src/schema/Member.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development" }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      {schema:productSchema,name:"Product"},
      {schema:MemberSchema, name:"Member"}
    ])
  ],
  controllers: [DigitonixBatchController],
  providers: [DigitonixBatchService],
})
export class DigitonixBatchModule { }
