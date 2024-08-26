export interface IUserReportProvider {
  sendReport: (report: {
    purchaseId: number;
    reportData: Record<string, unknown>;
  }) => Promise<boolean>;
}

export const I_USER_REPORT_PROVIDER = Symbol('I_USER_REPORT_PROVIDER');
