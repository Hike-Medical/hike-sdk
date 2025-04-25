'use client';

import { datadogLogs, LogsInitConfiguration } from '@datadog/browser-logs';
import { AppId, HikeEnvironment } from '@hike/sdk';
import { CompanyContext, SessionContext } from '@hike/sdk/ui';
import { useParams } from 'next/navigation';
import { ReactNode, use, useEffect, useState } from 'react';

const setGlobalContext = (config: Omit<DataDogProviderProps, 'children'>) => {
  datadogLogs.setGlobalContext({
    appEnv: config.hikeEnvironment,
    appId: config.appId,
    appVersion: config.appVersion
  });
};

const initializeDataDog = (config: Omit<DataDogProviderProps, 'children'>) => {
  if (!config.dataDogClientToken) {
    return;
  }

  datadogLogs.init({
    clientToken: config.dataDogClientToken,
    site: config.dataDogSite as LogsInitConfiguration['site'],
    service: config.appId.toString().replaceAll('@', '').replaceAll('/', ':'),
    env: config.hikeEnvironment,
    version: config.appVersion,
    forwardErrorsToLogs: true,
    sessionSampleRate: 100
  });

  datadogLogs.logger.setHandler(['console', 'http']);
  setGlobalContext(config);
};

interface DataDogProviderProps {
  dataDogClientToken: string | undefined;
  dataDogSite: string | undefined;
  appId: AppId;
  appVersion: string;
  hikeEnvironment: HikeEnvironment;
  children: ReactNode;
}

export const DataDogProvider = ({ children, ...config }: DataDogProviderProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const { user, status } = use(SessionContext);
  const params = useParams<{ workbenchId: string }>();

  useEffect(() => {
    if (!hasInitialized) {
      return;
    }

    switch (status) {
      case 'AUTHENTICATED':
        datadogLogs.setUser({ id: user?.id ?? '' });
        break;
      case 'UNAUTHENTICATED':
        datadogLogs.clearUser();
        datadogLogs.clearGlobalContext();
        setGlobalContext(config);
        break;
      default:
        break;
    }

    datadogLogs.setGlobalContextProperty('userId', user?.id);
    datadogLogs.setGlobalContextProperty('workbenchId', params.workbenchId || null);
  }, [hasInitialized, user, status, params.workbenchId]);

  useEffect(() => {
    if (!hasInitialized) {
      initializeDataDog(config);
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  return children;
};

export const DataDogCompanyProvider = () => {
  const { user } = use(SessionContext);
  const company = use(CompanyContext);

  useEffect(() => {
    datadogLogs.setGlobalContextProperty('companyId', company?.id);
    datadogLogs.setGlobalContextProperty('companyRole', user?.companies[company?.id || ''] || null);
    datadogLogs.setGlobalContextProperty('companies', (!company?.id && user?.companies) || null);
    datadogLogs.setGlobalContextProperty('patientId', user?.patients?.[company?.id || ''] || null);
  }, [user, company?.id]);

  return null;
};
