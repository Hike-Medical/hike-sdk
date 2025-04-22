import { Company } from '../../prisma/index';

export type SafeCompany = Pick<Company, 'id' | 'name' | 'slug' | 'logoUrl' | 'url' | 'createdAt'>;
