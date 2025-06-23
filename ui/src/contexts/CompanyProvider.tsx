import { configureCompany, configureServices, findCompanyBySlug } from '@hike/services';
import { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';
import { CompanyProviderClient } from './CompanyProviderClient';

interface CompanyProviderProps {
  slug: string;
  config: HikeConfig;
  children: ReactNode;
  companyNotFoundRender?: () => ReactNode;
}

export default async function CompanyProvider({ slug, config, children, companyNotFoundRender }: CompanyProviderProps) {
  configureServices(config);
  const company = await findCompanyBySlug(slug);
  configureCompany(company.id);

  if (!company.active) {
    return <>{companyNotFoundRender}</>
  }

  return (
    <CompanyProviderClient company={company} config={config}>
      {children}
    </CompanyProviderClient>
  );
}
