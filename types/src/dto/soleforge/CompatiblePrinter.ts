import { Lane, Machine, Printer3D } from '../../../prisma';

export interface CompatiblePrinter extends Printer3D {
  machine: Machine & {
    lane: Lane | null;
  };
}
