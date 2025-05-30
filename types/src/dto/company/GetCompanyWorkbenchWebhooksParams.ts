import type { PagedParams } from '../PagedParams';

export interface GetCompanyWorkbenchWebhooksParams extends PagedParams {
  filter?: {
    patientName?: string;
    poNumber?: string;
    workbenchId?: string;
    webhookUrl?: string;
    responseStatus?: number;
    responseBody?: string;
  };
  sortBy?: 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
