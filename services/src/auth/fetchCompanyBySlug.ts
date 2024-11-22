import { SafeCompany } from '@hike/types';
import { backendApi } from '../utils/backendApi';

/**
 * Fetches the company information by the slug.
 * Uses `fetch` since supported in all environments, i.e. Edge, Node, Browser, etc.
 */
export const fetchCompanyBySlug = async (slug: string): Promise<SafeCompany> => {
  // Must be previously set via `configureServices`
  const baseUrl = backendApi.defaults.baseURL;

  const response = await fetch(`${baseUrl}/auth/company/slug/${slug}`, {
    cache: 'no-store'
  });

  return await response.json();
};
