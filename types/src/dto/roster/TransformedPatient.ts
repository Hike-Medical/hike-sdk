import { Gender } from '../../../prisma';
import { TransformedContact } from '../contact/TransformedContact';

export interface TransformedPatient {
  externalId: string;
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  gender?: Gender | null;
  birthDate?: Date | null;
  height?: number | null;
  weight?: number | null;
  email?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  primaryPhysician?: string | null;
  primaryPhysicianNpi?: string | null;
  contact?: TransformedContact;
  department?: string;
  facility?: {
    name: string;
    contact?: TransformedContact;
  };
  site?: {
    name: string;
    contact?: TransformedContact;
  };
}
