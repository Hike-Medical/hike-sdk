import { NotificationType, ProductType } from '../../../prisma';
import { ImportRosterParams } from '../roster/ImportRosterParams';

export interface CompanyPreferences {
  carrierServiceCode?: string;
  carrierPreferenceId?: string;
  emailToUser?: boolean;
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
  };
  webhookUrl?: string;
  defaultTimeZone?: string;
  transferConsumerSubmission?: boolean;
  onlyNotificationTypes?: NotificationType[];
}
