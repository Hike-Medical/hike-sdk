import { Prisma } from '../../../prisma/index';
import type { PagedParams } from '../PagedParams';

export interface GetAssetsParams extends PagedParams {
  filter?: Partial<
    Record<
      | 'type'
      | 'status'
      | 'foot.patientId'
      | 'foot.patient.companies.externalId'
      | 'foot.patient.companies.userId'
      | 'foot.side'
      | 'foot.workbench.status',
      string
    >
  >;
  sortBy?:
    | 'type'
    | 'status'
    | 'active'
    | 'createdAt'
    | 'updatedAt'
    | 'detectionUpdatedAt'
    | 'foot.side'
    | 'foot.workbench.status';
  sortOrder?: Prisma.SortOrder;
}
