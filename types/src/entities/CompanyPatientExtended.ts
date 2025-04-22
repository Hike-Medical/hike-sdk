import { CompanyPatient, Patient, User } from '../../prisma/index';

export type CompanyPatientExtended = CompanyPatient & { patient: Patient; user: User | null };
