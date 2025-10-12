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

export interface EnrollPatientsMessageJobData extends EnrollPatientsJobData {
  messageId: string;
  messageJobId: string;
  delayMs?: number;
  batchOffset: number;
  batchIndex: number;
  batchSize: number;
  totalBatches: number;
  totalPatients: number;
  batchJobIds?: string[]; // All descendant batch job IDs (stored only in root message job)
}
