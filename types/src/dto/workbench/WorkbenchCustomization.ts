import { RenderType } from '../manufacturing/RenderType';
import { ClinicalFlowType } from '../preferences/ClinicalFlowType';

export interface WorkbenchCustomization {
  orderReference?: string;
  productType?: 0 | 2 | 7;
  flowType?: ClinicalFlowType;
  scanType?: RenderType;
  qty?: 1 | 2 | 3;
  other?: string;
  additionalInstructions?: string;
}
