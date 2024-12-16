import { ContactType } from '../../../prisma';

export class SendOtpParams {
  contact: string;
  contactType: ContactType;
}
