import { ThrottlerOptions } from '@nestjs/throttler/dist/throttler-module-options.interface';

export type ConfigType = {
  port: number;
  log: LogConfig;
  throttlingConfig: Array<ThrottlerOptions>;
  doc: DocConfigType;
};

export type LogConfig = {
  level: string;
};

export type DocConfigType = {
  enableApiDoc: boolean;
};
