import type { PagedParams, PagedResponse, Physician } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { fetchPhysicians, searchPhysicians } from '../api/physician.service';
import { ResponseError } from '../errors/ResponseError';

export interface UsePhysiciansOptions extends PagedParams {
  key?: string[];
  searchTerm?: string | null;
  enabled?: boolean;
}

export const usePhysicians = ({ key = [], searchTerm, enabled = true, ...params }: UsePhysiciansOptions) =>
  useQuery<PagedResponse<Physician[]>, ResponseError<null>>({
    queryKey: ['physicians', ...key, ...(searchTerm ? [searchTerm] : []), params],
    queryFn: async () => {
      try {
        return searchTerm ? await searchPhysicians(searchTerm, params) : await fetchPhysicians(params);
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving physicians', status, null);
      }
    },
    enabled
  });
