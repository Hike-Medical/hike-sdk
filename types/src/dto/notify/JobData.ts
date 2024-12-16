import { AppId } from '../../config/AppId';

export interface JobData {
  patientId: string;
  notifyMessageId: string;
  companyId: string;
  role?: string;
  appId?: AppId;
}
