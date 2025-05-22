import js from '@eslint/js';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import prettierPlugin from 'eslint-plugin-prettier';
import turboPlugin from 'eslint-plugin-turbo';

const jsConfig = [
  {
    // ESLint recommended
    name: 'js/config',
    ...js.configs.recommended
  },
  plugins.stylistic,
  plugins.importX,
  ...configs.base.recommended // Airbnb
];

const typescriptConfig = [
  plugins.typescriptEslint,
  ...configs.base.typescript // Airbnb
];

const prettierConfig = [
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin
    }
  },
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
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'error'
    }
  }
];

const customConfig = [
  {
    name: 'custom-recommended',
    rules: {
      'class-methods-use-this': 'off',
      'default-case': 'warn',
      'guard-for-in': 'warn',
      'max-classes-per-file': 'off',
      'no-await-in-loop': 'warn',
      'no-bitwise': 'warn',
      'no-nested-ternary': 'off',
      'no-plusplus': 'warn',
      'no-restricted-exports': 'off',
      'no-restricted-syntax': 'warn',
      'no-return-await': 'off',
      'no-shadow': 'off',
      'no-useless-constructor': 'off',
      'prefer-destructuring': 'warn',
      radix: 'warn'
    }
  },
  {
    ...plugins.stylistic,
    rules: {
      '@stylistic/lines-between-class-members': 'off'
    }
  },
  {
    ...plugins.importX,
    rules: {
      'import-x/extensions': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-unresolved': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/order': 'off'
    }
  },
  {
    ...plugins.typescriptEslint,
    rules: {
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          modifiers: ['unused'],
          format: ['camelCase'],
          leadingUnderscore: 'require'
        }
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-shadow': ['warn', { allow: ['_'] }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
      '@typescript-eslint/prefer-destructuring': 'warn',
      '@typescript-eslint/return-await': 'off'
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
  ...customConfig,
  {
    plugins: {
      // TODO: Remove once fixed all errors
      onlyWarn
    }
  },
  {
    ignores: ['dist/**', '__tests__/**', '.prettierrc.js']
  }
];
