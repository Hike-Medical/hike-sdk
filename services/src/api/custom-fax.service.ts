import type {
  GetAvailableFaxTemplatesResponse,
  RenderFaxTemplateParams,
  RenderFaxTemplateResponse,
  SendCustomFaxParams,
  SendCustomFaxResponse
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getAvailableFaxTemplates = async (
  workflowId: string
): Promise<GetAvailableFaxTemplatesResponse> => {
  try {
    const response = await backendApi.get(`custom-fax/${workflowId}/templates`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const renderFaxTemplate = async (
  workflowId: string,
  params: RenderFaxTemplateParams
): Promise<RenderFaxTemplateResponse> => {
  try {
    const response = await backendApi.post(`custom-fax/${workflowId}/render`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendCustomFax = async (
  workflowId: string,
  params: SendCustomFaxParams
): Promise<SendCustomFaxResponse> => {
  try {
    const response = await backendApi.post(`custom-fax/${workflowId}/send`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
