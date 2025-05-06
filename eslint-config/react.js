import { plugins } from 'eslint-config-airbnb-extended';
import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  ...baseConfig,
  {
    ...plugins.react,
    rules: {
      'react/destructuring-assignment': 'warn',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': 'off',
      'react/no-unstable-nested-components': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off'
    }
  }
];
