import { formatMBI } from '../src/converters/formatMBI';

describe('formatMBI', () => {
  it('should convert lowercase to uppercase', () => {
    expect(formatMBI('1eg4te5mk73')).toBe('1EG4TE5MK73');
  });

  it('should trim whitespace', () => {
    expect(formatMBI('  1EG4TE5MK73  ')).toBe('1EG4TE5MK73');
    expect(formatMBI('\t1EG4TE5MK73\n')).toBe('1EG4TE5MK73');
  });

  it('should remove dashes', () => {
    expect(formatMBI('1EG4-TE5-MK73')).toBe('1EG4TE5MK73');
    expect(formatMBI('1-E-G-4-T-E-5-M-K-7-3')).toBe('1EG4TE5MK73');
  });

  it('should replace O with 0', () => {
    expect(formatMBI('1OG4TE5MK73')).toBe('10G4TE5MK73');
    expect(formatMBI('OOOO')).toBe('0000');
  });

  it('should replace I with 1', () => {
    expect(formatMBI('1EG4TE5MKI3')).toBe('1EG4TE5MK13');
    expect(formatMBI('IIII')).toBe('1111');
  });

  it('should replace B with 8', () => {
    expect(formatMBI('1BG4TE5MK73')).toBe('18G4TE5MK73');
    expect(formatMBI('BBBB')).toBe('8888');
  });

  it('should apply all transformations together', () => {
    expect(formatMBI('  1obi-te5m-k73  ')).toBe('1081TE5MK73');
    expect(formatMBI('obi')).toBe('081');
  });

  it('should return valid MBI unchanged', () => {
    expect(formatMBI('1EG4TE5MK73')).toBe('1EG4TE5MK73');
  });

  it('should handle empty string', () => {
    expect(formatMBI('')).toBe('');
  });
});

