import type { CompanyPatient, Contact, Evaluation, Patient } from '../../prisma';

export type PatientExtended = Patient & {
  companies?: (CompanyPatient & { contact?: Contact | null })[];
  evaluations?: Pick<Evaluation, 'id' | 'isDiabetic' | 'isVeteran' | 'startedAt' | 'cancelledAt' | 'submittedAt'>[];
};
