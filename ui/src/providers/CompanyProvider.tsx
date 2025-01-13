import { configureCompany, configureServices, findCompanyBySlug } from '@hike/services';
import { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';
import { CompanyProviderClient } from './CompanyProviderClient';

export const CompanyProvider = async ({
  slug,
  config,
  children
}: {
  slug: string;
  config: HikeConfig;
  children: ReactNode;
}): Promise<ReactNode> => {
  configureServices(config);
  const company = await findCompanyBySlug(slug);
  configureCompany(company.id);

  return (
    <CompanyProviderClient company={company} config={config}>
      {children}
    </CompanyProviderClient>
  );
};
