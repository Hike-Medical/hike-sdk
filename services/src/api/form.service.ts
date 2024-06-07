import type {
  CreateFormTemplateBody,
  FormSchemaTyped,
  FormSubmissionTyped,
  FormTemplateResponse,
  UpdateFormTemplateBody,
  UpsertFormSubmissionParams
} from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findFormSchemaById = async (schemaId: string, templateable = false): Promise<FormSchemaTyped> => {
  const response = await backendApi.get(`form/schema/${schemaId}`, { params: { templateable } });
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

export const createFormTemplate = async (body: CreateFormTemplateBody): Promise<FormTemplateResponse> => {
  const response = await backendApi.post(`form/template`, body);
  return response.data;
};

export const findFormTemplateById = async (templateId: string): Promise<FormTemplateResponse> => {
  const response = await backendApi.get(`form/template/${templateId}`);
  return response.data;
};

export const findFormTemplates = async (): Promise<Partial<FormTemplateResponse>[]> => {
  const response = await backendApi.get(`form/template`);
  return response.data;
};

export const updateFormTemplate = async (
  templateId: string,
  body: UpdateFormTemplateBody
): Promise<FormTemplateResponse> => {
  const response = await backendApi.put(`form/template/${templateId}`, body);
  return response.data;
};

export const deleteTemplate = async (templateId: string): Promise<void> => {
  const response = await backendApi.delete(`form/template/${templateId}`);
  return response.data;
};
