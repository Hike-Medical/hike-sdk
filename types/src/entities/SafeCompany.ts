import { Company } from '@prisma/client';

export type SafeCompany = Pick<Company, 'id' | 'name' | 'slug' | 'logoUrl' | 'url' | 'createdAt'>;
