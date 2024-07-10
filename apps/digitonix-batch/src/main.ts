import { NestFactory } from '@nestjs/core';
import { DigitonixBatchModule } from './digitonix-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(DigitonixBatchModule);
  await app.listen(3007);
}
bootstrap();
