import { FactoryName } from '../../../prisma';

/**
 * Information about a label printer available for manual label printing.
 */
export interface LabelPrinter {
  /** Machine ID */
  id: string;
  /** Display name of the printer */
  name: string;
  /** External ID (serial number) used for printing */
  externalId: string;
  /** Lane ID if assigned to a lane */
  laneId: string | null;
  /** Lane name if assigned to a lane */
  laneName: string | null;
}

/**
 * Parameters for fetching available label printers.
 */
export interface GetLabelPrintersParams {
  /** Filter by lane IDs (for CompatibleOrders - show printers from these lanes) */
  laneIds?: string[];
  /** Filter by factory name (for ManualReprintOrders - show all printers in factory) */
  factoryName?: FactoryName;
}
