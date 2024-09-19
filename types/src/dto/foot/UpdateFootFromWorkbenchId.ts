import { ShoeWidth, Side } from '../../../prisma';

export interface UpdateFootFromWorkbenchId {
  side: Side;
  shoeWidth?: ShoeWidth;
  shoeSize?: number;
}
