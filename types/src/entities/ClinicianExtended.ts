import type { Clinician, User } from '@prisma/client';

export type ClinicianExtended = Clinician & {
  user: Pick<User, 'id' | 'email' | 'photoUrl'> | null;
};
