import type { CreatePatientParams } from '../patient/CreatePatientParams';
import type { UpsertContactParams } from '../patient/UpsertContactParams';

export interface CatalogOrderItem {
  catalogProductId: string;
  quantity: number;
}

export interface NewCatalogOrderPatient extends Pick<Required<CreatePatientParams>, 'firstName' | 'lastName'> {
  contact: UpsertContactParams;
}

export interface CreateCatalogOrderParams {
  companyId: string;
  items: CatalogOrderItem[];
  patientId?: string;
  newPatient?: NewCatalogOrderPatient;
  formSchemaId?: string;
  formData?: Record<string, unknown>;
  notes?: string;
}
