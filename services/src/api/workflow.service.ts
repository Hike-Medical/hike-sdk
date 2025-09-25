import type { SearchWorkflowsParams, WorkflowDto, WorkflowFactsResult, WorkflowSearchResult } from '@hike/types';
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
