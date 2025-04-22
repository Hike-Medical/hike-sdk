import { CompanyRole } from '@prisma/client';

export interface CreateUserParams {
  name?: string;
  email: string;
  password: string;
  role: CompanyRole | null;
}
