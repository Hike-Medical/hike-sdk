import { Clinician, Department, Facility, Patient, User } from '../../prisma';
import { SafeCompany } from './SafeCompany';

export interface TagResult {
  users?: Omit<User, 'password' | 'pin'>[];
  patients?: Patient[];
  clinicians?: Clinician[];
  companies?: SafeCompany[];
  departments?: Department[];
  facilities?: Facility[];
}
