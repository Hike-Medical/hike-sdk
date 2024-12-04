'use client';

import { configureServices } from '@hike/services';
import type { HikeConfig, SafeCompany } from '@hike/types';
import { ReactNode, createContext, useContext } from 'react';

interface CompanyProviderClientProps {
  company: SafeCompany | null;
  config: HikeConfig;
  children: ReactNode;
}

const CompanyContext = createContext<CompanyProviderClientProps['company']>(null);

export const CompanyProviderClient = ({ company, config, children }: CompanyProviderClientProps) => {
  configureServices({ ...config, companyId: company?.id }); // Client-side initialization
  return <CompanyContext.Provider value={company}>{children}</CompanyContext.Provider>;
};

export const useCompany = () => useContext(CompanyContext);
