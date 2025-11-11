import { Address } from './address';

type Gender = 'M' | 'F' | 'U';

export interface Subscriber {
  memberId?: string;
  firstName?: string;
  lastName: string;
  dateOfBirth?: string; // Format: YYYYMMDD
  gender?: Gender;
  address?: Address;
  ssn?: string;
}

export interface PatientInput {
  memberId?: string;
  firstName?: string;
  lastName: string;
  dateOfBirth?: string; // Format: YYYY-MM-DD
  gender?: Gender;
  address?: Address;
  ssn?: string;
}

export interface Dependent extends Subscriber {
  relationshipToSubscriber?: string;
}
