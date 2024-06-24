export const getCurrentPaginatedPage = (page: string): number => {
  return Math.max(parseInt(page, 10), 1);
};
