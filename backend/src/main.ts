import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as crypto from 'crypto';

// Polyfill for Node.js < 19.0.0
if (typeof globalThis.crypto === 'undefined') {
  // @ts-ignore
  globalThis.crypto = crypto.webcrypto || crypto;
}
if (typeof globalThis.crypto.randomUUID === 'undefined') {
  // @ts-ignore
  globalThis.crypto.randomUUID = () => crypto.randomUUID();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security: Enable CORS for LAN
  app.enableCors();
  
  // Security: Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Port configuration with fallback logic
  let port = parseInt(process.env.PORT as string) || 3001;
  const maxAttempts = 10;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      await app.listen(port);
      console.log(`Application is running on: http://localhost:${port}`);
      break;
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} is in use, trying ${port + 1}...`);
        port++;
        attempt++;
      } else {
        throw err;
      }
    }
  }

  if (attempt === maxAttempts) {
    console.error(`Could not find an available port after ${maxAttempts} attempts.`);
    process.exit(1);
  }
}
bootstrap();
