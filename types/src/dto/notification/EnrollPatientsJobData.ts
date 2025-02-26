import { AppId } from '../../config/AppId';
import { EnrollPatientsParams } from './EnrollPatientsParams';

export interface EnrollPatientsJobData {
  notificationId: string;
  params: EnrollPatientsParams;
  companyId: string;
  appId: AppId;
}
