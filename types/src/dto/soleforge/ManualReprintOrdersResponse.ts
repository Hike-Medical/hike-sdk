import { CompatibleSoleforgeOrder } from './CompatibleSoleforgeOrder';

export interface ManualReprintOrder extends CompatibleSoleforgeOrder {
  /**
   * The reason this order requires manual reprinting.
   * Examples: 'SIZE_OVER_13', 'SPECIAL_MATERIAL', etc.
   */
  manualReprintReason: string;
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
