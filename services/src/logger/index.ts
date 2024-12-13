import { HikeConfig } from '@hike/types';
import { LoggerProvider } from '@hike/types/src/logger/types';
import { Logger } from './logger';
import { ConsoleLoggerProvider, DatadogLoggerProvider } from './providers';

export const createLogger = (config: HikeConfig): Logger => {
  const providers: LoggerProvider[] = [new ConsoleLoggerProvider()];

  if (process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN && process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID) {
    providers.push(
      new DatadogLoggerProvider({
        clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN,
        applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID,
        site: process.env.NEXT_PUBLIC_DATADOG_SITE
      })
    );
  }

  const logger = new Logger({
    appId: config.appId,
    providers,
    globalContext: {
      environment: config.appEnv,
      version: config.appVersion
    }
  });

  return logger;
};

export { Logger } from './logger';
export { ConsoleLoggerProvider, DatadogLoggerProvider };
export type { LoggerProvider };
