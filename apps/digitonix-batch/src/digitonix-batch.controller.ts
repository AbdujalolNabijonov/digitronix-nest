import { Controller, Get } from '@nestjs/common';
import { DigitonixBatchService } from './digitonix-batch.service';

@Controller()
export class DigitonixBatchController {
  constructor(private readonly digitonixBatchService: DigitonixBatchService) {}

  @Get()
  getHello(): string {
    return this.digitonixBatchService.getHello();
  }
}
