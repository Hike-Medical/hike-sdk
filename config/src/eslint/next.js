import { configs, plugins } from 'eslint-config-airbnb-extended';
import { config as reactConfig } from './react.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  plugins.next,
  ...configs.next.recommended, // Airbnb
  ...reactConfig
];
