import { EntityType, Tag, TagResult, UpsertTagParams } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const upsertTag = async (params?: UpsertTagParams): Promise<Tag> => {
  try {
    const response = await backendApi.post('tag', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchTags = async (): Promise<{ [name: string]: TagResult }[]> => {
  try {
    const response = await backendApi.get('tag');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchTagsByEntity = async (entityId: string): Promise<Tag[]> => {
  try {
    const response = await backendApi.get(`tag/entity/${entityId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchTagByEntity = async (entityId: string, name: string): Promise<Tag> => {
  try {
    const response = await backendApi.get(`tag/entity/${entityId}/${name}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchEntitiesByTag = async (name: string, entityType?: EntityType): Promise<TagResult> => {
  try {
    const response = await backendApi.get(`tag/${name}`, { params: { type: entityType } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteTagForEntity = async (name: string, entityId: string): Promise<Tag> => {
  try {
    const response = await backendApi.delete(`tag/${name}/${entityId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteTag = async (name: string): Promise<number> => {
  try {
    const response = await backendApi.delete(`tag/${name}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
