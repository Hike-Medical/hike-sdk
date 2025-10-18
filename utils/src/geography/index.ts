import { countries } from './countries';

export * from './countries';
export * from './utils';

// Re-export countries as geography for backward compatibility
export const geography = countries;
