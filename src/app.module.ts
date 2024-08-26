import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './common/config';
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bullmq';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PurchaseModule,
  ],
})
export class AppModule {}
