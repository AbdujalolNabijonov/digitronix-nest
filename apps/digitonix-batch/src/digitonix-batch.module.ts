import { Module } from '@nestjs/common';
import { DigitonixBatchController } from './digitonix-batch.controller';
import { DigitonixBatchService } from './digitonix-batch.service';

@Module({
  imports: [],
  controllers: [DigitonixBatchController],
  providers: [DigitonixBatchService],
})
export class DigitonixBatchModule {}
