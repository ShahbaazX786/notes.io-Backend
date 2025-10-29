import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const validationConfig = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  };
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(validationConfig));

  await app.listen(3200).then(() => console.log('Server running on port 3200'));
}
bootstrap();
