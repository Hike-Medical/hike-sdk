import { Clinician, Department, Facility, Patient } from '@prisma/client';
import { SafeCompany } from './SafeCompany';
import { SafeUser } from './SafeUser';

export interface TagResult {
  users?: SafeUser[];
  patients?: Patient[];
  clinicians?: Clinician[];
  companies?: SafeCompany[];
  departments?: Department[];
  facilities?: Facility[];
}
