import type {
  CatalogCategory,
  CatalogProduct,
  CatalogProductAttribute,
  CatalogProductVariant,
  CatalogVendor
} from '@prisma/client';

export type CatalogProductExtended = CatalogProduct & {
  attributes: CatalogProductAttribute[];
  variants: CatalogProductVariant[];
  categories: CatalogCategory[];
  vendors: CatalogVendor[];
};
