import { Contact } from '@prisma/client';

export type ContactAddress = Pick<Contact, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'postalCode'>;
