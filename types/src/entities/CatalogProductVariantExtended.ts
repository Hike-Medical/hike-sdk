import type { CatalogProductVariant } from '../../prisma/index';
import { CatalogProductExtended } from './CatalogProductExtended';

export type CatalogProductVariantExtended = CatalogProductVariant & {
  product: CatalogProductExtended;
};
