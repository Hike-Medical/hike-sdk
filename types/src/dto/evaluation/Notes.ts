import { EvaluationNotes as PrismaEvaluationNotes } from '../../../prisma';

export interface Block {
  image: string;
  original: string;
  description: string;
  canvas: any[];
}

export interface Notes extends Omit<PrismaEvaluationNotes, 'blocks'> {
  blocks: Block[];
}
