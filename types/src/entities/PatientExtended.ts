import type { CompanyPatient, Evaluation, Patient } from '../../prisma';

export type PatientExtended = Patient & {
  companies?: CompanyPatient[];
  evaluations?: Pick<Evaluation, 'id' | 'isDiabetic' | 'isVeteran' | 'startedAt' | 'cancelledAt' | 'submittedAt'>[];
};
