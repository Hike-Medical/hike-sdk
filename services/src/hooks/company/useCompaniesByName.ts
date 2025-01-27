import type { GetCompanyByNameParams } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findCompanyByName } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

export interface UseCompaniesByNameOptions
  extends Omit<
    UseQueryOptions<Awaited<ReturnType<typeof findCompanyByName>>, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  name: string;
  params?: GetCompanyByNameParams;
  queryKey?: QueryKey;
}

export const useCompaniesByName = ({ name, params, queryKey = [], ...options }: UseCompaniesByNameOptions) =>
  useQuery({
    queryKey: ['companiesByName', name, params, queryKey],
    queryFn: async () => await findCompanyByName(name, params),
    ...options
  });
