import { Test, TestingModule } from '@nestjs/testing';
import { DigitonixBatchController } from './digitonix-batch.controller';
import { DigitonixBatchService } from './digitonix-batch.service';

describe('DigitonixBatchController', () => {
  let digitonixBatchController: DigitonixBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DigitonixBatchController],
      providers: [DigitonixBatchService],
    }).compile();

    digitonixBatchController = app.get<DigitonixBatchController>(DigitonixBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(digitonixBatchController.getHello()).toBe('Hello World!');
    });
  });
});
