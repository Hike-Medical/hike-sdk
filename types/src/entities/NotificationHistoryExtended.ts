import { CompanyPatient, NotificationHistory, Patient, User } from '../../prisma';

export type NotificationHistoryExtended = NotificationHistory & {
  patient: (Patient & { companies: (CompanyPatient & { user: User | null })[] }) | null;
};
