import { Side } from '../../../prisma';
import { CompatibleSoleforgeOrder } from './CompatibleSoleforgeOrder';

export interface ManualReprintGcodeAsset {
  id: string;
  side: Side | null;
  printerType: string | null;
}

export interface ManualReprintStlAsset {
  id: string;
  side: Side | null;
}

export interface ManualReprintOrder extends CompatibleSoleforgeOrder {
  /**
   * The reasons this order requires manual reprinting.
   * Examples: 'SIZE_OVER_13', 'SHELL', etc.
   * An order can have multiple reasons.
   */
  manualReprintReasons: string[];
  /**
   * G-code assets available for this order, for direct file download.
   */
  gcodeAssets: ManualReprintGcodeAsset[];
  /**
   * STL (Insole Render) assets available for this order, for manual slicing.
   */
  stlAssets: ManualReprintStlAsset[];
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
