import type {
  AttachmentPresignedUrl,
  EvaluationAttachmentType,
  SearchWorkflowsParams,
  WorkflowAttachment,
  WorkflowDto,
  WorkflowFactsResult,
  WorkflowLogDto,
  WorkflowSearchResult
} from '@hike/types';
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
    const response = await backendApi.patch(`workflow/${workflowId}/state`, {
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

export const updateWorkflowState = async (
  workflowId: string,
  stateUpdate: {
    facts?: { key: string; value: any; source?: string }[];
    attachmentFacts?: {
      attachment: {
        name: string;
        bucket: string;
        key: string;
        region: string;
        types: string[];
      };
      facts?: { key: string; value: any; source?: string }[];
    }[];
    resolvedFactIds?: string[];
  }
) => {
  try {
    const response = await backendApi.patch(`workflow/${workflowId}/state`, {
      facts: stateUpdate.facts?.map((fact) => ({
        key: fact.key,
        value: fact.value,
        source: fact.source || 'manual'
      })),
      attachmentFacts: stateUpdate.attachmentFacts,
      resolvedFactIds: stateUpdate.resolvedFactIds
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

export const getFactHistory = async (workflowId: string, factKey: string) => {
  try {
    const response = await backendApi.get(`workflow/${workflowId}/facts/${encodeURIComponent(factKey)}/history`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const generateWorkflowDocumentUploadUrl = async (
  workflowId: string,
  fileName: string,
  contentType?: string
): Promise<{ presignedUrl: string; key: string; bucket: string; region: string }> => {
  try {
    const response = await backendApi.post(`workflow/attachment/${workflowId}/upload`, {
      fileName,
      contentType
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const generateFileUploadUrl = async (
  fileName: string,
  contentType?: string
): Promise<{ presignedUrl: string; key: string; bucket: string; region: string }> => {
  try {
    const response = await backendApi.post('workflow/file-upload-url', {
      fileName,
      contentType
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createWorkflowWithFile = async (data: {
  workflowName: string;
  attachment: {
    name: string;
    bucket: string;
    key: string;
    region: string;
    types: EvaluationAttachmentType[];
  };
  externalPatientId?: string;
  externalEvaluationId?: string;
}): Promise<WorkflowDto> => {
  try {
    const response = await backendApi.post('workflow/create-with-file', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkflowLogs = async (workflowId: string): Promise<WorkflowLogDto[]> => {
  try {
    const response = await backendApi.get(`workflow/${workflowId}/logs`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
