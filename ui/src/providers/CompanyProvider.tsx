import { findCompanyBySlug, init as serviceInit } from '@hike/services';
import { ReactNode } from 'react';
import { CompanyProviderClient } from './CompanyProviderClient';

interface CompanyLayoutProps {
  slug: string;
  children: ReactNode;
}

export const CompanyProvider = async ({ slug, children }: CompanyLayoutProps): Promise<ReactNode> => {
  try {
    const company = await findCompanyBySlug(slug);
    serviceInit({ companyId: company.id }); // Server-side initialization
    return <CompanyProviderClient company={company}>{children}</CompanyProviderClient>;
  } catch {
    return children;
  }
};

// Re-export client-side functionality
export { useCompany } from './CompanyProviderClient';
