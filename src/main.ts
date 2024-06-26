import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisIoAdapter } from './apps/dazl/backend/adapters/RedisIoAdapter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

console.log('Starting server...', __dirname);
async function main() {
  try {
    console.log('Starting server...');
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PORT);
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    const configService = app.get(ConfigService);
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);

    const config = new DocumentBuilder()
      .setTitle('Backend API')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(configService.get('PORT'));
  } catch (error) {
    console.error(error);
  }
}
main().then(() => console.log(`Server is running on port ${process.env.PORT}`));
