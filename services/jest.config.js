module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@hike/(.*)$': '<rootDir>/../../packages/hike-sdk/$1'
  },
  setupFiles: ['<rootDir>/jest.setup.js']
};
