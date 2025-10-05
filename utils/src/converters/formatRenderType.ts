import { RenderType } from '@hike/types';
import { formatConstant } from './formatConstant';

/**
 * Format any value to its RenderType key.
 */
export const formatRenderType = (value: unknown): string | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  const key = Object.entries(RenderType).find(([, v]) => Number(v) === value)?.[0] as
    | keyof typeof RenderType
    | undefined;

  return key ? formatConstant(key) : null;
};
