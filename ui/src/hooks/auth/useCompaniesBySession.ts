import { findCompaniesBySession } from '@hike/services';
import type { SafeCompany } from '@hike/types';
import { HikeError } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

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
