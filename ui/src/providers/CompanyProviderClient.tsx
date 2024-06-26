'use client';

import { configureServices } from '@hike/services';
import type { Company } from '@hike/types';
import { ReactNode, createContext, useContext } from 'react';

interface CompanyProviderClientProps {
  company: Pick<Company, 'id' | 'name' | 'slug' | 'logoUrl'>;
  children: ReactNode;
}

const CompanyContext = createContext<CompanyProviderClientProps['company']>(undefined as never);

export const CompanyProviderClient = ({ company, children }: CompanyProviderClientProps) => {
  configureServices({ companyId: company.id }); // Client-side initialization
  return <CompanyContext.Provider value={company}>{children}</CompanyContext.Provider>;
};

export const useCompany = () => useContext(CompanyContext);
