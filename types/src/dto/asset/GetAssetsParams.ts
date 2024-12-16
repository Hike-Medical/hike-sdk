import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetAssetsParams extends PagedParams {
  filter?: Record<'type' | 'status' | 'foot.patientId' | 'foot.side' | 'foot.workbench.status', string>;
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
