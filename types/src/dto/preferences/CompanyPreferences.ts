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
    removeShoeCatalogPricing?: boolean;
  };
  useHikeOrthofeetWarehouse?: boolean;
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
    /**
     * Product filters per supplier. Allows companies to restrict which products are shown in the catalog.
     * Key is the supplier ID.
     */
    productFilters?: Record<
      string,
      {
        /** 'include' = whitelist (only show these), 'exclude' = blacklist (hide these) */
        mode: 'include' | 'exclude';
        /** Filter by specific product IDs (parent products) */
        productIds?: string[];
        /** Filter by category IDs */
        categoryIds?: string[];
        /** Filter by style_name attribute (Orthofeet-specific) */
        styleNames?: string[];
      }
    >;
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
    monthlyOrderQuantity?: number;
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
      idpOnly?: boolean;
    };
    showLogo?: boolean;
  };
  hideConsumerExternalId?: boolean;
  insuranceEligibility?: {
    tradingPartnerId: string;
    tradingPartnerName: string;
    groupNumber?: string; // Eligibility fails when group numbers mismatch
  };
  consumerPaymentCoupon?: boolean;
}
