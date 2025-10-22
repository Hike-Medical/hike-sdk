export interface OrthofeetProductStyle {
  name: string;
  value: string;
  image: string | null;
  featured: boolean;

  /**
   * The lowest non-zero price from all products in the style. If no products have a price, this will be 0.
   */
  price: number;

  /**
   * The unique genders available for this style.
   */
  genders: string[];

  /**
   * The unique colors available for this style.
   */
  colors: string[];
}
