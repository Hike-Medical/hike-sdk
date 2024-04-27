import type { User, UserCompany } from '../../prisma';

export type UserExtended = User & {
  companies: UserCompany[];
};
