import type { CompanyPatient, Patient } from '../../prisma';

export type PatientExtended = Patient & {
  companies?: CompanyPatient[];
  lastVisit?: Date | null;
  isDiabetic?: boolean | null;
  isVeteranAdministration?: boolean | null;
};
