import { CompanyPatient, NotificationHistory, Patient, User } from '../../prisma/index';

export type NotificationHistoryExtended = NotificationHistory & {
  patient: Patient & { companies: (CompanyPatient & { user: User | null })[] };
};
