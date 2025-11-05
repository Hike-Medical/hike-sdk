import type { PagedParams } from '../PagedParams';

export interface NotificationEnrollAnalyticsParams extends PagedParams {
  status: 'ACTIVE' | 'INACTIVE';
  search?: string;
  opened?: 'opened' | 'unopened' | 'undefined';
}

export interface ExportNotificationEnrollAnalyticsParams {
  status: 'ACTIVE' | 'INACTIVE';
  search?: string;
  patientIds?: string[];
  opened?: 'opened' | 'unopened' | 'undefined';
}
