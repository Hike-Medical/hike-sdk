import type { CatalogProductVariant } from '../../prisma';
import { CatalogProductExtended } from './CatalogProductExtended';

export type CatalogProductVariantExtended = CatalogProductVariant & {
  product: CatalogProductExtended;
};
