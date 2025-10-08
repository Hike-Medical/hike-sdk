import { CompanyRole } from '../../../prisma';
import { AppId } from '../../config/AppId';
import { EnrollPatientsParams } from './EnrollPatientsParams';

export interface EnrollPatientsJobData {
  messageId: string;
  params: EnrollPatientsParams;
  workbenchId?: string;
  companyId: string;
  appId: AppId;
  role?: CompanyRole;

  /**
   * Tracks the offset for super-batch processing for splitting large enrollments into multiple delayed jobs.
   */
  batchOffset?: number;

  /**
   * Total number of patients to process across all batches for accurate progress tracking in chained jobs.
   */
  totalPatients?: number;
}
