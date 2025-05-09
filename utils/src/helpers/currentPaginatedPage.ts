export const getCurrentPaginatedPage = (page: string): number => Math.max(parseInt(page, 10), 1);
