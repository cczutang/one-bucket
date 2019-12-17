import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as helmet from 'helmet';
import { TransformInterceptor } from './shared/transform.interceptor';
import { HttpExceptionFilter } from './shared/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  setupSwagger(app);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  await app.listen(8000, () => {
    Logger.log('【启动成功】，访问文档 http://localhost:8000/api/docs');
  });
}
bootstrap().catch(e => Logger.error(e));
