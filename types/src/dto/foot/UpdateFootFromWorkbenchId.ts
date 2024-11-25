import { Gender, ShoeWidth, Side } from '../../../prisma';

export interface UpdateFootFromWorkbenchId {
  side: Side;
  shoeWidth?: ShoeWidth | null;
  shoeSize?: number;
  shoeGender?: Gender | null;
}
