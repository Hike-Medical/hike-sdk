import { normalizeGeography } from '../src/geography/utils/normalizeGeography';

describe('normalizeGeography', () => {
  describe('country normalization', () => {
    it('should normalize United States variations to US', () => {
      expect(normalizeGeography({ country: 'United States' }).country).toBe('US');
      expect(normalizeGeography({ country: 'united states' }).country).toBe('US');
      expect(normalizeGeography({ country: 'UNITED STATES' }).country).toBe('US');
      expect(normalizeGeography({ country: 'United States of America' }).country).toBe('US');
      expect(normalizeGeography({ country: 'USA' }).country).toBe('US');
      expect(normalizeGeography({ country: 'us' }).country).toBe('US');
      expect(normalizeGeography({ country: 'U.S.' }).country).toBe('US');
      expect(normalizeGeography({ country: 'U.S.A.' }).country).toBe('US');
      expect(normalizeGeography({ country: 'America' }).country).toBe('US');
    });

    it('should normalize Canada variations to CA', () => {
      expect(normalizeGeography({ country: 'Canada' }).country).toBe('CA');
      expect(normalizeGeography({ country: 'canada' }).country).toBe('CA');
      expect(normalizeGeography({ country: 'CA' }).country).toBe('CA');
      expect(normalizeGeography({ country: 'CAN' }).country).toBe('CA');
    });

    it('should default to US when no country provided', () => {
      expect(normalizeGeography({}).country).toBe('US');
      expect(normalizeGeography({ country: null }).country).toBe('US');
    });

    it('should return input unchanged for unknown countries', () => {
      expect(normalizeGeography({ country: 'Mexico' }).country).toBe('Mexico');
      expect(normalizeGeography({ country: 'Unknown' }).country).toBe('Unknown');
    });
  });

  describe('state/province normalization', () => {
    it('should normalize full US state names to abbreviations', () => {
      expect(normalizeGeography({ stateOrProvince: 'California' }).stateOrProvince).toBe('CA');
      expect(normalizeGeography({ stateOrProvince: 'New York' }).stateOrProvince).toBe('NY');
      expect(normalizeGeography({ stateOrProvince: 'Texas' }).stateOrProvince).toBe('TX');
      expect(normalizeGeography({ stateOrProvince: 'Florida' }).stateOrProvince).toBe('FL');
      expect(normalizeGeography({ stateOrProvince: 'District of Columbia' }).stateOrProvince).toBe('DC');
    });

    it('should handle case-insensitive state names', () => {
      expect(normalizeGeography({ stateOrProvince: 'california' }).stateOrProvince).toBe('CA');
      expect(normalizeGeography({ stateOrProvince: 'CALIFORNIA' }).stateOrProvince).toBe('CA');
      expect(normalizeGeography({ stateOrProvince: 'CaLiFoRnIa' }).stateOrProvince).toBe('CA');
    });

    it('should preserve valid abbreviations', () => {
      expect(normalizeGeography({ stateOrProvince: 'CA' }).stateOrProvince).toBe('CA');
      expect(normalizeGeography({ stateOrProvince: 'NY' }).stateOrProvince).toBe('NY');
      expect(normalizeGeography({ stateOrProvince: 'ca' }).stateOrProvince).toBe('CA');
      expect(normalizeGeography({ stateOrProvince: 'ny' }).stateOrProvince).toBe('NY');
      expect(normalizeGeography({ stateOrProvince: 'n.j.' }).stateOrProvince).toBe('NJ');
    });

    it('should handle whitespace', () => {
      expect(normalizeGeography({ stateOrProvince: '  California  ' }).stateOrProvince).toBe('CA');
      expect(normalizeGeography({ stateOrProvince: '  CA  ' }).stateOrProvince).toBe('CA');
    });

    it('should return empty string for null/undefined', () => {
      expect(normalizeGeography({ stateOrProvince: null }).stateOrProvince).toBe('');
      expect(normalizeGeography({}).stateOrProvince).toBe('');
    });

    it('should return input unchanged for unrecognized states', () => {
      expect(normalizeGeography({ stateOrProvince: 'Unknown' }).stateOrProvince).toBe('Unknown');
      expect(normalizeGeography({ stateOrProvince: 'XX' }).stateOrProvince).toBe('XX');
    });
  });

  describe('combined normalization', () => {
    it('should normalize both country and state together', () => {
      const result = normalizeGeography({
        stateOrProvince: 'California',
        country: 'USA'
      });
      expect(result.stateOrProvince).toBe('CA');
      expect(result.country).toBe('US');
    });

    it('should handle different country with state', () => {
      const result = normalizeGeography({
        stateOrProvince: 'Ontario',
        country: 'Canada'
      });
      expect(result.stateOrProvince).toBe('Ontario'); // Not in US map
      expect(result.country).toBe('CA');
    });

    it('should handle all lowercase input', () => {
      const result = normalizeGeography({
        stateOrProvince: 'new york',
        country: 'united states'
      });
      expect(result.stateOrProvince).toBe('NY');
      expect(result.country).toBe('US');
    });
  });
});
