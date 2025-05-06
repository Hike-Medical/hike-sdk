import js from '@eslint/js';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import onlyWarn from 'eslint-plugin-only-warn';

const jsConfig = [
  // ESLint Recommended Rules
  {
    name: 'js/config',
    ...js.configs.recommended
  },
  // Stylistic Plugin
  plugins.stylistic,
  // Import X Plugin
  plugins.importX,
  // Airbnb Base Recommended Config
  ...configs.base.recommended
];

const typescriptConfig = [
  // TypeScript ESLint Plugin
  plugins.typescriptEslint,
  // Airbnb Base TypeScript Config
  ...configs.base.typescript
];

const prettierConfig = [
  // Prettier Plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin
    }
  },
  // Prettier Config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'warn'
    }
  }
];

const turboConfig = [
  {
    // Turbo Plugin
    plugins: {
      turbo: turboPlugin
    },
    // Turbo Config
    rules: {
      'turbo/no-undeclared-env-vars': 'warn'
    }
  }
];

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  ...jsConfig,
  ...typescriptConfig,
  ...prettierConfig,
  ...turboConfig,
  // {
  //   name: 'typescript:custom-overrides',
  //   files: ['**/*.ts', '**/*.tsx'],
  //   plugins: {
  //     '@typescript-eslint': plugins.typescriptEslint
  //   },
  // rules: {
  //   '@typescript-eslint/ban-ts-comment': 'warn',
  //   '@typescript-eslint/class-methods-use-this': 'off',
  //   '@typescript-eslint/consistent-type-assertions': 'warn',
  //   '@typescript-eslint/lines-between-class-members': 'off',
  //   '@typescript-eslint/naming-convention': [
  //     'warn',
  //     {
  //       selector: 'variable',
  //       modifiers: ['unused'],
  //       format: ['camelCase'],
  //       leadingUnderscore: 'require'
  //     }
  //   ],
  //   '@typescript-eslint/no-empty-object-type': 'off',
  //   '@typescript-eslint/no-explicit-any': 'warn',
  //   '@typescript-eslint/no-shadow': ['warn', { allow: ['_'] }],
  //   '@typescript-eslint/no-unused-vars': [
  //     'warn',
  //     {
  //       argsIgnorePattern: '^_',
  //       varsIgnorePattern: '^_'
  //     }
  //   ],
  //   '@typescript-eslint/no-throw-literal': 'off',
  //   '@typescript-eslint/no-use-before-define': 'off',
  //   '@typescript-eslint/no-useless-constructor': 'error',
  //   '@typescript-eslint/return-await': 'off'
  // '@stylistic/lines-between-class-members': 'off',
  // 'class-methods-use-this': 'off',
  // 'default-case': 'warn',
  // 'guard-for-in': 'warn',
  // 'import/extensions': 'off',
  // 'import/no-extraneous-dependencies': 'off',
  // 'import/no-unresolved': 'off',
  // 'import/order': 'off',
  // 'import/prefer-default-export': 'off',
  // 'max-classes-per-file': 'off',
  // 'no-await-in-loop': 'warn',
  // 'no-nested-ternary': 'off',
  // 'no-plusplus': 'warn',
  // 'no-restricted-syntax': 'warn',
  // 'no-return-await': 'off',
  // 'no-shadow': 'off',
  // 'no-useless-constructor': 'off',
  // radix: 'warn',
  // 'react/react-in-jsx-scope': 'off'
  // }
  // },
  {
    plugins: {
      onlyWarn
    }
  },
  {
    ignores: ['dist/**']
  }
];
