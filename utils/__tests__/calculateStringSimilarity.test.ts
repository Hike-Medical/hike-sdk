import { calculateStringSimilarity } from '../src/helpers/calculateStringSimilarity';

describe('calculateStringSimilarity', () => {
  describe('identical strings', () => {
    it('should return 1 for identical strings', () => {
      expect(calculateStringSimilarity('hello', 'hello')).toBe(1);
      expect(calculateStringSimilarity('test', 'test')).toBe(1);
      expect(calculateStringSimilarity('a', 'a')).toBe(1);
    });

    it('should return 1 for identical long strings', () => {
      const longString = 'this is a very long string with many characters';
      expect(calculateStringSimilarity(longString, longString)).toBe(1);
    });
  });

  describe('empty strings', () => {
    it('should return 0 for empty first string', () => {
      expect(calculateStringSimilarity('', 'hello')).toBe(0);
    });

    it('should return 0 for empty second string', () => {
      expect(calculateStringSimilarity('hello', '')).toBe(0);
    });

    it('should return 0 for both empty strings', () => {
      expect(calculateStringSimilarity('', '')).toBe(0);
    });
  });

  describe('single character differences', () => {
    it('should handle single character insertion', () => {
      // 'hello' vs 'helo' - 1 deletion out of 5 chars = 0.8
      expect(calculateStringSimilarity('hello', 'helo')).toBe(0.8);
    });

    it('should handle single character deletion', () => {
      // 'cat' vs 'cats' - 1 insertion out of 4 chars = 0.75
      expect(calculateStringSimilarity('cat', 'cats')).toBe(0.75);
    });

    it('should handle single character substitution', () => {
      // 'cat' vs 'bat' - 1 substitution out of 3 chars = 0.666...
      expect(calculateStringSimilarity('cat', 'bat')).toBeCloseTo(0.667, 2);
    });
  });

  describe('common name variations', () => {
    it('should detect similarity between Jon and John', () => {
      // 1 insertion out of 4 chars = 0.75
      expect(calculateStringSimilarity('Jon', 'John')).toBe(0.75);
    });

    it('should detect similarity between Jonathan and Johnathan', () => {
      // 1 insertion out of 9 chars ≈ 0.889
      expect(calculateStringSimilarity('Jonathan', 'Johnathan')).toBeCloseTo(0.889, 2);
    });

    it('should detect similarity between Smith and Smyth', () => {
      // 1 substitution out of 5 chars = 0.8
      expect(calculateStringSimilarity('Smith', 'Smyth')).toBe(0.8);
    });

    it('should detect similarity between Michael and Micheal', () => {
      // 1 substitution (transposition) = 2 edits out of 7 chars ≈ 0.714
      expect(calculateStringSimilarity('Michael', 'Micheal')).toBeCloseTo(0.714, 2);
    });
  });

  describe('case sensitivity', () => {
    it('should be case sensitive by default', () => {
      // Each case difference is a substitution
      expect(calculateStringSimilarity('Hello', 'hello')).toBe(0.8); // 1 out of 5
      expect(calculateStringSimilarity('HELLO', 'hello')).toBe(0); // All different
    });

    it('should work with lowercase comparison', () => {
      expect(calculateStringSimilarity('Hello'.toLowerCase(), 'hello'.toLowerCase())).toBe(1);
    });
  });

  describe('completely different strings', () => {
    it('should return low similarity for completely different strings', () => {
      expect(calculateStringSimilarity('abc', 'xyz')).toBe(0); // 3 substitutions out of 3
      expect(calculateStringSimilarity('hello', 'world')).toBeLessThan(0.5);
    });

    it('should return 0 for strings with no common characters', () => {
      expect(calculateStringSimilarity('aaa', 'bbb')).toBe(0);
    });
  });

  describe('strings of very different lengths', () => {
    it('should handle short vs long strings', () => {
      // 'a' vs 'abcdefgh' - 7 insertions out of 8 chars = 0.125
      expect(calculateStringSimilarity('a', 'abcdefgh')).toBe(0.125);
    });

    it('should handle long vs short strings', () => {
      // 'abcdefgh' vs 'a' - 7 deletions out of 8 chars = 0.125
      expect(calculateStringSimilarity('abcdefgh', 'a')).toBe(0.125);
    });
  });

  describe('real-world patient name scenarios', () => {
    it('should detect typos in first names', () => {
      expect(calculateStringSimilarity('Jennifer', 'Jenifer')).toBeGreaterThan(0.85); // Missing n
      expect(calculateStringSimilarity('Robert', 'Robrt')).toBeGreaterThan(0.8); // Missing e
    });

    it('should detect common nickname variations', () => {
      expect(calculateStringSimilarity('Bill', 'Billy')).toBeGreaterThan(0.6);
      expect(calculateStringSimilarity('Bob', 'Robert')).toBeLessThan(0.5); // Too different
    });

    it('should handle hyphenated names', () => {
      expect(calculateStringSimilarity('Mary-Jane', 'Mary Jane')).toBeGreaterThan(0.8);
    });

    it('should handle maiden name vs married name', () => {
      // Same first name should not match
      expect(calculateStringSimilarity('Smith', 'Johnson')).toBeLessThan(0.5);
    });
  });

  describe('edge cases', () => {
    it('should handle single character strings', () => {
      expect(calculateStringSimilarity('a', 'b')).toBe(0);
      expect(calculateStringSimilarity('a', 'a')).toBe(1);
    });

    it('should handle strings with special characters', () => {
      expect(calculateStringSimilarity('hello!', 'hello?')).toBe(5 / 6); // 1 diff out of 6
      expect(calculateStringSimilarity('test@example.com', 'test@example.com')).toBe(1);
    });

    it('should handle strings with numbers', () => {
      expect(calculateStringSimilarity('abc123', 'abc124')).toBe(5 / 6); // 1 diff out of 6
    });

    it('should handle strings with spaces', () => {
      expect(calculateStringSimilarity('hello world', 'helloworld')).toBeCloseTo(0.909, 2);
    });

    it('should handle unicode characters', () => {
      expect(calculateStringSimilarity('café', 'cafe')).toBe(0.75); // é vs e
      expect(calculateStringSimilarity('naïve', 'naive')).toBe(0.8); // ï vs i
    });
  });

  describe('threshold testing for patient matching', () => {
    it('should exceed 85% threshold for common typos', () => {
      const threshold = 0.85;
      expect(calculateStringSimilarity('Jennifer', 'Jenifer')).toBeGreaterThan(threshold);
      expect(calculateStringSimilarity('Christopher', 'Christoper')).toBeGreaterThan(threshold);
    });

    it('should not exceed 85% threshold for significantly different names', () => {
      const threshold = 0.85;
      expect(calculateStringSimilarity('John', 'Jane')).toBeLessThan(threshold);
      expect(calculateStringSimilarity('Smith', 'Johnson')).toBeLessThan(threshold);
    });
  });

  describe('performance with long strings', () => {
    it('should handle moderately long strings efficiently', () => {
      const str1 = 'a'.repeat(100);
      const str2 = 'a'.repeat(100);
      expect(calculateStringSimilarity(str1, str2)).toBe(1);
    });

    it('should handle long strings with differences', () => {
      const str1 = 'a'.repeat(50) + 'b';
      const str2 = 'a'.repeat(50) + 'c';
      expect(calculateStringSimilarity(str1, str2)).toBeCloseTo(1 - 1 / 51, 3);
    });
  });
});
