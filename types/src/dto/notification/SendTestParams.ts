import { CompanyRole } from '../../../prisma/index';
import { AppId } from '../../config/AppId';

export interface SendTestParams {
  impersonate: string;
  contacts: string[];
  workbenchId?: string;
  appId: AppId;
  role?: CompanyRole;
}
