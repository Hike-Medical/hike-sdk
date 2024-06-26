import { CreatePinDto } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const getPinStatus = async (): Promise<boolean> => {
  try {
    const response = await backendApi.get('pin');
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const deletePin = async (): Promise<void> => {
  try {
    await backendApi.delete('pin');
  } catch (error) {
    throw toResponseError(error);
  }
};

export const createPin = async (body: CreatePinDto): Promise<void> => {
  try {
    const response = await backendApi.post('pin', body);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
