import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
