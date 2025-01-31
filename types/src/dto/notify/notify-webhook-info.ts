export interface NotifyWebhookInfo {
  id: string;
  workbenchId: string;
  body: Record<string, string>;
  webhookUrl: string;
  webhookStatus: string;
  responseStatus: number;
  responseBody: Record<string, string>;
  sentAt: Date;
}
