import { Side } from '../../../prisma';
import { CompatibleSoleforgeOrder } from './CompatibleSoleforgeOrder';

export interface ManualReprintGcodeAsset {
  id: string;
  side: Side | null;
  printerType: string | null;
}

export interface ManualReprintOrder extends CompatibleSoleforgeOrder {
  /**
   * The reason this order requires manual reprinting.
   * Examples: 'SIZE_OVER_13', 'SPECIAL_MATERIAL', etc.
   */
  manualReprintReason: string;
  /**
   * G-code assets available for this order, for direct file download.
   */
  gcodeAssets: ManualReprintGcodeAsset[];
}

export interface ManualReprintFilterReason {
  reason: string;
  label: string;
  count: number;
}

export interface ManualReprintOrdersResponse {
  orders: ManualReprintOrder[];
  filterReasons: ManualReprintFilterReason[];
}
