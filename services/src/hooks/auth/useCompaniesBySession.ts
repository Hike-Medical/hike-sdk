import type { Company } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findCompaniesBySession } from '../../auth/findCompaniesBySession';
import { HikeError } from '../../errors/HikeError';

export interface UseCompaniesBySessionOptions {
  key?: string[];
  enabled?: boolean;
}

export const useCompaniesBySession = ({ key = [], enabled = true }: UseCompaniesBySessionOptions) =>
  useQuery<Company[], HikeError<null>>({
    queryKey: ['session', 'companies', ...key],
    queryFn: async () => await findCompaniesBySession(),
    enabled
  });
