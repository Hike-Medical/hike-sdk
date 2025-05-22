import { getOrdersByCompanies } from '@hike/services';
import { DateFilter, HikeError, OrdersByCompaniesResponse } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGetOrdersByCompanies = (
  body: DateFilter,
  companyIds: string[],
  queryOptions?: Omit<UseQueryOptions<OrdersByCompaniesResponse, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['ordersByCompanies', body, companyIds],
    queryFn: async () => await getOrdersByCompanies(body, companyIds),
    ...queryOptions
  });
