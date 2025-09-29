import { describe, expect, test } from '@jest/globals';
import { formatRenderType } from '../src/converters/formatRenderType';

describe('formatRenderType', () => {
  test('returns correct keys for valid numbers', () => {
    expect(formatRenderType(0)).toBe('Both');
    expect(formatRenderType(1)).toBe('Left Only');
    expect(formatRenderType(2)).toBe('Right Only');
    expect(formatRenderType(3)).toBe('Left Mirror');
    expect(formatRenderType(4)).toBe('Right Mirror');
  });

  test('returns null for unknown numbers', () => {
    expect(formatRenderType(99)).toBeNull();
    expect(formatRenderType(-1)).toBeNull();
  });

  test('returns null for non-number types', () => {
    expect(formatRenderType('1')).toBeNull();
    expect(formatRenderType(undefined)).toBeNull();
    expect(formatRenderType(null)).toBeNull();
    expect(formatRenderType({})).toBeNull();
    expect(formatRenderType([0])).toBeNull();
  });

  test('returns null for NaN, Infinity, non-finite numbers', () => {
    expect(formatRenderType(NaN)).toBeNull();
    expect(formatRenderType(Infinity)).toBeNull();
    expect(formatRenderType(-Infinity)).toBeNull();
  });
});
