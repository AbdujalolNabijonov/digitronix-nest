import { NestFactory } from '@nestjs/core';
import { DigitonixBatchModule } from './digitonix-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(DigitonixBatchModule);
  await app.listen(process.env.PORT_BATCH ?? 3009);
}
bootstrap();
