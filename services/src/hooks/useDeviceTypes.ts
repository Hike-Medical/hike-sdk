import type { DeviceType, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchDeviceTypes, searchDeviceTypes } from '../api/device-type.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseDeviceTypesOptions extends PagedParams {
  key?: string[];
  searchTerm?: string | null;
  enabled?: boolean;
}

export const useDeviceTypes = ({ key = [], searchTerm, enabled = true, ...params }: UseDeviceTypesOptions) =>
  useQuery<PagedResponse<DeviceType[]>, ResponseError<null>>({
    queryKey: ['deviceTypes', ...key, ...(searchTerm ? [searchTerm] : []), params],
    queryFn: async () => (searchTerm ? await searchDeviceTypes(searchTerm, params) : await fetchDeviceTypes(params)),
    enabled
  });
