import { NotificationType, ProductType } from '../../../prisma';
import { ImportAppointmentsParams } from '../appointment/ImportAppointmentsParams';
import { ImportRosterParams } from '../roster/ImportRosterParams';
import { CreateCustomizationsTaikaParams } from '../taika/CreateCustomizationsTaikaParams';
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
  taikaCustomizations?: {
    orderForm?: CreateCustomizationsTaikaParams;
    setTaikaIdAsPONumber?: boolean;
    engravingText?: {
      asExternalId?: boolean;
      withSide?: boolean;
    };
  };
  pricing?: {
    orthoFeetPricingMultiplierPercentage?: number;
    billWhenShipped?: boolean;
    excludeShoeVendorExport?: boolean;
  };
  noAuthNeeded?: boolean;
  blockAll?: boolean;
  freeTrialOrders?: number;
  toWordDocx?: boolean;
  roster?: Pick<ImportRosterParams, 'columnMapping'>;
  appointments?: Pick<ImportAppointmentsParams, 'columnMapping' | 'timeZone'>;
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
  allowPatientIdEditable?: boolean;
  orderDeliveryETA?: Record<string, number>;
  diabeticPatients?: string;
  patientVolume?: string;
  portals?: CompanyPortal[];
  ui?: {
    theme?: CompanyTheme;
  };
}
