// Mock DataDog
global.DD_RUM = {
  init: jest.fn(),
  addRumGlobalContext: jest.fn(),
  setUser: jest.fn(),
  startView: jest.fn(),
  addError: jest.fn()
};

// Mock console methods
global.console = {
  ...console,
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};
