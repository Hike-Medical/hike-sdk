export type WorkbenchWebhookStatus = 'ASSETS_READY' | 'ORDER_SUBMITTED' | 'FAILURE' | 'SHIPPED';

export interface CompanyWorkbenchWebhook {
  id: string;
  companySlug?: string;
  workbenchId: string;
  body: Record<string, string>;
  webhookUrl: string;
  webhookStatus: WorkbenchWebhookStatus;
  responseStatus: number;
  responseBody: string;
  sentAt: Date;
  poNumber: string;
  patientName: string;
}
