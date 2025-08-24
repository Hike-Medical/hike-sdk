import { CompanyPreferences } from '../preferences/CompanyPreferences';

export interface AcceptInvitationCompanyParams {
  token: string;
  admin: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  company: {
    name: string;
    preferences: Pick<CompanyPreferences, 'diabeticPatients' | 'patientVolume'>;
  };
  isTermsAccepted?: boolean;
}
