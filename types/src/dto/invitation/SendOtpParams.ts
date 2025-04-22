import { ContactType } from '@prisma/client';

export class SendOtpParams {
  contact: string;
  contactType: ContactType;
}
