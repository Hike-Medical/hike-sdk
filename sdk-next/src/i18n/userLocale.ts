'use server';

import { Constants } from '@hike/sdk';
import { cookies } from 'next/headers';
import en from './messages/en';

/**
 * Get the user's locale from the cookie.
 */
export const getUserLocale = async (): Promise<{ locale: string; slug?: string; messages: object }> => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(Constants.i18n.LOCALE_COOKIE_NAME)?.value;
  const [locale, slug] = cookieValue?.split('.') ?? [];
  return { locale: locale || Constants.i18n.DEFAULT_LOCALE, slug, messages: en };
};

/**
 * Set the user's locale in the cookie.
 */
export const setUserLocale = async (locale: string, slug?: string) => {
  const cookieStore = await cookies();
  cookieStore.set(Constants.i18n.LOCALE_COOKIE_NAME, `${locale}${slug ? `.${slug}` : ''}`);
};
