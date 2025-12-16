import { WorkbenchWebhookStatus } from '../company/CompanyWorkbenchWebhook';

export interface ShippedWebhookBody {
  status: 'SHIPPED';
  trackingNumber?: string;
  labelId?: string | null;
  orders: (string | undefined)[];
  dispatchedAt: Date;
}

export interface WorkbenchWebhookBody {
  status: Exclude<WorkbenchWebhookStatus, 'SHIPPED'>;
  patientId: string;
  workbenchId: string;
  poNumber?: string;
  productType: string;
  extPatientId?: string;
  evalExternalId?: string;
  companyId: string;
}

export type NotifyWebhookBody = ShippedWebhookBody | WorkbenchWebhookBody;
