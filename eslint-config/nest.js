import onlyWarn from 'eslint-plugin-only-warn';
import { config as baseConfig } from './base.js';

/**
 * A shared ESLint configuration that use NestJS.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  ...baseConfig,
  {
    plugins: {
      // TODO: Remove once fixed all errors
      onlyWarn
    }
  }
];
