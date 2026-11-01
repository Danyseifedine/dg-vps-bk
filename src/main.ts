import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Reject requests with missing, wrong-typed, or unknown fields.
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  // Close the database connection cleanly when systemd stops the app.
  app.enableShutdownHooks();
  const port = process.env.PORT ?? 4000;
  // On the server HOST=127.0.0.1 so the API is only reachable through nginx.
  const host = process.env.HOST;
  await (host ? app.listen(port, host) : app.listen(port));
}
await bootstrap();
