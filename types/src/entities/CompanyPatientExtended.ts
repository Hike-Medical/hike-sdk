import { CompanyPatient, Patient, User } from '@prisma/client';

export type CompanyPatientExtended = CompanyPatient & { patient: Patient; user: User | null };
