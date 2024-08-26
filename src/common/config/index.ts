import { env } from 'process';
import { ConfigType } from './types';

export default (): ConfigType => ({
  port: getNumericConfig(env.WEB_PORT, 3000)!,
  log: {
    level: env.LOG_LEVEL || 'info',
  },
  throttlingConfig: [
    {
      ttl: 1000,
      limit: 100,
    },
  ],
  redis: {
    host: env.REDIS_HOST || 'localhost',
    port: getNumericConfig(env.REDIS_PORT, 6379),
  },
  doc: {
    enableApiDoc: env.SWAGGER_ENABLED === 'true',
  },
});

function getNumericConfig(
  envValue: string | undefined,
  defaultValue?: number,
): number | undefined {
  try {
    if ([null, undefined, ''].includes(envValue)) {
      return defaultValue;
    }

    const parsedValue = parseInt(envValue!, 10);
    if (Number.isNaN(parsedValue)) {
      return defaultValue;
    }

    return parsedValue;
  } catch (e) {
    return defaultValue;
  }
}
