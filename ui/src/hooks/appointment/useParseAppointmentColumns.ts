import { parseAppointmentColumns } from '@hike/services';
import type { ParseAppointmentColumnsParams, ParseAppointmentColumnsResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseParseAppointmentColumnsOptions
  extends Omit<UseQueryOptions<ParseAppointmentColumnsResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: ParseAppointmentColumnsParams;
  queryKey?: QueryKey;
}

export const useParseAppointmentColumns = ({ params, queryKey = [], ...options }: UseParseAppointmentColumnsOptions) =>
  useQuery({
    queryKey: ['parseAppointmentColumns', params, queryKey],
    queryFn: async () => await parseAppointmentColumns(params),
    ...options
  });
