import { CompanyPatient, NotificationHistory, Patient, User } from '@prisma/client';

export type NotificationHistoryExtended = NotificationHistory & {
  patient: Patient & { companies: (CompanyPatient & { user: User | null })[] };
};
