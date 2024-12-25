import { User } from '../../prisma';

export type SafeUser = Omit<User, 'password' | 'pin'>;
