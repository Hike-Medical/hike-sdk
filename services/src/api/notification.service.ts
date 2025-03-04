import type {
  CreateNotificationMessageParams,
  CreateNotificationParams,
  EnrollPatientsJobData,
  EnrollPatientsParams,
  GetNotificationParams,
  JobQueueTask,
  Notification,
  NotificationExtended,
  NotificationHistoryExtended,
  NotificationMessage,
  NotificationStats,
  UpdateNotificationMessageParams
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

export const fetchEnrollPatientsNotificationJobs = async (): Promise<JobQueueTask<EnrollPatientsJobData, void>[]> => {
  try {
    const response = await backendApi.get('notification/enroll-patients-job');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchNotificationJobById = async (jobId: string): Promise<JobQueueTask<EnrollPatientsJobData, void>> => {
  try {
    const response = await backendApi.get(`notification/job/${jobId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchNotificationHistoryByJob = async (jobId: string): Promise<NotificationHistoryExtended[]> => {
  try {
    const response = await backendApi.get(`notification/job/${jobId}/history`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const activateNotification = async (notificationId: string): Promise<void> => {
  try {
    await backendApi.post(`notification/${notificationId}/activate`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deactivateNotification = async (notificationId: string): Promise<void> => {
  try {
    await backendApi.post(`notification/${notificationId}/deactivate`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const enrollPatientsToNotification = async (
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

export const statsForNotification = async (companyIds?: string[]): Promise<NotificationStats[]> => {
  try {
    const response = await backendApi.get(`notification/stats`, { headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const statsForNotificationById = async (
  notificationId: string,
  companyIds?: string[]
): Promise<NotificationStats> => {
  try {
    const response = await backendApi.get(`notification/${notificationId}/stats`, { headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const statsForEnrollNotification = async (
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

export const createNotificationMessage = async (
  params: CreateNotificationMessageParams
): Promise<NotificationMessage> => {
  try {
    const response = await backendApi.post('notification/message', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateNotificationMessage = async (
  messageId: string,
  params: UpdateNotificationMessageParams
): Promise<NotificationMessage> => {
  try {
    const response = await backendApi.patch(`notification/message/${messageId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteNotificationMessage = async (messageId: string): Promise<void> => {
  try {
    await backendApi.delete(`notification/message/${messageId}`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteNotificationJob = async (jobId: string): Promise<void> => {
  try {
    await backendApi.delete(`notification/job/${jobId}`);
  } catch (error) {
    throw toHikeError(error);
  }
};
