import { CareType, Side, VerticalPosition } from '../../../prisma';
<<<<<<< Updated upstream
import { CareOrderType } from './../order/CareOrderType';
=======
import { CareOrderType } from './../../../../../../../cpo-mono/packages/hike-sdk/types/src/dto/order/CareOrderType';
>>>>>>> Stashed changes

/**
 * Data transfer object for creating an evaluation.
 */
export interface CreateEvaluationParams {
  externalId?: string;
  poNumber?: string;
  type: CareType;
<<<<<<< Updated upstream
  careOrderType?: CareOrderType;
=======
  careOrderType: CareOrderType;
>>>>>>> Stashed changes
  patientId: string;
  deviceTypeId?: string;
  isDiabetic?: boolean;
  deviceSide?: Side;
  devicePosition?: VerticalPosition;
  appointmentAt?: Date;
  appointmentStatus?: string;
  clinicianIds?: string[];
  referringPhysicianId?: string;
  diagnosisId?: string;
  diagnosisedAt?: Date;
  visitTypeId?: string;
  visitedAt?: Date;
  facilityId?: string;
  location?: string;
  prescribedAt?: Date;
  prescribedActive?: boolean;
  workbenchId?: string;
}
