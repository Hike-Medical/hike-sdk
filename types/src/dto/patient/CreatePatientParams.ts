import type { Gender, MaritalStatus } from '../../../prisma';

export interface CreatePatientParams {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender: Gender;
  birthDate?: Date;
  active?: boolean;
  height?: number;
  weight?: number;
  maritalStatus?: MaritalStatus;
  photoUrl?: string;
  deceasedAt?: Date | null;
}
