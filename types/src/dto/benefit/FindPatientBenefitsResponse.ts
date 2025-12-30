import { CheckoutSessionInfo } from '../billing/ConsumerBillingInfo';
import { PatientWorkbenchResponse } from '../workbench/PatientWorkbenchResponse';

export interface FindPatientBenefitsResponse {
  hasNewBenefit: boolean;
  previousWorkbench: PatientWorkbenchResponse | null;
  checkoutSessionInfo: CheckoutSessionInfo | null;
}

