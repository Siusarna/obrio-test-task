import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';

export function setupSwagger(app: INestApplication, routerPrefix?: string) {
  const documentation = new DocumentBuilder()
    .setTitle('OBRIO REST-API interface')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentation, {
    include: [UserModule, PurchaseModule],
  });

  const pathTree = ['api-doc'];
  if (routerPrefix) {
    pathTree.unshift(routerPrefix);
  }

  SwaggerModule.setup(pathTree.join('/'), app, document);
}
