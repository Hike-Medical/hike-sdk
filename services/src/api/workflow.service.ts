import type { SearchWorkflowsParams, WorkflowDto, WorkflowSearchResult } from '@hike/types';
import type { AttachmentPresignedUrl, WorkflowAttachment } from '@hike/types/src/dto/workflow/WorkflowAttachment';
import type { WorkflowFactsResult } from '@hike/types/src/dto/workflow/WorkflowFactsResult';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const searchWorkflows = async (params: SearchWorkflowsParams): Promise<WorkflowSearchResult[]> => {
  try {
    const response = await backendApi.post('workflow/search', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkflow = async (workflowId: string): Promise<WorkflowDto> => {
  try {
    const response = await backendApi.get(`workflow/${workflowId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkflowFacts = async (params: SearchWorkflowsParams): Promise<WorkflowFactsResult[]> => {
  try {
    const response = await backendApi.post('workflow/facts', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateWorkflowFacts = async (
  workflowId: string,
  facts: { key: string; value: any; source?: string }[]
) => {
  try {
    const response = await backendApi.post(`workflow/${workflowId}/state`, {
      facts: facts.map((fact) => ({
        key: fact.key,
        value: fact.value,
        source: fact.source || 'manual'
      }))
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkflowAttachments = async (workflowId: string): Promise<WorkflowAttachment[]> => {
  try {
    const response = await backendApi.get(`workflow/${workflowId}/attachments`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getAttachmentPresignedUrl = async (attachmentId: string): Promise<AttachmentPresignedUrl> => {
  try {
    const response = await backendApi.get(`workflow/attachment/${attachmentId}/presigned-url`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
