import { CompanyRole } from '../../../prisma';
import { AppId } from '../../config/AppId';
import { EnrollPatientsParams } from './EnrollPatientsParams';

export interface EnrollPatientsJobData {
  notificationId: string;
  params: EnrollPatientsParams;
  role?: CompanyRole;
  companyId: string;
  appId: AppId;
}
