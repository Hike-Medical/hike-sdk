import { NotificationType, ProductType } from '../../../prisma';
import { ImportRosterParams } from '../roster/ImportRosterParams';
import { ClinicalFlowType } from './ClinicalFlowType';
import { CompanyPortal } from './CompanyPortal';
import { CompanyTheme } from './CompanyTheme';

export interface CompanyPreferences {
  carrierServiceCode?: string;
  carrierPreferenceId?: string;
  emailToUser?: boolean;
  emailPackingSlips?: string[];
  distributionEmailAddress?: string;
  preferredSubmittedOrderEmailAddress?: string;
  preferredConsumerSubmittedEmail?: string;
  preferredVeteranEmailAddress?: string;
  preferredHospitalDeliveryReceiptEmailAddress?: string;
  preferredWalkInDeliveryReceiptEmailAddress?: string;
  preSubmissionAuth?: boolean;
  requiredSnapshotReview?: boolean;
  modifyTaikaHeelStyle?: boolean;
  pricing?: {
    orthoFeetPricingMultiplierPercentage?: number;
    billWhenShipped?: boolean;
  };
  noAuthNeeded?: boolean;
  engraveInsoleWithExternalId?: boolean;
  freeTrialOrders?: number;
  toWordDocx?: boolean;
  roster?: Pick<ImportRosterParams, 'columnMapping' | 'dateFormat'>;
  rushAll?: boolean;
  hideInEnrollList?: boolean;
  productType?: ProductType;
  clinicalCustomization?: {
    removeRemake?: boolean;
    removeReorder?: boolean;
    assignPONumber?: boolean;
    removeNotes?: boolean;
    flowType?: ClinicalFlowType | null;
    showDirectedTips?: boolean;
  };
  webhook?: {
    url: string;
    headers?: Record<string, string>;
    identifier?: string;
  }[];
  defaultTimeZone?: string;
  transferConsumerSubmission?: boolean;
  onlyNotificationTypes?: NotificationType[];
  setTaikIdAsPONumber?: boolean;
  allowPatientIdEditable?: boolean;
  orderDeliveryETA?: Record<string, number>;
  diabeticPatients?: string;
  patientVolume?: string;
  portals?: CompanyPortal[];
  ui?: {
    theme?: CompanyTheme;
  };
}
