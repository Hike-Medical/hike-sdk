import type {
  EmailTemplate,
  EmailTemplateExtended,
  SendEmailTemplateParams,
  UpsertEmailTemplateParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchEmailTemplates = async (): Promise<EmailTemplateExtended[]> => {
  try {
    const response = await backendApi.get('email-template');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findEmailTemplateById = async (templateId: string): Promise<EmailTemplate> => {
  try {
    const response = await backendApi.get(`email-template/${templateId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const upsertEmailTemplate = async (params: UpsertEmailTemplateParams): Promise<EmailTemplate> => {
  try {
    const response = await backendApi.post('email-template', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendEmailTemplate = async (templateId: string, params: SendEmailTemplateParams): Promise<void> => {
  try {
    const response = await backendApi.post(`email-template/${templateId}/send`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const activateEmailTemplate = async (templateId: string): Promise<void> => {
  try {
    const response = await backendApi.post(`email-template/${templateId}/activate`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deactivateEmailTemplate = async (templateId: string): Promise<void> => {
  try {
    const response = await backendApi.post(`email-template/${templateId}/deactivate`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteEmailTemplate = async (templateId: string): Promise<void> => {
  try {
    const response = await backendApi.delete(`email-template/${templateId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
