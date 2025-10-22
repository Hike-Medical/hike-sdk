export interface OrthofeetProductStyle {
  name: string; // from style_name attribute description (fallback to value)
  value: string; // actual attribute value for querying variants
  description: string | null; // from style_name attribute description
  image: string | null; // parent product image, fallback to first non-null
  price: number; // lowest non-zero price from all products in style
}
