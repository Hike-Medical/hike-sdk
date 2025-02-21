import type {
  CreateNotificationParams,
  EnrollPatientsParams,
  GetNotificationParams,
  Notification,
  NotificationExtended,
  NotificationHistory,
  NotificationWithStats
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const createNotification = async (params: CreateNotificationParams): Promise<Notification> => {
  try {
    const response = await backendApi.post('notify/campaign', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getNotifications = async (
  params?: GetNotificationParams,
  companyIds?: string[]
): Promise<NotificationExtended[]> => {
  try {
    let headers: {
      [key: string]: string;
    } = {};

    if (companyIds?.length) {
      headers = { ...headers, 'x-company-id': companyIds.join(',') };
    }

    const response = await backendApi.get('notify/campaigns', { params, headers });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getNotificationStats = async (
  notificationId: string,
  companyIds?: string[]
): Promise<NotificationWithStats> => {
  try {
    let headers: {
      [key: string]: string;
    } = {};

    if (companyIds?.length) {
      headers = { ...headers, 'x-company-id': companyIds.join(',') };
    }

    const response = await backendApi.get(`notify/${notificationId}/stats`, { headers });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const enrollPatients = async (params: EnrollPatientsParams): Promise<(NotificationHistory | null)[]> => {
  try {
    const response = await backendApi.post('notify/enroll-patients', params);
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
