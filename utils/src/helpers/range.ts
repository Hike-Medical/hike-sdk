/**
 * Generates a range of numbers from `start` to `end` (inclusive).
 *
 * @example
 * // Generate a range from 1 to 5
 * [...range(30, 275)].forEach((value) => {
 *   console.log(value);
 * });
 * // Output: 1, 2, 3, 4, 5
 */
export function* range(start: number, end: number) {
  for (let value = start; value <= end; value += 1) {
    yield value;
  }
}
