import { RenderType } from '../manufacturing/RenderType';

export interface CustomizationOrderTaikaParams {
  referenceTime?: Date;
  orderReference?: string;
  productType: number;
  scanType: RenderType;
  qty: number;
  heelStyle: number;
  other?: string;
  additionalInstructions?: string;
  engravingText?: string;
  engravingDepth?: number;
  moveBottomMedialInwards?: number;
  moveBottomLateralInwards?: number;
  wallThicknessMultiplierMedial?: number;
  wallThicknessMultiplierLateral?: number;
  distalEdgeThickness?: number;
}
