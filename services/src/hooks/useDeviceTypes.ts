import type { DeviceType, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
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
    queryFn: async () => {
      try {
        return searchTerm ? await searchDeviceTypes(searchTerm, params) : await fetchDeviceTypes(params);
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving device types', status, null);
      }
    },
    enabled
  });
