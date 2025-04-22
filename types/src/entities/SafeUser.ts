import { User } from '../../prisma/index';

export type SafeUser = Omit<User, 'password' | 'pin'>;
