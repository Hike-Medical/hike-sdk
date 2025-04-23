import type { Clinician, User } from '../../prisma';

export type ClinicianExtended = Clinician & {
  user: Pick<User, 'id' | 'email' | 'photoUrl'> | null;
};
