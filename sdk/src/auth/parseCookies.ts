export const parseCookies = (cookieHeader: string): Record<string, string> => {
  const cookies: Record<string, string> = {};

  cookieHeader.split(';').forEach((cookie) => {
    const [name, value] = cookie.split('=').map((c) => c.trim());
    if (!name || !value) return;
    cookies[name] = value;
  });

  return cookies;
};
