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
  sequence?: number; // Message sequence number for nested chaining
  batchSize: number;
  totalBatches: number;
  totalPatients: number;
  totalProcessed?: number;
  batchJobIds?: string[]; // All descendant batch job IDs
  tagCursor?: string | null; // Current cursor position for tag-based enrollment pagination
}

export interface EnrollPatientsMessageJobData extends EnrollPatientsJobData {
  messageId: string;
  sequence?: number; // Message sequence number, copied from root for display/sorting
  rootJobId: string;
  delayMs?: number;
  batchIndex: number;
  batchSize: number;
  totalBatches: number;
  totalPatients?: number; // Initial estimate
}
