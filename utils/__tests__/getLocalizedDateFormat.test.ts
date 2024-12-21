import { describe, expect, it } from '@jest/globals';
import { getLocalizedDateFormat } from '../src/helpers/getLocalizedDateFormat';

describe('getLocalizedDateFormat', () => {
  it('should return the date format for US locale', () => {
    const format = getLocalizedDateFormat({ locale: 'en-US' });
    expect(format).toBe('MM/DD/YYYY');
  });

  it('should return the date format for UK locale', () => {
    const format = getLocalizedDateFormat({ locale: 'en-GB' });
    expect(format).toBe('DD/MM/YYYY');
  });

  it('should return the date format for Japanese locale', () => {
    const format = getLocalizedDateFormat({ locale: 'ja-JP' });
    expect(format).toBe('YYYY/MM/DD');
  });

  it('should return the date format for Korean locale', () => {
    const format = getLocalizedDateFormat({ locale: 'ko-KR' });
    expect(format).toBe('YYYY.MM.DD');
  });

  it('should return the date format for Chinese locale', () => {
    const format = getLocalizedDateFormat({ locale: 'zh-CN' });
    expect(format).toBe('YYYY/MM/DD');
  });

  it('should return the date format for German locale', () => {
    const format = getLocalizedDateFormat({ locale: 'de-DE' });
    expect(format).toBe('DD.MM.YYYY');
  });

  it('should return the date format for French locale', () => {
    const format = getLocalizedDateFormat({ locale: 'fr-FR' });
    expect(format).toBe('DD/MM/YYYY');
  });

  it('should return the date format for Russian locale', () => {
    const format = getLocalizedDateFormat({ locale: 'ru-RU' });
    expect(format).toBe('DD.MM.YYYY');
  });

  it('should return the date format for Brazilian locale', () => {
    const format = getLocalizedDateFormat({ locale: 'pt-BR' });
    expect(format).toBe('DD/MM/YYYY');
  });

  it('should return the date format for Saudi Arabia locale', () => {
    const format = getLocalizedDateFormat({ locale: 'ar-SA' });
    expect(format.replace(/\u200F/g, '')).toBe('DD/MM/YYYY'); // Strips Unicode bidirectional marks
  });

  it('should add spaces around the default separator if addSpaces is true', () => {
    const formatUS = getLocalizedDateFormat({ locale: 'en-US', addSpaces: true });
    const formatKR = getLocalizedDateFormat({ locale: 'ko-KR', addSpaces: true });

    expect(formatUS).toBe('MM / DD / YYYY');
    expect(formatKR).toBe('YYYY . MM . DD');
  });

  it('should use a custom separator if specified', () => {
    const format = getLocalizedDateFormat({ locale: 'en-US', separator: '-' });
    expect(format).toBe('MM-DD-YYYY');
  });

  it('should use a custom separator with spaces if addSpaces is true', () => {
    const format = getLocalizedDateFormat({ locale: 'en-US', separator: '-', addSpaces: true });
    expect(format).toBe('MM - DD - YYYY');
  });

  it('should handle non-Latin locales and normalize their separators with spaces', () => {
    const formatAr = getLocalizedDateFormat({ locale: 'ar-SA', addSpaces: true });
    expect(formatAr.replace(/\u200F/g, '')).toBe('DD / MM / YYYY');
  });

  it('should return consistent formats for repeated calls with the same parameters', () => {
    const format1 = getLocalizedDateFormat({ locale: 'en-US', separator: '/' });
    const format2 = getLocalizedDateFormat({ locale: 'en-US', separator: '/' });

    expect(format1).toBe(format2);
  });

  it('should return different formats for different locales', () => {
    const formatUS = getLocalizedDateFormat({ locale: 'en-US' });
    const formatKR = getLocalizedDateFormat({ locale: 'ko-KR' });

    expect(formatUS).not.toBe(formatKR);
    expect(formatUS).toBe('MM/DD/YYYY');
    expect(formatKR).toBe('YYYY.MM.DD');
  });
});
