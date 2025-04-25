'use client';

import { configureServices } from '@hike/services';
import type { HikeConfig, SafeCompany } from '@hike/types';
import { ReactNode, createContext } from 'react';

interface CompanyState {
  company: SafeCompany | null;
  config: HikeConfig;
  children: ReactNode;
}

export const CompanyContext = createContext<CompanyState['company']>(null);

export const CompanyProviderClient = ({ company, config, children }: CompanyState) => {
  configureServices({ ...config, companyId: company?.id }); // Client-side initialization
  return <CompanyContext value={company}>{children}</CompanyContext>;
};
