import axios from 'axios';
import { IUserReportProvider } from '../../../domain/IUserReportProvider';

export class UserReportHttpProvider implements IUserReportProvider {
  private readonly BASE_URL =
    'https://webhook.site/0170e89e-fce0-428a-b4bb-fb35da29c5a9';
  constructor() {}

  async sendReport(data) {
    try {
      await axios.post(`${this.BASE_URL}/send-report`, {
        body: data,
      });

      return true;
    } catch (e) {
      throw e;
    }
  }
}
