import type { PagedParams } from '../PagedParams';

export interface NotificationEnrollAnalyticsParams extends PagedParams {
  status: 'ACTIVE' | 'INACTIVE';
  search?: string;
}

export interface ExportNotificationEnrollAnalyticsParams {
  status: 'ACTIVE' | 'INACTIVE';
  search?: string;
  patientIds?: string[];
}
