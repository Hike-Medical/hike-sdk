import type { Gender, MaritalStatus } from '../../../prisma';

export interface CreatePatientParams {
  externalId?: string | null;
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  gender?: Gender | null;
  birthDate?: Date | null;
  height?: number | null;
  weight?: number | null;
  maritalStatus?: MaritalStatus | null;
  photoUrl?: string | null;
  primaryPhysicianId?: string | null;
  deceasedAt?: Date | null;
  active?: boolean;
}
