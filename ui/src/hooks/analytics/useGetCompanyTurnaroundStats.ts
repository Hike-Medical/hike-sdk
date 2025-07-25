import { getCompanyTurnaroundStats } from '@hike/services';
import { CompanyTurnaroundStatsResponse, DateFilter, HikeError } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGetCompanyTurnaroundStats = (
  body: DateFilter,
  companyIds: string[],
  queryOptions?: Omit<UseQueryOptions<CompanyTurnaroundStatsResponse, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['companyTurnaround', body, companyIds],
    queryFn: async () => await getCompanyTurnaroundStats(body, companyIds),
    ...queryOptions
  });
