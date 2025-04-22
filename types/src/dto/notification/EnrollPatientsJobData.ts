import { CompanyRole } from '../../../prisma/index';
import { AppId } from '../../config/AppId';
import { EnrollPatientsParams } from './EnrollPatientsParams';

export interface EnrollPatientsJobData {
  messageId: string;
  params: EnrollPatientsParams;
  workbenchId?: string;
  companyId: string;
  appId: AppId;
  role?: CompanyRole;
}
