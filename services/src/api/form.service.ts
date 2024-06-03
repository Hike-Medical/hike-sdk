import type { FormSubmissionTyped, FormTemplateTyped, UpsertFormSubmissionParams } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findFormTemplateById = async (templateId: string): Promise<FormTemplateTyped> => {
  const response = await backendApi.get(`form/template/${templateId}`);
  return response.data;
};

export const findFormTemplatesByIds = async (templateIds: string[]): Promise<FormTemplateTyped[]> => {
  const response = await backendApi.get(`form/template?templateIds=${templateIds.join(',')}`);
  return response.data;
};

export const findFormSubmission = async (
  templateId: string,
  workbenchId: string
): Promise<FormSubmissionTyped | null> => {
  const response = await backendApi.get(`form/template/${templateId}/workbench/${workbenchId}/submission`);
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
