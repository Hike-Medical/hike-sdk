import { Contact } from '../../prisma';

export type ContactAddress = Pick<Contact, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'postalCode'>;
