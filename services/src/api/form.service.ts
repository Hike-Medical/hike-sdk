import type { FormSchemaTyped, FormSubmissionTyped, UpsertFormSubmissionParams } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findFormSchemaById = async (schemaId: string): Promise<FormSchemaTyped> => {
  const response = await backendApi.get(`form/schema/${schemaId}`);
  return response.data;
};

export const findFormSchemasByIds = async (schemaIds: string[]): Promise<FormSchemaTyped[]> => {
  const response = await backendApi.get(`form/schema?schemaIds=${schemaIds.join(',')}`);
  return response.data;
};

export const findFormSubmission = async (
  schemaId: string,
  workbenchId: string
): Promise<FormSubmissionTyped | null> => {
  const response = await backendApi.get(`form/schema/${schemaId}/workbench/${workbenchId}/submission`);
  return response.data;
};

export const findFormSubmissionsByWorkbenchId = async (workbenchId: string): Promise<FormSubmissionTyped[]> => {
  const response = await backendApi.get(`form/workbench/${workbenchId}/submission`);
  return response.data;
};

export const upsertFormSubmission = async (params: UpsertFormSubmissionParams): Promise<FormSubmissionTyped> => {
  const response = await backendApi.post('form/submission', params);
  return response.data;
};
