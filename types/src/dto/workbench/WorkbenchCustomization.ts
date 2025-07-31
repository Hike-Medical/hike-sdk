import { ClinicalFlowType } from '../company/ClinicalFlowType';
import { RenderType } from '../manufacturing/RenderType';

export interface WorkbenchCustomization {
  flowType?: ClinicalFlowType;
  scanType?: RenderType;
}
