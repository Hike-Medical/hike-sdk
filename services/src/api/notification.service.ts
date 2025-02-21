import type {
  CreateNotificationParams,
  EnrollPatientsParams,
  GetNotificationParams,
  Notification,
  NotificationExtended,
  NotificationHistory,
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

export const enrollPatients = async (params: EnrollPatientsParams): Promise<(NotificationHistory | null)[]> => {
  try {
    const response = await backendApi.post('notification/enroll-patients', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const publishNotification = async (notificationId: string): Promise<Notification> => {
  try {
    const response = await backendApi.post(`notify/${notificationId}/publish`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const removeQueuedMessages = async (notificationId: string): Promise<NotificationHistory[]> => {
  try {
    const response = await backendApi.post(`notify/${notificationId}/remove-queued-messages`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
