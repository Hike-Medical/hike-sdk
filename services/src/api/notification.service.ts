import type {
  CompanyPatientExtended,
  CreateNotificationMessageParams,
  CreateNotificationParams,
  EnrollPatientsJobData,
  EnrollPatientsParams,
  GetNotificationHistoryParams,
  GetNotificationsParams,
  JobQueueTask,
  Notification,
  NotificationExtended,
  NotificationHistoryExtended,
  NotificationHistoryMessageExtended,
  NotificationMessage,
  NotificationStats,
  PagedResponse,
  PresignedFile,
  SendTestParams,
  UpdateNotificationMessageParams
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createNotification = async (params: CreateNotificationParams): Promise<Notification> => {
  try {
    const response = await backendApi.post('notification', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchActiveInAppNotifications = async (companyIds?: string[]): Promise<NotificationExtended[]> => {
  try {
    const response = await backendApi.get('notification/in-app/active', {
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchInactiveNotifications = async (companyIds?: string[]): Promise<NotificationExtended[]> => {
  try {
    const response = await backendApi.get('notification/inactive', {
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findNotifications = async (
  params?: GetNotificationsParams,
  companyIds?: string[]
): Promise<NotificationExtended[]> => {
  try {
    const response = await backendApi.get('notification', { params, headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchNotificationById = async (notificationId: string): Promise<NotificationExtended> => {
  try {
    const response = await backendApi.get(`notification/${notificationId}`);
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

export const fetchEnrollPatientsNotificationJobsByPatientId = async (
  patientId: string
): Promise<JobQueueTask<EnrollPatientsJobData, void>[]> => {
  try {
    const response = await backendApi.get(`notification/enroll-patients-job/${patientId}`);
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

export const fetchHistoryByNotification = async (
  notificationId: string,
  params: GetNotificationHistoryParams
): Promise<PagedResponse<NotificationHistoryExtended[]>> => {
  try {
    const response = await backendApi.get(`notification/${notificationId}/history`, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchNotificationHistoryByPatient = async (
  patientId: string
): Promise<NotificationHistoryMessageExtended[]> => {
  try {
    const response = await backendApi.get(`notification/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchNotificationEnrollPatients = async (
  notificationId: string,
  params: EnrollPatientsParams,
  limit: number
): Promise<CompanyPatientExtended[]> => {
  const response = await backendApi.get(`notification/${notificationId}/enroll/patient/${limit}`, { params });
  return response.data;
};

export const fetchNotificationContent = async (historyId: string): Promise<PresignedFile> => {
  try {
    const response = await backendApi.get(`notification/content/${historyId}`);
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

export const statsForNotificationsByPatient = async (
  patientId: string
): Promise<Omit<NotificationStats, 'id' | 'name'>> => {
  try {
    const response = await backendApi.get(`notification/patient/${patientId}/stats`);
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

export const deleteNotificationJobs = async (notificationId: string): Promise<{ count: number }> => {
  try {
    const response = await backendApi.delete(`notification/${notificationId}/job`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendNotificationTest = async (messageId: string, params: SendTestParams): Promise<void> => {
  try {
    await backendApi.post(`notification/message/${messageId}/test`, params);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteNotification = async (notificationId: string): Promise<void> => {
  try {
    await backendApi.delete(`notification/${notificationId}`);
  } catch (error) {
    throw toHikeError(error);
  }
};
