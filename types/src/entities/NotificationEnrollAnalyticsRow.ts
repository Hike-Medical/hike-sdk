export interface NotificationEnrollAnalyticsRow {
  patientId: string;
  companyId: string;
  externalId: string | null;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  status: 'ACTIVE' | 'INACTIVE';
}
