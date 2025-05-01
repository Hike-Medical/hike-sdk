import { HikeError, findCompanyWorkbenchWebhooks } from '@hike/services';
import { CompanyWorkbenchWebhook } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetCompanyWorkbenchWebhooksOptions
  extends Omit<UseQueryOptions<CompanyWorkbenchWebhook[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetCompanyWorkbenchWebhooks = ({
  queryKey = [],
  ...options
}: UseGetCompanyWorkbenchWebhooksOptions = {}) =>
  useQuery({
    queryKey: ['companyWorkbenchWebhook', queryKey],
    queryFn: async () => await findCompanyWorkbenchWebhooks(),
    ...options
  });
