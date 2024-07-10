import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World this is the main sever!';
  }
}
