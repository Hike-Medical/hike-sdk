import { EntityType } from '@prisma/client';

export interface UpsertTagParams {
  name: string;
  description?: string;
  entityId: string;
  entityType: EntityType;
}
