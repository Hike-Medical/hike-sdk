const PROVIDER_TITLES = new Set([
  'MD',
  'DO',
  'RN',
  'APRN',
  'DPM',
  'PA',
  'PAC',
  'NP',
  'CNP',
  'FNP',
  'PNP',
  'CRNP',
  'CRNA',
  'CNM',
  'LPN',
  'LVN',
  'DNP',
  'DDS',
  'DMD',
  'OD',
  'DC',
  'PHARMD',
  'PHD',
  'FACP'
]);

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
