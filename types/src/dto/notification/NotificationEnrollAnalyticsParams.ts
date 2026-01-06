import type { PagedParams } from '../PagedParams';

export type NotificationAudienceStatus = 'ACTIVE' | 'RETURNING' | 'INACTIVE';

export interface NotificationEnrollAnalyticsParams extends PagedParams {
  status: NotificationAudienceStatus;
  search?: string;
  opened?: 'opened' | 'unopened' | 'undefined';
  notificationId?: string;
}

export interface ExportNotificationEnrollAnalyticsParams {
  status: NotificationAudienceStatus;
  search?: string;
  patientIds?: string[];
  opened?: 'opened' | 'unopened' | 'undefined';
  notificationId?: string;
}
