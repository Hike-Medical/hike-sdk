import { CompanyRole } from '../../../prisma/index';

export interface CreateUserParams {
  name?: string;
  email: string;
  password: string;
  role: CompanyRole | null;
}
