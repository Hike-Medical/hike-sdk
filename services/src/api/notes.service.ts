import { CreateNotesBody, Notes, UpdateNotesBody } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createNotes = async (workbenchId: string, body: CreateNotesBody): Promise<Notes> => {
  const response = await backendApi.post(`notes/workbench/${workbenchId}`, body);
  return response.data;
};

export const findNotesByWorkbenchId = async (
  workbenchId: string,
  tags?: string[],
  deleted?: boolean
): Promise<Notes[]> => {
  const response = await backendApi.get(`notes/workbench/${workbenchId}`, { params: { tags, deleted } });
  return response.data;
};

export const findNoteById = async (noteId: string): Promise<Notes> => {
  const response = await backendApi.get(`notes/${noteId}`);
  return response.data;
};

export const updateNotesByIdForWorkbench = async (noteId: string, body: UpdateNotesBody): Promise<Notes> => {
  const response = await backendApi.put(`notes/${noteId}/workbench`, body);
  return response.data;
};

export const deleteNotesByIdForWorkbench = async (noteId: string): Promise<void> => {
  await backendApi.delete(`notes/${noteId}/workbench`);
};

export const recoverNoteByIdForWorkbench = async (noteId: string): Promise<Notes> => {
  const response = await backendApi.post(`notes/${noteId}/workbench/recover`);
  return response.data;
};
