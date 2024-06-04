import type {
  FormSchemaTyped,
  FormSubmissionTyped,
  UpsertFormSubmissionParams,
  UserTemplateResponse
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

export interface CreateUserTemplateBody {
  title: string;
  description?: string;
  templateIds: string[];
}

export const createUserTemplate = async (body: CreateUserTemplateBody): Promise<UserTemplateResponse> => {
  const response = await backendApi.post(`form/user-template`, body);
  return response.data;
};

export const findUserTemplateById = async (userTemplateId: string): Promise<UserTemplateResponse> => {
  const response = await backendApi.get(`form/user-template/${userTemplateId}`);
  return response.data;
};

export const findUserTemplates = async (): Promise<Partial<UserTemplateResponse>[]> => {
  const response = await backendApi.get(`form/user-template`);
  return response.data;
};

export interface UpdateUserTemplateBody {
  title: string;
  description?: string;
  data: UserTemplateResponse['data'];
}

export const updateUserTemplate = async (
  userTemplateId: string,
  body: UpdateUserTemplateBody
): Promise<UserTemplateResponse> => {
  const response = await backendApi.put(`form/user-template/${userTemplateId}`, body);
  return response.data;
};
