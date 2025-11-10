/**
 * Logger interface for dependency injection
 * Allows different implementations (console, Winston, custom, etc.)
 */
export interface Logger {
  log(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
  verbose?(message: string, ...args: unknown[]): void;
}

/**
 * Console logger implementation for testing and development
 */
export class ConsoleLogger implements Logger {
  log(message: string, ...args: unknown[]): void {
    console.log(message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

  verbose(message: string, ...args: unknown[]): void {
    console.log('[VERBOSE]', message, ...args);
  }
}

