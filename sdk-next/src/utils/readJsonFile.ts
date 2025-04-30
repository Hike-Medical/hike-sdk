'use server';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Reads a JSON file and returns the parsed object.
 * @param paths - The paths to join to the file.
 * @returns The parsed object.
 */
export const readJsonFile = async <T>(...paths: string[]): Promise<Record<string, T>> => {
  const data = await readFile(join(...paths), 'utf-8');
  return JSON.parse(data) as Record<string, T>;
};
