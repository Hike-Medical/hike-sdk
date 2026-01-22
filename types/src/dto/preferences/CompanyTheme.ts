export const COMPANY_THEMES = ['legacy', '2025-apr', '2025-dec'] as const;
export type CompanyTheme = (typeof COMPANY_THEMES)[number];
