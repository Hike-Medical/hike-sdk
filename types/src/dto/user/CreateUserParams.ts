import { CompanyRole } from '../../../prisma';

export interface CreateUserParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role: CompanyRole;
}
