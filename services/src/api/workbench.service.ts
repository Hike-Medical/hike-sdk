import { Asset, CreateNotesBody, Foot, Notes, ProductType, UpdateNotesBody } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export interface GenerateSignedURLParams {
  footId: string;
  productType: ProductType;
  videoType: string;
}

export interface GenerateSignedURLResponse {
  assetId: string;
  signedUrl: string;
}

export const generateUrlToUploadFile = async ({
  footId,
  productType,
  videoType
}: GenerateSignedURLParams): Promise<GenerateSignedURLResponse> => {
  const response = await backendApi.post(`scan/${footId}/pre-signed-url`, {
    productType,
    videoType
  });

  return response.data;
};

export type FootWithAssets = Foot & { assets: Asset[] };

export const getActiveFeet = async (workbenchId: string): Promise<FootWithAssets[]> => {
  const response = await backendApi.get(`workbench/${workbenchId}/feet`);
  return response.data;
};

export const createNotes = async (workbenchId: string, body: CreateNotesBody): Promise<Notes> => {
  const response = await backendApi.post(`workbench/${workbenchId}/notes`, body);
  return response.data;
};

export const findNotes = async (workbenchId: string, tags?: string[], deleted?: boolean): Promise<Notes[]> => {
  const response = await backendApi.get(`workbench/${workbenchId}/notes`, { params: { tags, deleted } });
  return response.data;
};

export const recoverNote = async (workbenchId: string, noteId: string): Promise<Notes> => {
  const response = await backendApi.post(`workbench/${workbenchId}/notes/${noteId}/recover`);
  return response.data;
};

export const findNoteById = async (workbenchId: string, noteId: string): Promise<Notes> => {
  const response = await backendApi.get(`workbench/${workbenchId}/notes/${noteId}`);
  return response.data;
};

export const updateNotes = async (workbenchId: string, noteId: string, body: UpdateNotesBody): Promise<Notes> => {
  const response = await backendApi.put(`workbench/${workbenchId}/notes/${noteId}`, body);
  return response.data;
};

export const deleteNotes = async (workbenchId: string, noteId: string): Promise<void> => {
  await backendApi.delete(`workbench/${workbenchId}/notes/${noteId}`);
};
