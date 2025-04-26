import { datadogLogs } from '@datadog/browser-logs';

/**
 * Logger utility for logging messages with different severity levels.
 */
export const logger = {
  debug: (message: string, context?: object) => {
    if (typeof window === 'undefined' || !datadogLogs.getInitConfiguration()) {
      console.debug(message, context);
      return;
    }

    datadogLogs.logger.debug(message, context);
  },
  info: (message: string, context?: object) => {
    if (typeof window === 'undefined' || !datadogLogs.getInitConfiguration()) {
      console.log(message, context);
      return;
    }

    datadogLogs.logger.info(message, context);
  },
  warn: (message: string, context?: object) => {
    if (typeof window === 'undefined' || !datadogLogs.getInitConfiguration()) {
      console.warn(message, context);
      return;
    }

    datadogLogs.logger.warn(message, context);
  },
  error: (message: string, context?: object | Error) => {
    if (typeof window === 'undefined' || !datadogLogs.getInitConfiguration()) {
      console.error(message, context);
      return;
    }

    datadogLogs.logger.error(
      message,
      !(context instanceof Error) ? context : undefined,
      context instanceof Error ? context : undefined
    );
  }
};
