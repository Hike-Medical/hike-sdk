import { Company } from '../../prisma';

export type SafeCompany = Pick<Company, 'id' | 'name' | 'slug' | 'logoUrl' | 'url' | 'createdAt' | 'active'>;
