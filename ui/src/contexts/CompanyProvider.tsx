import { configureCompany, configureServices, findCompanyBySlug } from '@hike/services';
import { HikeConfig } from '@hike/types';
import { JSX, ReactNode } from 'react';
import { CompanyProviderClient } from './CompanyProviderClient';

interface CompanyProviderProps {
  slug: string;
  config: HikeConfig;
  children: ReactNode;
  companyNotFoundRender?: JSX.Element;
}

export default async function CompanyProvider({ slug, config, children, companyNotFoundRender }: CompanyProviderProps) {
  configureServices(config);
  const company = await findCompanyBySlug(slug);
  configureCompany(company.id);

  if (!company.active && companyNotFoundRender) {
    return <>{companyNotFoundRender}</>
  }

  return (
    <CompanyProviderClient company={company} config={config}>
      {children}
    </CompanyProviderClient>
  );
}
