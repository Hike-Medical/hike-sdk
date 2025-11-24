import { describe, expect, test } from '@jest/globals';
import { medicareMBI } from '../src';

describe('medicareMBI', () => {
  describe('valid MBI formats', () => {
    test('should accept the CMS example: 1EG4TE5MK73', () => {
      expect(() => medicareMBI.parse('1EG4TE5MK73')).not.toThrow();
    });

    test('should accept valid MBIs with all numeric positions', () => {
      expect(() => medicareMBI.parse('1AC0DE0FG12')).not.toThrow();
      expect(() => medicareMBI.parse('9AC0DE0FG99')).not.toThrow();
    });

    test('should accept valid MBIs with alphanumeric positions (3rd and 6th)', () => {
      expect(() => medicareMBI.parse('1AA0AA0AA00')).not.toThrow();
      expect(() => medicareMBI.parse('1A00A00AA00')).not.toThrow();
      expect(() => medicareMBI.parse('1A90A90AA00')).not.toThrow();
    });

    test('should accept MBIs with all allowed letters', () => {
      // Testing all allowed letters: A, C, D, E, F, G, H, J, K, M, N, P, Q, R, T, U, V, W, X, Y
      expect(() => medicareMBI.parse('1AC0DE0FG00')).not.toThrow();
      expect(() => medicareMBI.parse('1HJ0KM0NP00')).not.toThrow();
      expect(() => medicareMBI.parse('1QR0TU0VW00')).not.toThrow();
      expect(() => medicareMBI.parse('1XY0AC0DE00')).not.toThrow();
    });

    test('should accept MBIs with numbers in positions 3 and 6', () => {
      expect(() => medicareMBI.parse('1A00A00AA00')).not.toThrow();
      expect(() => medicareMBI.parse('1A90A90AA99')).not.toThrow();
    });
  });

  describe('invalid MBI formats', () => {
    test('should reject MBIs with position 1 as 0', () => {
      expect(() => medicareMBI.parse('0AC0DE0FG00')).toThrow();
    });

    test('should reject MBIs with excluded letters (S, L, O, I, B, Z)', () => {
      // Position 2 with excluded letters
      expect(() => medicareMBI.parse('1SC0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1LC0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1OC0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1IC0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1BC0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1ZC0DE0FG00')).toThrow();

      // Position 3 with excluded letters
      expect(() => medicareMBI.parse('1AS0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AL0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AO0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AI0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AB0DE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AZ0DE0FG00')).toThrow();

      // Position 5 with excluded letters
      expect(() => medicareMBI.parse('1AC0SE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0LE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0OE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0IE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0BE0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0ZE0FG00')).toThrow();

      // Position 6 with excluded letters
      expect(() => medicareMBI.parse('1AC0DS0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DL0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DO0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DI0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DB0FG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DZ0FG00')).toThrow();

      // Position 8 with excluded letters
      expect(() => medicareMBI.parse('1AC0DE0SG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0LG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0OG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0IG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0BG00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0ZG00')).toThrow();

      // Position 9 with excluded letters
      expect(() => medicareMBI.parse('1AC0DE0FS00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0FL00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0FO00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0FI00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0FB00')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0FZ00')).toThrow();
    });

    test('should reject MBIs with letters in numeric-only positions', () => {
      // Position 1 should be numeric 1-9
      expect(() => medicareMBI.parse('AAC0DE0FG00')).toThrow();

      // Position 4 should be numeric 0-9
      expect(() => medicareMBI.parse('1ACA DE0FG00')).toThrow();

      // Position 7 should be numeric 0-9
      expect(() => medicareMBI.parse('1AC0DEA FG00')).toThrow();

      // Position 10 should be numeric 0-9
      expect(() => medicareMBI.parse('1AC0DE0FGA0')).toThrow();

      // Position 11 should be numeric 0-9
      expect(() => medicareMBI.parse('1AC0DE0FG0A')).toThrow();
    });

    test('should reject MBIs with incorrect length', () => {
      expect(() => medicareMBI.parse('1AC0DE0FG0')).toThrow(); // 10 chars
      expect(() => medicareMBI.parse('1AC0DE0FG000')).toThrow(); // 12 chars
      expect(() => medicareMBI.parse('')).toThrow(); // empty
      expect(() => medicareMBI.parse('1AC')).toThrow(); // too short
    });

    test('should reject MBIs with lowercase letters', () => {
      // The schema expects uppercase only
      expect(() => medicareMBI.parse('1ac0de0fg00')).toThrow();
      expect(() => medicareMBI.parse('1Ac0de0fg00')).toThrow();
    });

    test('should reject MBIs with special characters', () => {
      expect(() => medicareMBI.parse('1AC-0DE-0FG-00')).toThrow(); // with dashes
      expect(() => medicareMBI.parse('1AC 0DE 0FG 00')).toThrow(); // with spaces
      expect(() => medicareMBI.parse('1AC@DE0FG00')).toThrow(); // with special char
    });

    test('should reject MBIs with invalid character combinations', () => {
      expect(() => medicareMBI.parse('1AC0DE0FG0!')).toThrow();
      expect(() => medicareMBI.parse('1AC0DE0FG0#')).toThrow();
      expect(() => medicareMBI.parse('!AC0DE0FG00')).toThrow();
    });
  });

  describe('edge cases', () => {
    test('should reject null and undefined', () => {
      expect(() => medicareMBI.parse(null)).toThrow();
      expect(() => medicareMBI.parse(undefined)).toThrow();
    });

    test('should reject non-string values', () => {
      expect(() => medicareMBI.parse(12345678901)).toThrow();
      expect(() => medicareMBI.parse({})).toThrow();
      expect(() => medicareMBI.parse([])).toThrow();
    });

    test('should validate boundary cases for position 1', () => {
      expect(() => medicareMBI.parse('1AC0DE0FG00')).not.toThrow(); // min value
      expect(() => medicareMBI.parse('9AC0DE0FG00')).not.toThrow(); // max value
      expect(() => medicareMBI.parse('0AC0DE0FG00')).toThrow(); // below min
    });

    test('should validate boundary cases for numeric positions', () => {
      expect(() => medicareMBI.parse('1AC0DE0FG00')).not.toThrow(); // all zeros
      expect(() => medicareMBI.parse('9AC9DE9FG99')).not.toThrow(); // all nines
    });
  });

  describe('CMS format examples', () => {
    test('should accept the documented example format', () => {
      // Example from CMS: 1EG4-TE5-MK73 (without dashes)
      expect(() => medicareMBI.parse('1EG4TE5MK73')).not.toThrow();
    });

    test('should validate against CMS position rules', () => {
      // Position 1: C (1-9)
      // Position 2: A (letter)
      // Position 3: AN (letter or number)
      // Position 4: N (0-9)
      // Position 5: A (letter)
      // Position 6: AN (letter or number)
      // Position 7: N (0-9)
      // Position 8: A (letter)
      // Position 9: A (letter)
      // Position 10: N (0-9)
      // Position 11: N (0-9)

      expect(() => medicareMBI.parse('1AC0DE0FG00')).not.toThrow();
      expect(() => medicareMBI.parse('2XY9PQ8MN99')).not.toThrow();
      expect(() => medicareMBI.parse('5TU3VW1JK55')).not.toThrow();
    });
  });
});