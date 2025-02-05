export interface NotifyWebhookInfo {
  id: string;
  workbenchId: string;
  body: Record<string, string>;
  webhookUrl: string;
  webhookStatus: string;
  responseStatus: number;
  responseBody: string;
  sentAt: Date;
  poNumber: string;
  patientName: string;
}
