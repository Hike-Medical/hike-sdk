import type {
  CatalogCategory,
  CatalogProduct,
  CatalogProductAttribute,
  CatalogProductVariant,
  CatalogVendor
} from '../../prisma/index';

export type CatalogProductExtended = CatalogProduct & {
  attributes: CatalogProductAttribute[];
  variants: CatalogProductVariant[];
  categories: CatalogCategory[];
  vendors: CatalogVendor[];
};
