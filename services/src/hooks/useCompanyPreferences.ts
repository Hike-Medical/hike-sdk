import type { CompanyExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findCompanyPreferences } from '../api/company.service';
import { ResponseError } from '../errors/ResponseError';

export interface useCompanyPreferencesOptions {
  key?: string[];
  enabled?: boolean;
}

export const useCompanyPreferences = ({ key = [], enabled = true }: useCompanyPreferencesOptions) =>
  useQuery<CompanyExtended['preferences'], ResponseError<null>>({
    queryKey: ['session', 'companies', ...key],
    queryFn: async () => await findCompanyPreferences(),
    enabled
  });
