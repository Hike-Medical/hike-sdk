import type { NotificationAudienceStatus } from '../dto/notification/NotificationEnrollAnalyticsParams';

export interface NotificationEnrollAnalyticsRow {
  patientId: string;
  companyId: string;
  externalId: string | null;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  shippingAddress: string | null;
  status: NotificationAudienceStatus;
}
