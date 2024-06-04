import type { DeviceType, PagedParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchDeviceTypes, searchDeviceTypes } from '../api/device-type.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseDeviceTypesOptions
  extends Omit<UseQueryOptions<PagedResponse<DeviceType[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  searchTerm?: string | null;
  params?: PagedParams;
  queryKey?: QueryKey;
}

export const useDeviceTypes = ({ searchTerm, params, queryKey = [], ...options }: UseDeviceTypesOptions) =>
  useQuery({
    queryKey: ['deviceTypes', searchTerm, params, queryKey],
    queryFn: async () => (searchTerm ? await searchDeviceTypes(searchTerm, params) : await fetchDeviceTypes(params)),
    ...options
  });
