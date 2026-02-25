import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ✅ Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // supprime les champs non définis dans le DTO
      forbidNonWhitelisted: true, // rejette les requêtes avec champs inconnus
      transform: true, // transforme automatiquement types (ex: string -> number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
