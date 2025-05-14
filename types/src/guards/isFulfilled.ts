/**
 * A type guard that filters promise to only fulfilled results.
 *
 * @example
 * const results = await Promise.allSettled([Promise.resolve(1), Promise.reject('error')]);
 * const fulfilledResults = results.filter(isFulfilled);
 */
export const isFulfilled = <T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> =>
  result.status === 'fulfilled';
