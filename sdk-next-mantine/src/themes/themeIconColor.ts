import { isEmpty } from '@hike/sdk';

export const themeIconColor = (value: unknown) => (!isEmpty(value) ? 'var(--mantine-color-hike-9)' : 'var(--input-bd)');
