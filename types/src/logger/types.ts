import { AppId } from '../config/AppId';

/**
 * Available log levels for the logger.
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Context that can be passed with log messages.
 */
export type LogContext = Record<string, unknown>;

/**
 * Interface for logger providers (e.g., console, Datadog).
 */
export interface LoggerProvider {
  /**
   * Log a debug message.
   * @param message - The message to log
   * @param context - Optional context data
   */
  debug(message: string, context?: LogContext): void;

  /**
   * Log an info message.
   * @param message - The message to log
   * @param context - Optional context data
   */
  info(message: string, context?: LogContext): void;

  /**
   * Log a warning message.
   * @param message - The message to log
   * @param context - Optional context data
   */
  warn(message: string, context?: LogContext): void;

  /**
   * Log an error message.
   * @param message - The message to log
   * @param context - Optional context data
   */
  error(message: string, context?: LogContext): void;
}

/**
 * Configuration options for initializing a logger.
 */
export interface LoggerOptions {
  /**
   * The application identifier.
   */
  appId: AppId;

  /**
   * Array of logger providers to use.
   */
  providers: LoggerProvider[];

  /**
   * Global context to include with all log messages.
   */
  globalContext?: LogContext;
}

/**
 * Configuration for Datadog logger provider.
 */
export interface DatadogLoggerConfig {
  /**
   * Datadog client token for RUM and Logs.
   */
  clientToken: string;

  /**
   * Application identifier in Datadog.
   */
  applicationId: string;

  /**
   * Site to send logs to (e.g., 'datadoghq.com').
   */
  site?: string;
}

export type { AppId };
