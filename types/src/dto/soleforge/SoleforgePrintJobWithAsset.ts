import { Side } from '../../../prisma';
import { SoleforgePrintJob } from './SoleforgeDashboard';

export interface SoleforgePrintJobWithAsset extends SoleforgePrintJob {
  asset: {
    id: string;
    type: string;
    foot: { side: Side } | null;
  };
}
