import { WorkbenchNotes as PrismaWorkbenchNotes } from '../../../prisma';

export interface Block {
  image: string;
  original: string;
  description: string;
  width?: number;
  height?: number;
  canvas: any[];
}

export interface Notes extends Omit<PrismaWorkbenchNotes, 'blocks'> {
  blocks: Block[];
}
