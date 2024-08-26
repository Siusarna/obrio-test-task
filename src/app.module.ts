import { Module } from '@nestjs/common';
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";
import config from "./common/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ],
})
export class AppModule {}
