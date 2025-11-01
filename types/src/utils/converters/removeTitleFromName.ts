import { PROVIDER_TITLES } from '../../entities/HealthcareProviders';

export const removeTitleFromName = (name: string) => {
  const trimmed = name.trim();
  const tokens = trimmed.split(/\s+/);
  const output = [tokens[0]];
  if (tokens.length > 1) {
    tokens.slice(1).forEach((token) => {
      const clean = token.replace(/^[.,;:()]+|[.,;:()]+$/g, '').toUpperCase();
      if (!PROVIDER_TITLES.has(clean)) {
        output.push(token);
      }
    });
  }
  const result = output.join(' ');
  return result.replace(/,\s*$/, "");
};
