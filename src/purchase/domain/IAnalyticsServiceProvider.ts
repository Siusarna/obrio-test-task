import { Purchase } from './types/purchase.dto';

export interface IAnalyticsServiceProvider {
  sendEvent: (data: Purchase) => Promise<boolean>;
}

export const I_ANALYTICS_SERVICE_PROVIDER = Symbol(
  'I_ANALYTICS_SERVICE_PROVIDER',
);
