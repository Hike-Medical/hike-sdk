import type { CompanyUser, User } from '../../prisma';

export type UserExtended = User & {
  companies: CompanyUser[];
};
