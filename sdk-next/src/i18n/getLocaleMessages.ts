import merge from 'lodash/merge';
import { join } from 'path';
import { readJsonFile } from '../utils/readJsonFile';
import { getUserLocale } from './userLocale';

// Cache store for base and company messages
const fileCache = new Map<string, Record<string, string>>();

// Get message from cache or read from file
const getCachedFile = async (path: string, file: string): Promise<Record<string, string>> => {
  if (fileCache.has(file)) {
    return fileCache.get(file) ?? {};
  }

  const data = await readJsonFile<string>(path, file);
  fileCache.set(file, data);
  return data;
};

/**
 * Get the `next‑intl` based messages for the current company.
 */
export const getLocaleMessages = async (): Promise<{ locale: string; messages: Record<string, string> }> => {
  const { locale, slug } = await getUserLocale();
  const messagesPath = join(process.cwd(), 'i18n', 'messages');
  const messages = await getCachedFile(messagesPath, `${locale}.json`);

  if (slug) {
    try {
      const companyMessages = await getCachedFile(messagesPath, `${locale}.${slug}.json`);
      return { locale, messages: merge({}, messages, companyMessages) };
    } catch (error) {
      const isMissing = typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';

      // Ignore only if company-specific file does not exist but throw all other errors
      if (!isMissing) {
        throw error;
      }
    }
  }

  return { locale, messages };
};
