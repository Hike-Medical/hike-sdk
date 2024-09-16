import { CreateNotesBody, Notes, UpdateNotesBody } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const createNotes = async (workbenchId: string, body: CreateNotesBody): Promise<Notes> => {
  try {
    const response = await backendApi.post(`notes/workbench/${workbenchId}`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findNotesByWorkbenchId = async (
  workbenchId: string,
  tags?: string[],
  deleted?: boolean
): Promise<Notes[]> => {
  try {
    const response = await backendApi.get(`notes/workbench/${workbenchId}`, { params: { tags, deleted } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findNoteById = async (noteId: string): Promise<Notes> => {
  try {
    const response = await backendApi.get(`notes/${noteId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateNotesByIdForWorkbench = async (noteId: string, body: UpdateNotesBody): Promise<Notes> => {
  try {
    const response = await backendApi.put(`notes/${noteId}/workbench`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteNotesByIdForWorkbench = async (noteId: string): Promise<void> => {
  try {
    await backendApi.delete(`notes/${noteId}/workbench`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const recoverNoteByIdForWorkbench = async (noteId: string): Promise<Notes> => {
  try {
    const response = await backendApi.post(`notes/${noteId}/workbench/recover`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
