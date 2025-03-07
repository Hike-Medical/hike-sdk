import { CompanyWorkbenchWebhook } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findCompanyWorkbenchWebhooks } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetCompanyWorkbenchWebhooksOptions
  extends Omit<UseQueryOptions<CompanyWorkbenchWebhook[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetCompanyWorkbenchWebhooks = ({
  queryKey = [],
  ...options
}: useGetCompanyWorkbenchWebhooksOptions = {}) =>
  useQuery({
    queryKey: ['companyWorkbenchWebhook', queryKey],
    queryFn: async () => await findCompanyWorkbenchWebhooks(),
    ...options
  });
