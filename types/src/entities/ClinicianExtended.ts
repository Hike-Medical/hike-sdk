import type { Clinician, User } from '../../prisma/index';

export type ClinicianExtended = Clinician & {
  user: Pick<User, 'id' | 'email' | 'photoUrl'> | null;
};
