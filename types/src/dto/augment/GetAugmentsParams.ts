import { DetectionType, Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetAugmentsParams extends PagedParams {
  filter?: Partial<
    Record<
      | 'assetId'
      | 'type'
      | 'asset.foot.workbenchId'
      | 'asset.foot.patientId'
      | 'asset.foot.patient.companies.userId'
      | 'pathologies',
      string
    >
  >;
  sortBy?: 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
  /** Filter augments created after this date (inclusive). Format: YYYY-MM-DD */
  startDate?: string;
  /** Filter augments created before this date (inclusive). Format: YYYY-MM-DD */
  endDate?: string;
  /** Filter by pathology detected either in media or detection type. */
  pathology?: DetectionType;
}
