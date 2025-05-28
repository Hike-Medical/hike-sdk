import { CustomizationOrderTaikaParams } from './CustomizationOrderTaikaParams';
import { FootTaikaParams } from './FootTaikaParams';
import { PatientInformationTaikaParams } from './PatientInformationTaikaParams';

export interface CreateCustomizationsTaikaParams {
  order?: CustomizationOrderTaikaParams;
  patientInformation?: PatientInformationTaikaParams;
  left?: FootTaikaParams;
  right?: FootTaikaParams;
}
