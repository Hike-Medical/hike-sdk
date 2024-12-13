import { Logger } from '../logger';
import { LoggerProvider, LogContext } from '@hike/types';

class MockProvider implements LoggerProvider {
  logs: { level: string; message: string; context?: LogContext }[] = [];

  debug(message: string, context: LogContext = {}) {
    this.logs.push({ level: 'debug', message, context });
  }

  info(message: string, context: LogContext = {}) {
    this.logs.push({ level: 'info', message, context });
  }

  warn(message: string, context: LogContext = {}) {
    this.logs.push({ level: 'warn', message, context });
  }

  error(message: string, context: LogContext = {}) {
    this.logs.push({ level: 'error', message, context });
  }
}

describe('Logger', () => {
  let provider1: MockProvider;
  let provider2: MockProvider;
  let logger: Logger;

  beforeEach(() => {
    provider1 = new MockProvider();
    provider2 = new MockProvider();
    logger = new Logger({
      providers: [provider1, provider2],
      appId: '@hike/consumer-web'
    });
  });

  test('should log messages to all providers', () => {
    const testMessage = 'test message';
    logger.info(testMessage);

    expect(provider1.logs).toHaveLength(1);
    expect(provider2.logs).toHaveLength(1);
    expect(provider1.logs[0]).toEqual({ level: 'info', message: testMessage, context: {} });
    expect(provider2.logs[0]).toEqual({ level: 'info', message: testMessage, context: {} });
  });

  test('should handle all log levels', () => {
    const testMessage = 'test message';
    const levels = ['debug', 'info', 'warn', 'error'] as const;

    levels.forEach((level) => {
      logger[level](testMessage);

      const lastLog1 = provider1.logs[provider1.logs.length - 1];
      const lastLog2 = provider2.logs[provider2.logs.length - 1];

      expect(lastLog1).toEqual({ level, message: testMessage, context: {} });
      expect(lastLog2).toEqual({ level, message: testMessage, context: {} });
    });
  });

  test('should handle context in log messages', () => {
    const testMessage = 'test message';
    const testContext = { userId: '123', action: 'test' };

    logger.info(testMessage, testContext);

    const lastLog1 = provider1.logs[provider1.logs.length - 1];
    const lastLog2 = provider2.logs[provider2.logs.length - 1];

    expect(lastLog1).toEqual({
      level: 'info',
      message: testMessage,
      context: testContext,
    });
    expect(lastLog2).toEqual({
      level: 'info',
      message: testMessage,
      context: testContext,
    });
  });

  test('should work with no providers', () => {
    const noProviderLogger = new Logger({
      providers: [],
      appId: '@hike/consumer-web'
    });
    const testMessage = 'test message';

    // Should not throw errors when logging without providers
    expect(() => {
      noProviderLogger.debug(testMessage);
      noProviderLogger.info(testMessage);
      noProviderLogger.warn(testMessage);
      noProviderLogger.error(testMessage);
    }).not.toThrow();
  });
});
