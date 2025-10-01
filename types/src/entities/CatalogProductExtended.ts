import type { CatalogCategory, CatalogProduct, CatalogProductAttribute, CatalogSupplier } from '../../prisma';

export type CatalogProductExtended = CatalogProduct & {
  attributes: CatalogProductAttribute[];
  parent: CatalogProduct | null;
  children: CatalogProduct[];
  categories: CatalogCategory[];
  suppliers: CatalogSupplier[];
};
