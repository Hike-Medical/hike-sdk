import type {
  CreateNotificationParams,
  EnrollPatientsParams,
  GetNotificationParams,
  Notification,
  NotificationExtended,
  NotificationWithStats
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const createNotification = async (params: CreateNotificationParams): Promise<Notification> => {
  try {
    const response = await backendApi.post('notification', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findNotifications = async (
  params?: GetNotificationParams,
  companyIds?: string[]
): Promise<NotificationExtended[]> => {
  try {
    const response = await backendApi.get('notification', { params, headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const statsForNotification = async (
  notificationId: string,
  companyIds?: string[]
): Promise<NotificationWithStats> => {
  try {
    const response = await backendApi.get(`notification/${notificationId}/stats`, { headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const enrollPatients = async (
  notificationId: string,
  params: EnrollPatientsParams
): Promise<{ jobId?: string }> => {
  try {
    const response = await backendApi.post(`notification/${notificationId}/enroll`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const statsForEnroll = async (
  notificationId: string,
  params: EnrollPatientsParams
): Promise<{ count: number }> => {
  try {
    const response = await backendApi.get(`notification/${notificationId}/enroll/stats`, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
