import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { isDemoCompany } from '../../api/company.service';
import { ResponseError } from '../../errors/ResponseError';

export interface useIsDemoCompanyOptions
  extends Omit<UseQueryOptions<boolean, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  companyId?: string;
  queryKey?: QueryKey;
}

export const useIsDemoCompany = ({ queryKey = [], companyId, ...options }: useIsDemoCompanyOptions) =>
  useQuery({
    queryKey: ['isDemoCompany', queryKey],
    queryFn: async () => await isDemoCompany(companyId),
    ...options
  });
