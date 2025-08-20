import { getCompanyDashboardMetrics } from '@hike/services';
import { CompanyDashboardMetricsResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetCompanyDashboardMetricsOptions
  extends Omit<UseQueryOptions<CompanyDashboardMetricsResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetCompanyDashboardMetrics = ({
  queryKey = [],
  ...options
}: UseGetCompanyDashboardMetricsOptions = {}) =>
  useQuery({
    queryKey: ['companyDashboardMetrics', queryKey],
    queryFn: async () => await getCompanyDashboardMetrics(),
    ...options
  });
