import { configs, plugins } from 'eslint-config-airbnb-extended';
import { config as baseConfig } from './base.js';
import routeOrderRule from './rules/route-order.js';

/**
 * A shared ESLint configuration that use NestJS.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  plugins.node,
  ...configs.node.recommended, // Airbnb
  ...baseConfig,
  {
    name: 'nestjs/custom-rules',
    rules: {
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_all', '_count', '_avg', '_sum', '_min', '_max'], // Allow specific Prisma keys
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true
        }
      ]
    }
  },
  {
    plugins: {
      hike: { rules: { 'route-order': routeOrderRule } }
    },
    rules: {
      'hike/route-order': 'warn'
    }
  }
];
