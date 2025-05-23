import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetAugmentsParams extends PagedParams {
  filter?: Partial<
    Record<
      | 'assetId'
      | 'type'
      | 'asset.foot.workbenchId'
      | 'asset.foot.patientId'
      | 'asset.foot.patient.companies.userId',
      string
    >
  >;
  sortBy?: 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
