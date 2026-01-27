import {
  AnalyticsDateRangeParams,
  AnalyticsEndpointName,
  AnalyticsMetadataByEndpointsResponse,
  DateFilter,
  EmployerDashboardStatsOptions,
  EmployerDashboardStatus,
  GetWorkflowChartDataParams,
  HourlyOptions,
  OrderMetricsBreakdownOptions,
  OrderMetricsBreakdownResponse,
  OrderMetricsOptions,
  OrderMetricsResponse,
  OrdersByCompaniesResponse,
  WorkflowChartData,
  WorkflowDashboardStats
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getOrderStatusesPerHour = async (body: HourlyOptions, companyIds: string[]) => {
  try {
    const response = await backendApi.post(
      'analytics/orders/statuses/hourly',
      {
        ...body,
        startDate: body.dateFilters.startDate,
        endDate: body.dateFilters.endDate
      },
      {
        headers: addHeaders(companyIds)
      }
    );

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getSolemateStats = async (companyIds: string[]) => {
  try {
    const response = await backendApi.get('analytics/solemate-stats', {
      headers: addHeaders(companyIds)
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrdersByCompanies = async (body: DateFilter, companyIds: string[]) => {
  try {
    const response = await backendApi.post(
      'analytics/orders',
      {
        ...body,
        startDate: body.startDate,
        endDate: body.endDate
      },
      {
        headers: addHeaders(companyIds)
      }
    );

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrderMetrics = async (params?: OrderMetricsOptions): Promise<OrderMetricsResponse> => {
  try {
    const response = await backendApi.get('analytics/order/metrics', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrderMetricsByWeek = async (params?: OrderMetricsOptions) => {
  try {
    const response = await backendApi.get('analytics/order/metrics/weekly', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrderMetricsBreakdown = async (
  params: OrderMetricsBreakdownOptions
): Promise<OrderMetricsBreakdownResponse[]> => {
  try {
    const response = await backendApi.get('analytics/order/metrics/breakdown', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getEmployerDashboardStats = async (
  params?: EmployerDashboardStatsOptions
): Promise<Record<EmployerDashboardStatus, number>> => {
  try {
    const response = await backendApi.get('analytics/employer-dashboard-stats', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkflowDashboardStats = async (): Promise<WorkflowDashboardStats> => {
  try {
    const response = await backendApi.get('analytics/workflows/dashboard-stats');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkflowChartData = async (params: GetWorkflowChartDataParams): Promise<WorkflowChartData> => {
  try {
    const response = await backendApi.get('analytics/workflows/chart-data', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export interface AnalyticsMetadata {
  lastUpdated: string | null;
  availableDateRange: { minDate: string; maxDate: string } | null;
}

export const getAnalyticsMetadata = async (): Promise<AnalyticsMetadata> => {
  try {
    const response = await backendApi.get('analytics/metadata');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getAnalyticsByName = async (
  name: AnalyticsEndpointName,
  params: AnalyticsDateRangeParams,
  companyIds: string[]
): Promise<OrdersByCompaniesResponse> => {
  try {
    const response = await backendApi.post(`analytics/name/${name}`, params, {
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getAnalyticsMetadataByEndpoints = async (
  endpoints: AnalyticsEndpointName[]
): Promise<AnalyticsMetadataByEndpointsResponse> => {
  try {
    const response = await backendApi.post('analytics/metadata/endpoints', { endpoints });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
