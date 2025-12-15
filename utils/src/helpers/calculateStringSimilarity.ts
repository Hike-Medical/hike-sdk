/**
 * Calculate string similarity using Levenshtein distance algorithm.
 * Uses dynamic programming for optimal performance.
 *
 * @param value1 - First string to compare
 * @param value2 - Second string to compare
 * @returns Similarity score between 0 (completely different) and 1 (identical)
 *
 * @example
 * ```typescript
 * calculateStringSimilarity('kitten', 'sitting'); // 0.571
 * calculateStringSimilarity('John', 'Jon');       // 0.75
 * calculateStringSimilarity('hello', 'hello');    // 1.0
 * calculateStringSimilarity('', 'hello');         // 0.0
 * ```
 *
 * @remarks
 * The Levenshtein distance is the minimum number of single-character edits
 * (insertions, deletions, or substitutions) required to change one string into another.
 * This function normalizes the distance to a similarity score between 0 and 1.
 *
 * Time complexity: O(m * n) where m and n are the lengths of the input strings
 * Space complexity: O(m * n) for the dynamic programming matrix
 */
export const calculateStringSimilarity = (value1: string, value2: string): number => {
  // Handle empty strings
  if (!value1 || !value2) {
    return 0;
  }

  // Identical strings
  if (value1 === value2) {
    return 1;
  }

  const len1 = value1.length;
  const len2 = value2.length;
  const maxLength = Math.max(len1, len2);

  // Create distance matrix using dynamic programming
  // Matrix[i][j] represents the edit distance between str2[0..i] and str1[0..j]
  const matrix = Array.from({ length: len2 + 1 }, (_, i) =>
    Array.from({ length: len1 + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  // Fill matrix with edit distances
  for (let i = 1; i <= len2; i += 1) {
    for (let j = 1; j <= len1; j += 1) {
      // Cost is 0 if characters match, 1 if they differ
      const cost = value2[i - 1] === value1[j - 1] ? 0 : 1;
      const row = matrix[i];
      const prevRow = matrix[i - 1];

      if (row && prevRow) {
        row[j] = Math.min(
          prevRow[j]! + 1, // deletion
          row[j - 1]! + 1, // insertion
          prevRow[j - 1]! + cost // substitution
        );
      }
    }
  }

  // Get final edit distance
  const lastRow = matrix[len2];
  const distance = lastRow?.[len1] ?? maxLength;

  // Convert distance to similarity score (0 to 1)
  return 1 - distance / maxLength;
};
