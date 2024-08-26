import { IAnalyticsServiceProvider } from '../../../domain/IAnalyticsServiceProvider';
import axios from 'axios';

export class AnalyticsServiceHttpProvider implements IAnalyticsServiceProvider {
  private readonly BASE_URL = 'https://webhook.site/0170e89e-fce0-428a-b4bb-fb35da29c5a9';
  constructor() {}

  async sendEvent(data) {
    try {
      await axios.post(`${this.BASE_URL}/send-event`, {
        body: data,
      });
      return true;
    } catch (e) {
      throw e;
    }
  }
}
