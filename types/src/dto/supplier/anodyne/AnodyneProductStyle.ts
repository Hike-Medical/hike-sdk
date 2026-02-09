export interface AnodyneProductStyle {
  name: string;
  value: string;
  image: string | null;
  featured: boolean;

  /**
   * The lowest non-zero price from all variants of this style. If no variants have a price, this will be 0.
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
