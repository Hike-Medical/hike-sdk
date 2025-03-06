import { CompanyPatient, Patient, User } from '../../prisma';

export type CompanyPatientExtended = CompanyPatient & { patient: Patient; user: User | null };
