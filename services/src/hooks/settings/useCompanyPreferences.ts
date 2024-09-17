import type { CompanyExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findCompanyPreferences } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

export interface useCompanyPreferencesOptions {
  key?: string[];
  enabled?: boolean;
}

export const useCompanyPreferences = ({ key = [], enabled = true }: useCompanyPreferencesOptions) =>
  useQuery<CompanyExtended['preferences'], HikeError<null>>({
    queryKey: ['session', 'companies', ...key],
    queryFn: async () => await findCompanyPreferences(),
    enabled
  });
