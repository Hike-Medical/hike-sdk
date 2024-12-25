import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findCompanyByName } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

export interface UseCompaniesByNameOptions
  extends Omit<
    UseQueryOptions<Awaited<ReturnType<typeof findCompanyByName>>, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  params: { name: string };
  queryKey?: QueryKey;
}

export const useCompaniesByName = ({ params, queryKey = [], ...options }: UseCompaniesByNameOptions) =>
  useQuery({
    queryKey: ['companiesByName', params, queryKey],
    queryFn: async () => await findCompanyByName(params.name),
    ...options
  });
