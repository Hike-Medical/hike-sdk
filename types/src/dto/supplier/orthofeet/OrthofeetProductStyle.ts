export interface OrthofeetProductStyle {
  name: string;
  value: string;
  image: string | null;
  price: number; // lowest non-zero price from all products in style
}
