import { Controller, Get, Logger } from '@nestjs/common';
import { DigitonixBatchService } from './digitonix-batch.service';
import { Cron, Timeout } from '@nestjs/schedule';

@Controller()
export class DigitonixBatchController {
  readonly logger = new Logger()
  constructor(private readonly digitonixBatchService: DigitonixBatchService) { }

  @Timeout(2000)
  handleConnection() {
    this.logger["context"] = "=== BATCH STARTS ==="
    this.logger.debug("Batch is now working!")
  }
  @Cron("00 00 01 * * *")
  async handleRollback() {
    this.logger["context"] = "BATCH ROLL BACK";
    this.logger.debug("EXECUTED");
    await this.digitonixBatchService.handleRollback()
  }

  @Cron("00 10 01 * * *")
  async handleTopProperties() {
    this.logger["context"] = "BATCH TOP PRODUCTS";
    this.logger.debug("EXECUTED");
    await this.digitonixBatchService.handleTopProducts()
  }

  @Cron("00 20 01 * * *")
  async handleTopAgents() {
    this.logger["context"] = "BATCH TOP RETAILERS";
    this.logger.debug("EXECUTED");
    await this.digitonixBatchService.handleTopRetailers()
  }

}
