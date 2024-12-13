import { datadogLogs } from '@datadog/browser-logs';
import { LogContext, LoggerProvider, DatadogLoggerConfig } from '@hike/types/src/logger';

/**
 * Datadog logger provider implementation
 * Enables real-time log viewing in Datadog with context support
 */
export class DatadogLoggerProvider implements LoggerProvider {
  private globalContext: LogContext = {};

  constructor(config: DatadogLoggerConfig) {
    datadogLogs.init({
      clientToken: config.clientToken,
      site: config.site ?? 'datadoghq.com',
      service: config.applicationId,
      forwardErrorsToLogs: true,
      sessionSampleRate: 100
    });
  }

  /**
   * Log a debug message.
   */
  debug(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    datadogLogs.logger.debug(message, mergedContext);
  }

  /**
   * Log an info message.
   */
  info(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    datadogLogs.logger.info(message, mergedContext);
  }

  /**
   * Log a warning message.
   */
  warn(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    datadogLogs.logger.warn(message, mergedContext);
  }

  /**
   * Log an error message.
   */
  error(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    datadogLogs.logger.error(message, mergedContext);
  }

  /**
   * Set global context for all subsequent logs.
   */
  setGlobalContext(context: LogContext): void {
    this.globalContext = context;
    datadogLogs.setGlobalContext(context);
  }
}
