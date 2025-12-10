import { FacilityType, NotificationType, ProductType } from '../../../prisma';
import { AppointmentCsvRecord } from '../appointment/AppointmentCsvRecord';
import { CatalogProductCsvRecord } from '../catalog/CatalogProductCsvRecord';
import { RoasterPatientCsvRecord } from '../roster/RoasterPatientCsvRecord';
import { CreateCustomizationsTaikaParams } from '../taika/CreateCustomizationsTaikaParams';
import { ClinicalFlowType } from './ClinicalFlowType';
import { CompanyPortal } from './CompanyPortal';
import { CompanyTheme } from './CompanyTheme';
import { PaymentResponsibility } from './PaymentResponsibility';

export interface CompanyPreferences {
  carrierServiceCode?: string;
  carrierPreferenceId?: string;
  emailToUser?: boolean;
  emailPackingSlips?: string[];
  distributionEmailAddress?: string;
  preferredSubmittedOrderEmailAddress?: string;
  preferredConsumerSubmittedEmail?: string;
  preferredStepZeroEmail?: string;
  preferredVeteranEmailAddress?: string;
  preferredHospitalDeliveryReceiptEmailAddress?: string;
  preferredWalkInDeliveryReceiptEmailAddress?: string;
  preSubmissionAuth?: boolean;
  requiredSnapshotReview?: boolean;
  consumerSubmitRedirectUrl?: string;
  taikaCustomizations?: {
    orderForm?: CreateCustomizationsTaikaParams;
    setTaikaIdAsPONumber?: boolean;
    engravingText?: {
      asExternalId?: boolean;
      withSide?: boolean;
    };
  };
  slicerProfile?: string;
  supplierId?: string;
  outboundNotifications?: {
    removeFSAFooter?: boolean;
  };
  pricing?: {
    billWhenShipped?: boolean;
    paymentResponsibility?: PaymentResponsibility;
    supplierMarkupPercentage?: Record<string, number>;
    consumerReorderDiscount?: number;
  };
  noAuthNeeded?: boolean;
  skipExternalIdVerification?: boolean;
  blockAll?: boolean;
  freeTrialOrders?: number;
  toWordDocx?: boolean;
  roster?: {
    columnMapping: Partial<Record<keyof RoasterPatientCsvRecord, string[]>>;
    dateFormat?: string;
    performDeactivations?: boolean;
  };
  appointments?: {
    columnMapping: Partial<Record<keyof AppointmentCsvRecord, string[]>>;
    timeZone?: string;
  };
  catalog?: {
    columnMapping: Record<string, Partial<Record<keyof CatalogProductCsvRecord, string[]>>>;
  };
  rushAll?: boolean;
  hideInEnrollList?: boolean;
  productType?: ProductType;
  clinicalCustomization?: {
    removeRemake?: boolean;
    removeReorder?: boolean;
    removeDuplicate?: boolean;
    assignPONumber?: boolean;
    removeNotes?: boolean;
    flowType?: ClinicalFlowType | null;
    showDirectedTips?: boolean;
    globalSearchAssignedOnly?: boolean;
    canModifyFlowTypeOnWorkbench?: boolean;
    autoAttachFormSchemaIds?: string[];
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
  compliance?: {
    fromFaxNumber?: string;
    forwardFaxNumber?: string;
    npi?: {
      name: string;
      value: string;
    };
  };
  auth?: {
    allowlist?: {
      domains?: string[];
      emails?: string[];
      phones?: string[];
      rosterOnly?: boolean;
    };
    oidc?: {
      enabled?: boolean;
      color?: string;
      facilityRequired?: boolean;
      facilityType?: FacilityType;
    };
    saml?: {
      enabled?: boolean;
      color?: string;
      facilityRequired?: boolean;
      facilityType?: FacilityType;
    };
    showLogo?: boolean;
  };
  hideConsumerExternalId?: boolean;
  eligibilityTradingPartner?: string;
}
