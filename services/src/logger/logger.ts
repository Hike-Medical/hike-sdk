import { LoggerProvider, LoggerOptions, LogContext } from '@hike/types';

export class Logger {
  private providers: LoggerProvider[] = [];
  private globalContext?: LogContext;

  constructor(options?: LoggerOptions) {
    if (options?.providers) {
      this.providers = options.providers;
    }
    this.globalContext = options?.globalContext;
  }

  addProvider(provider: LoggerProvider): void {
    this.providers.push(provider);
  }

  debug(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    this.providers.forEach(provider => provider.debug(message, mergedContext));
  }

  info(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    this.providers.forEach(provider => provider.info(message, mergedContext));
  }

  warn(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    this.providers.forEach(provider => provider.warn(message, mergedContext));
  }

  error(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    this.providers.forEach(provider => provider.error(message, mergedContext));
  }
}
