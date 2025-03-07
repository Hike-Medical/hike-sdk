/**
 * Pauses execution for a specified number of milliseconds.
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
