'use client';

import { configureServices } from '@hike/services';
import type { HikeConfig, SafeCompany } from '@hike/types';
import { ReactNode, createContext } from 'react';

interface CompanyProviderClientProps {
  company: SafeCompany | null;
  config: HikeConfig;
  children: ReactNode;
}

export const CompanyProviderClient = ({ company, config, children }: CompanyProviderClientProps) => {
  configureServices({ ...config, companyId: company?.id }); // Client-side initialization
  return <CompanyContext value={company}>{children}</CompanyContext>;
};

export const CompanyContext = createContext<SafeCompany | null>(null);
