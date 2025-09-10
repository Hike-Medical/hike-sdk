import { RenderType } from '../manufacturing/RenderType';
import { ClinicalFlowType } from '../preferences/ClinicalFlowType';

export interface WorkbenchCustomization {
  flowType?: ClinicalFlowType;
  scanType?: RenderType;
  externalId?: string;
}
