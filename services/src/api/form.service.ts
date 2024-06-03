import type {
  FormSubmissionExtended,
  FormTemplateExtended,
  UpsertFormSubmissionParams,
  UserTemplateResponse
} from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findFormTemplateById = async (templateId: string, templateable = false): Promise<FormTemplateExtended> => {
  const response = await backendApi.get(`form/template/${templateId}`, {
    params: {
      templateable
    }
  });
  return response.data;
};

export const findFormTemplatesByIds = async (templateIds: string[]): Promise<FormTemplateExtended[]> => {
  const response = await backendApi.get(`form/template?templateIds=${templateIds.join(',')}`);
  return response.data;
};

export const findFormSubmission = async (
  templateId: string,
  workbenchId: string
): Promise<FormSubmissionExtended | null> => {
  const response = await backendApi.get(`form/template/${templateId}/workbench/${workbenchId}/submission`);
  return response.data;
};

export const findFormSubmissionsByWorkbenchId = async (workbenchId: string): Promise<FormSubmissionExtended[]> => {
  const response = await backendApi.get(`form/workbench/${workbenchId}/submission`);
  return response.data;
};

export const upsertFormSubmission = async (params: UpsertFormSubmissionParams): Promise<FormSubmissionExtended> => {
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
  data: FormSubmissionExtended['data'];
}

export const updateUserTemplate = async (
  userTemplateId: string,
  body: UpdateUserTemplateBody
): Promise<UserTemplateResponse> => {
  const response = await backendApi.put(`form/user-template/${userTemplateId}`, body);
  return response.data;
};
