import type {
  AnnotationDto,
  AttachmentPresignedUrl,
  CommentDto,
  CreateAnnotationParams,
  CreateWorkflowCommentParams,
  EvaluationAttachmentType,
  PagedResponse,
  SearchWorkflowsParams,
  UpdateWorkflowAttachmentParams,
  Workflow,
  WorkflowAttachment,
  WorkflowDto,
  WorkflowSearchResult,
  WorkflowStatus,
  WorkflowTimeSaved
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';
import { WorkflowLogDto } from './workflow.types';

export const searchWorkflows = async (
  params: SearchWorkflowsParams
): Promise<PagedResponse<WorkflowSearchResult[]>> => {
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

export const updateWorkflowFacts = async (
  workflowId: string,
  facts: { key: string; value: any; source?: string; active?: boolean }[]
) => {
  try {
    const response = await backendApi.patch(`workflow/${workflowId}/state`, {
      facts: facts.map((fact) => ({
        key: fact.key,
        value: fact.value,
        source: fact.source || 'manual',
        ...(fact.active !== undefined && { active: fact.active })
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
    facts?: { key: string; value: any; source?: string; active?: boolean }[];
    attachmentFacts?: {
      attachment: {
        name: string;
        bucket: string;
        key: string;
        region: string;
        types: string[];
      };
      facts?: { key: string; value: any; source?: string; active?: boolean }[];
    }[];
    resolvedFactIds?: string[];
  }
) => {
  try {
    const response = await backendApi.patch(`workflow/${workflowId}/state`, {
      facts: stateUpdate.facts?.map((fact) => ({
        key: fact.key,
        value: fact.value,
        source: fact.source || 'manual',
        ...(fact.active !== undefined && { active: fact.active })
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

export const updateWorkflowAttachment = async (
  workflowId: string,
  attachmentId: string,
  params: UpdateWorkflowAttachmentParams
): Promise<WorkflowDto> => {
  try {
    const response = await backendApi.patch(`workflow/${workflowId}/attachments/${attachmentId}`, params);
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
  parentWorkflowId?: string;
}): Promise<WorkflowDto> => {
  try {
    const response = await backendApi.post('workflow/create-with-file', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export interface StartWorkflowParams {
  parentWorkflowId?: string;
}

export const createWorkflowByName = async (workflowName: string, params?: StartWorkflowParams): Promise<Workflow> => {
  try {
    const response = await backendApi.post(`workflow/name/${workflowName}`, params ?? {});
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

export const getWorkflowTimeSaved = async (workflowId: string): Promise<WorkflowTimeSaved> => {
  try {
    const response = await backendApi.get(`workflow/${workflowId}/time-saved`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkflowDataset = async (params: {
  status: 'ACTIVE' | 'FINISHED' | 'NON_COMPLIANT';
  perPage?: number;
}) => {
  try {
    const response = await backendApi.get('workflow/dataset/by-status', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateWorkflowStatus = async (
  workflowId: string,
  params: { status: WorkflowStatus; reason?: string }
): Promise<WorkflowDto> => {
  try {
    const response = await backendApi.post(`workflow/${workflowId}/status`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createWorkflowComment = async (
  workflowId: string,
  params: CreateWorkflowCommentParams
): Promise<CommentDto> => {
  try {
    const response = await backendApi.post(`workflow/${workflowId}/comments`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkflowComments = async (workflowId: string): Promise<CommentDto[]> => {
  try {
    const response = await backendApi.get(`workflow/${workflowId}/comments`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Adds an annotation to an attachment.
 * Supports different annotation types: CLASSIFICATION, FACT, and REVIEW.
 */
export const addAnnotation = async (
  workflowId: string,
  attachmentId: string,
  params: CreateAnnotationParams
): Promise<AnnotationDto> => {
  try {
    const response = await backendApi.post(
      `workflow/${workflowId}/attachments/${attachmentId}/annotations`,
      params
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Gets all annotations for an attachment.
 */
export const getAnnotations = async (workflowId: string, attachmentId: string): Promise<AnnotationDto[]> => {
  try {
    const response = await backendApi.get(`workflow/${workflowId}/attachments/${attachmentId}/annotations`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
