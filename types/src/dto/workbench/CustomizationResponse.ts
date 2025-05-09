import { RenderType } from '../manufacturing/RenderType';

export interface CustomizationResponse {
  orderReference?: string;
  productType?: 0 | 2 | 7;
  scanType: RenderType;
  qty?: 1 | 2 | 3;
  other?: string;
  additionalInstructions?: string;
}
