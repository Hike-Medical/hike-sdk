import type { CatalogProductVariant } from '@prisma/client';
import { CatalogProductExtended } from './CatalogProductExtended';

export type CatalogProductVariantExtended = CatalogProductVariant & {
  product: CatalogProductExtended;
};
