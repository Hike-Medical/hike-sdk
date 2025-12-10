import { GetProjectMidnightHammerAnalyticsParams, ProjectMidnightHammerAnalyticsResponse } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const midnightHammerService = {
  getAnalytics: async (
    params?: GetProjectMidnightHammerAnalyticsParams
  ): Promise<ProjectMidnightHammerAnalyticsResponse> => {
    const response = await backendApi.get<ProjectMidnightHammerAnalyticsResponse>('midnight-hammer/analytics', {
      params
    });
    return response.data;
  }
};
