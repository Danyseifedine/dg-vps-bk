import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = process.env.PORT ?? 4000;
  // On the server HOST=127.0.0.1 so the API is only reachable through nginx.
  const host = process.env.HOST;
  await (host ? app.listen(port, host) : app.listen(port));
}
await bootstrap();
