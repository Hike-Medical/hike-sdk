export const COMPANY_THEMES = ['legacy', '2025-apr', '2025-dec', '2026-jan'] as const;
export type CompanyTheme = (typeof COMPANY_THEMES)[number];
