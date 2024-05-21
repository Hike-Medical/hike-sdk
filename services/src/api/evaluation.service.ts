import type {
  ActionEvaluationParams,
  CreateEvaluationByProductParams,
  CreateEvaluationParams,
  CreateNotesBody,
  EvaluationExtended,
  EvaluationsStats,
  EvaluationsUploadResult,
  GetEvaluationsParams,
  Notes,
  PagedResponse,
  SearchEvaluationsParams,
  StartEvaluationByProductParams,
  UpdateEvaluationParams,
  UpdateNotesBody
} from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createEvaluation = async (params: CreateEvaluationParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation', params);
  return response.data;
};

export const updateEvaluation = async (
  evaluationId: string,
  params: UpdateEvaluationParams
): Promise<EvaluationExtended> => {
  const response = await backendApi.patch(`evaluation/${evaluationId}`, params);
  return response.data;
};

export const createEvaluationByProduct = async (
  params: CreateEvaluationByProductParams
): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation/create/product', params);
  return response.data;
};

export const startEvaluationByProduct = async (params: StartEvaluationByProductParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation/start/product', params);
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

export const createNotes = async (evaluationId: string, body: CreateNotesBody): Promise<Notes> => {
  const response = await backendApi.post(`evaluation/${evaluationId}/notes`, body);
  return response.data;
};

export const findNotes = async (evaluationId: string, tags?: string[], deleted?: boolean): Promise<Notes[]> => {
  const response = await backendApi.get(`evaluation/${evaluationId}/notes`, { params: { tags, deleted } });
  return response.data;
};

export const recoverNote = async (evaluationId: string, noteId: string): Promise<Notes> => {
  const response = await backendApi.post(`evaluation/${evaluationId}/notes/${noteId}/recover`);
  return response.data;
};

export const findNoteById = async (evaluationId: string, noteId: string): Promise<Notes> => {
  const response = await backendApi.get(`evaluation/${evaluationId}/notes/${noteId}`);
  return response.data;
};

export const updateNotes = async (evaluationId: string, noteId: string, body: UpdateNotesBody): Promise<Notes> => {
  const response = await backendApi.put(`evaluation/${evaluationId}/notes/${noteId}`, body);
  return response.data;
};

export const deleteNotes = async (evaluationId: string, noteId: string): Promise<void> => {
  await backendApi.delete(`evaluation/${evaluationId}/notes/${noteId}`);
};
