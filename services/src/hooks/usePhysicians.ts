import type { PagedParams, PagedResponse, Physician } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchPhysicians, searchPhysicians } from '../api/physician.service';
import { HikeError } from '../errors/HikeError';

interface UsePhysiciansOptions extends PagedParams {
  key?: string[];
  searchTerm?: string | null;
  enabled?: boolean;
}

export const usePhysicians = ({ key = [], searchTerm, enabled = true, ...params }: UsePhysiciansOptions) =>
  useQuery<PagedResponse<Physician[]>, HikeError<null>>({
    queryKey: ['physicians', ...key, ...(searchTerm ? [searchTerm] : []), params],
    queryFn: async () => (searchTerm ? await searchPhysicians(searchTerm, params) : await fetchPhysicians(params)),
    enabled
  });
