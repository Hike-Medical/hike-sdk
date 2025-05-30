import { flattenedFormSubmissions } from '@hike/services';
import { FormFieldValue, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFlattenedFormSubmissionsOptions
  extends Omit<UseQueryOptions<Record<string, FormFieldValue>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useFlattenedFormSubmissions = ({
  workbenchId,
  queryKey = [],
  ...options
}: UseFlattenedFormSubmissionsOptions) =>
  useQuery({
    queryKey: ['flattenedFormSubmissions', workbenchId, queryKey],
    queryFn: async () => await flattenedFormSubmissions(workbenchId),
    ...options
  });
