import { ContactType } from '../../../prisma/index';

export class SendOtpParams {
  contact: string;
  contactType: ContactType;
}
