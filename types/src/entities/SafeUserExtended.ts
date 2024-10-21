import { UserExtended } from './UserExtended';

export type SafeUserExtended = Omit<UserExtended, 'password' | 'pin'>;
