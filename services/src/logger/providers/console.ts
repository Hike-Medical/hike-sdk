import { LogContext, LoggerProvider } from '@hike/types/src/logger';

/**
 * Console logger provider implementation
 * Provides development-friendly console logging with context support
 */
export class ConsoleLoggerProvider implements LoggerProvider {
  private globalContext: LogContext = {};

  /**
   * Log a debug message.
   */
  debug(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    console.debug(message, mergedContext);
  }

  /**
   * Log an info message.
   */
  info(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    console.info(message, mergedContext);
  }

  /**
   * Log a warning message.
   */
  warn(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    console.warn(message, mergedContext);
  }

  /**
   * Log an error message.
   */
  error(message: string, context?: LogContext): void {
    const mergedContext = { ...this.globalContext, ...context };
    console.error(message, mergedContext);
  }
}
