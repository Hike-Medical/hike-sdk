import { cookies } from 'next/headers';
import { i18nConstants } from './constants';

export const getUserLocale = async (): Promise<{ locale: string; slug?: string }> => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(i18nConstants.LOCALE_COOKIE_NAME)?.value;
  const [locale, slug] = cookieValue?.split('.') ?? [];
  return { locale: locale || i18nConstants.DEFAULT_LOCALE, slug };
};

export const setUserLocale = async (locale: string, slug?: string) => {
  const cookieStore = await cookies();
  cookieStore.set(i18nConstants.LOCALE_COOKIE_NAME, `${locale}${slug ? `.${slug}` : ''}`);
};
