import type {
  CatalogCategory,
  CatalogProduct,
  CatalogProductAttribute,
  CatalogProductVariant,
  CatalogSupplier
} from '../../prisma';

export type CatalogProductExtended = CatalogProduct & {
  attributes: CatalogProductAttribute[];
  variants: CatalogProductVariant[];
  categories: CatalogCategory[];
  suppliers: CatalogSupplier[];
};
