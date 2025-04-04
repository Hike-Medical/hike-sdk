import type { CompanyExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getCompany } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetCompanyOptions extends Omit<UseQueryOptions<CompanyExtended, HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyId: string;
  queryKey?: QueryKey;
}

export const useGetCompany = ({ companyId, queryKey = [], ...options }: UseGetCompanyOptions) =>
  useQuery({
    queryKey: ['company', companyId, queryKey],
    queryFn: async () => await getCompany(companyId),
    ...options
  });
