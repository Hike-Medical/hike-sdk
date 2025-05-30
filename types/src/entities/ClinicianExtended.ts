import type { Clinician, User } from '../../prisma';

export type ClinicianExtended = Clinician & {
  noAuthNeeded?: boolean;
  user: Pick<User, 'id' | 'email' | 'photoUrl'> | null;
};
