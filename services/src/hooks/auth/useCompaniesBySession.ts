import type { SafeCompany } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findCompaniesBySession } from '../../api/auth.service';
import { HikeError } from '../../errors/HikeError';

interface UseCompaniesBySessionOptions {
  key?: string[];
  enabled?: boolean;
}

export const useCompaniesBySession = ({ key = [], enabled = true }: UseCompaniesBySessionOptions) =>
  useQuery<SafeCompany[], HikeError<null>>({
    queryKey: ['session', 'companies', ...key],
    queryFn: async () => await findCompaniesBySession(),
    enabled
  });
