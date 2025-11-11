export const HEALTHCARE_CREDENTIAL_VALUES = [
  'APRN',
  'ARNP',
  'CNM',
  'CNP',
  'CRNA',
  'CRNP',
  'DC',
  'DDS',
  'DMD',
  'DNP',
  'DO',
  'DPM',
  'FACP',
  'FNP',
  'LPN',
  'LVN',
  'MD',
  'NP',
  'OD',
  'PA',
  'PAC',
  'PHARMD',
  'PHD',
  'PNP',
  'RN'
] as const satisfies readonly [string, ...string[]];

export const HEALTHCARE_CREDENTIAL = new Set<string>([...HEALTHCARE_CREDENTIAL_VALUES]);
