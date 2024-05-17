import type {
  ActionEvaluationParams,
  CreateEvaluationInsoleParams,
  CreateEvaluationParams,
  EvaluationExtended,
  EvaluationsStats,
  EvaluationsUploadResult,
  GetEvaluationsParams,
  PagedResponse,
  SearchEvaluationsParams,
  StartEvaluationInsoleParams
} from '@hike/types';

import { backendApi } from '../utils/backendApi';

export const createEvaluation = async (params: CreateEvaluationParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation', params);
  return response.data;
};

export const createInsoleEvaluation = async (params: CreateEvaluationInsoleParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation/create/insole', params);
  return response.data;
};

export const startInsoleEvaluation = async (params: StartEvaluationInsoleParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation/start/insole', params);
  return response.data;
};

export const cancelEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post(`evaluation/${params.evaluationId}/cancel`);
  return response.data;
};

export const findEvaluationById = async (evaluationId: string): Promise<EvaluationExtended> => {
  const response = await backendApi.get(`evaluation/${evaluationId}`);
  return response.data;
};

export const findEvaluations = async (params: GetEvaluationsParams): Promise<PagedResponse<EvaluationExtended[]>> => {
  const response = await backendApi.get('evaluation', { params });
  return response.data;
};

export const searchEvaluations = async (
  params: SearchEvaluationsParams
): Promise<PagedResponse<EvaluationExtended[]>> => {
  const response = await backendApi.get('evaluation/search', { params });
  return response.data;
};

/**
 * Retrieves the statistics for evaluations.
 */
export const statsForEvaluations = async (assignedOnly?: boolean): Promise<EvaluationsStats> => {
  const response = await backendApi.get('evaluation/stats', { params: { assignedOnly } });
  return response.data;
};

export const uploadEvaluations = async (file: File): Promise<EvaluationsUploadResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await backendApi.post('evaluation/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};
