import type { CompanyPatient, CompanyUser, Contact, Evaluation, Patient, User } from '@prisma/client';

export type PatientExtended = Patient & {
  companies?: (CompanyPatient & {
    contact?: Contact | null;
    user?:
      | (User & {
          companies?: CompanyUser[];
        })
      | null;
  })[];
  evaluations?: Pick<Evaluation, 'id' | 'isDiabetic' | 'isVeteran' | 'startedAt' | 'cancelledAt' | 'submittedAt'>[];
};
