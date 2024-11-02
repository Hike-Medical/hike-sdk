import { configureServices, findCompanyBySlug } from '@hike/services';
import { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';
import { CompanyProviderClient } from './CompanyProviderClient';

export const CompanyProvider = async ({
  config,
  slug,
  children
}: {
  slug: string;
  config: HikeConfig;
  children: ReactNode;
}): Promise<ReactNode> => {
  try {
    const company = await findCompanyBySlug(slug);
    configureServices({ ...config, companyId: company.id }); // Server-side initialization
    return (
      <CompanyProviderClient company={company} config={config}>
        {children}
      </CompanyProviderClient>
    );
  } catch {
    return children;
  }
};

// Re-export client-side functionality
export { useCompany } from './CompanyProviderClient';
