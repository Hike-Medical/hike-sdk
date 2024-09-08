import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { isDemoCompany } from '../../api/company.service';
import { ResponseError } from '../../errors/ResponseError';

export interface useIsDemoCompanyOptions
  extends Omit<UseQueryOptions<boolean, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useIsDemoCompany = ({ queryKey = [], ...options }: useIsDemoCompanyOptions = {}) =>
  useQuery({
    queryKey: ['isDemoCompany', queryKey],
    queryFn: async () => await isDemoCompany(),
    ...options
  });
