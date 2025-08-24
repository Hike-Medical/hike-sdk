export const COMPANY_THEMES = ['legacy', '2025-apr'] as const;
export type CompanyTheme = (typeof COMPANY_THEMES)[number];
