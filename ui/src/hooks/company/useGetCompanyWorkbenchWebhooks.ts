import { findCompanyWorkbenchWebhooks } from '@hike/services';
import { CompanyWorkbenchWebhook, GetWorkbenchWebhooksParams, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetCompanyWorkbenchWebhooksOptions
  extends Omit<UseQueryOptions<CompanyWorkbenchWebhook[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  params?: GetWorkbenchWebhooksParams;
}

export const useGetCompanyWorkbenchWebhooks = ({
  queryKey = [],
  params,
  ...options
}: UseGetCompanyWorkbenchWebhooksOptions = {}) =>
  useQuery({
    queryKey: ['companyWorkbenchWebhook', params, queryKey],
    queryFn: async () => await findCompanyWorkbenchWebhooks(params),
    ...options
  });
