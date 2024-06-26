import type { Company } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findCompaniesBySession } from '../../auth/findCompaniesBySession';
import { ResponseError } from '../../errors/ResponseError';

export interface UseCompaniesBySessionOptions {
  key?: string[];
  enabled?: boolean;
}

export const useCompaniesBySession = ({ key = [], enabled = true }: UseCompaniesBySessionOptions) =>
  useQuery<Company[], ResponseError<null>>({
    queryKey: ['session', 'companies', ...key],
    queryFn: async () => await findCompaniesBySession(),
    enabled
  });
