import { CommunicationChannel, NotificationResponseType } from '../../../prisma/index';

export interface CreateCampaignParams {
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  recurrencePattern?: string;
  active?: boolean;
  message: string;
  isSurvey?: boolean;
  responseType?: NotificationResponseType;
  limit?: number;
  channel: CommunicationChannel;
  emailTemplateId?: string;
  pathwayId?: string;
}
