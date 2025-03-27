import { CompanyRole } from '../../../prisma';

export interface CreateUserParams {
  name?: string;
  email: string;
  password: string;
  role: CompanyRole;
}
