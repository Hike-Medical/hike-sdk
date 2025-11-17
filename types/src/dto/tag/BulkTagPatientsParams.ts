import type { ExportNotificationEnrollAnalyticsParams } from '../notification/NotificationEnrollAnalyticsParams';

export interface BulkTagPatientsParams extends ExportNotificationEnrollAnalyticsParams {
  name: string;
  description?: string;
}
