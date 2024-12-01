import { ContactAddress } from '../../entities/ContactAddress';

export interface UpsertContactParams extends Omit<ContactAddress, 'addressLine2'> {
  name?: string;
  phoneNumber?: string;
  addressLine2?: string | null;
}
