import { Contact } from '../../prisma/index';

export type ContactAddress = Pick<Contact, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'postalCode'>;
