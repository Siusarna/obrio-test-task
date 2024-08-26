import { ThrottlerOptions } from '@nestjs/throttler/dist/throttler-module-options.interface';
import { RedisOptions } from 'bullmq';

export type ConfigType = {
  port: number;
  log: LogConfig;
  throttlingConfig: Array<ThrottlerOptions>;
  doc: DocConfigType;
  redis: RedisOptions;
};

export type LogConfig = {
  level: string;
};

export type DocConfigType = {
  enableApiDoc: boolean;
};
