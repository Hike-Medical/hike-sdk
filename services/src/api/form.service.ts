import type {
  CreateFormTemplateBody,
  FormSchemaTyped,
  FormSubmissionTyped,
  FormTemplateResponse,
  GetFormSchemasParams,
  UpdateFormTemplateBody,
  UpsertFormSubmissionParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findFormSchemaById = async (schemaId: string, templateable = false): Promise<FormSchemaTyped> => {
  try {
    const response = await backendApi.get(`form/schema/${schemaId}`, { params: { templateable } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findFormSchemas = async (params?: GetFormSchemasParams): Promise<FormSchemaTyped[]> => {
  try {
    const response = await backendApi.get(`form/schema`, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findFormSubmission = async (
  schemaId: string,
  workbenchId: string
): Promise<FormSubmissionTyped | null> => {
  try {
    const response = await backendApi.get(`form/schema/${schemaId}/workbench/${workbenchId}/submission`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findFlattenedFormSubmission = async (workbenchId: string): Promise<FormSubmissionTyped['data']> => {
  try {
    const response = await backendApi.get(`form/workbench/${workbenchId}/flattened-submission`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findFormSubmissions = async (workbenchId: string): Promise<FormSubmissionTyped[]> => {
  try {
    const response = await backendApi.get(`form/workbench/${workbenchId}/submission`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const upsertFormSubmission = async (params: UpsertFormSubmissionParams): Promise<FormSubmissionTyped> => {
  try {
    const response = await backendApi.post('form/submission', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createFormTemplate = async (body: CreateFormTemplateBody): Promise<FormTemplateResponse> => {
  try {
    const response = await backendApi.post(`form/template`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findFormTemplateById = async (templateId: string): Promise<FormTemplateResponse> => {
  try {
    const response = await backendApi.get(`form/template/${templateId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findFormTemplates = async (): Promise<Partial<FormTemplateResponse>[]> => {
  try {
    const response = await backendApi.get(`form/template`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateFormTemplate = async (
  templateId: string,
  body: UpdateFormTemplateBody
): Promise<FormTemplateResponse> => {
  try {
    const response = await backendApi.put(`form/template/${templateId}`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteTemplate = async (templateId: string): Promise<void> => {
  try {
    const response = await backendApi.delete(`form/template/${templateId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const validatePassword = (value: string) => {
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }

  if (!/[0-9]/.test(value)) {
    return 'Password must contain at least 1 number';
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return 'Password must contain at least 1 symbol';
  }

  return null;
};
