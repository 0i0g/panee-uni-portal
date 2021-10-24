import { NestFactory } from '@nestjs/core';
import * as moment from 'moment';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  // moment.locale('vi-vn');
  moment().format('L');
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  await app.listen(8080);
}
bootstrap();
