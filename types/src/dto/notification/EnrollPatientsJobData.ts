import { CompanyRole } from '../../../prisma';
import { AppId } from '../../config/AppId';
import { EnrollPatientsParams } from './EnrollPatientsParams';

export interface EnrollPatientsJobData {
  params: EnrollPatientsParams;
  notificationId: string;
  workbenchId?: string;
  companyId: string;
  appId: AppId;
  role?: CompanyRole;
}

export interface EnrollPatientsMessageRootJobData extends EnrollPatientsJobData {
  messageId: string;
  batchSize: number;
  totalBatches: number;
  totalPatients: number;
  batchJobIds?: string[]; // All descendant batch job IDs
}

export interface EnrollPatientsMessageJobData extends EnrollPatientsJobData {
  messageId: string;
  rootJobId: string;
  delayMs?: number;
  batchOffset: number;
  batchIndex: number;
  batchSize: number;
  totalBatches: number;
  totalPatients: number;
}
