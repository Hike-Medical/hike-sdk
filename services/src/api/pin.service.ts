import { CreatePinDto } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getPinStatus = async (): Promise<boolean> => {
  try {
    const response = await backendApi.get('pin');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deletePin = async (): Promise<void> => {
  try {
    await backendApi.delete('pin');
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createPin = async (body: CreatePinDto): Promise<void> => {
  try {
    const response = await backendApi.post('pin', body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
