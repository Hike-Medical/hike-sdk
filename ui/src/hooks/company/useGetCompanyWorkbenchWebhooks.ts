import { findCompanyWorkbenchWebhooks } from '@hike/services';
import { CompanyWorkbenchWebhook, GetCompanyWorkbenchWebhooksParams, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetCompanyWorkbenchWebhooksOptions
  extends Omit<UseQueryOptions<PagedResponse<CompanyWorkbenchWebhook[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetCompanyWorkbenchWebhooksParams;
  queryKey?: QueryKey;
}

export const useGetCompanyWorkbenchWebhooks = ({
  params,
  queryKey = [],
  ...options
}: UseGetCompanyWorkbenchWebhooksOptions = {}) =>
  useQuery({
    queryKey: ['companyWorkbenchWebhook', params, queryKey],
    queryFn: async () => await findCompanyWorkbenchWebhooks(params),
    ...options
  });
