import { Printer } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getPrinters } from '../../api/printer.service';
import { ResponseError } from '../../errors/ResponseError';

export interface useGetPrintersOptions
  extends Omit<UseQueryOptions<Printer[], ResponseError<null>>, 'queryFn' | 'queryKey'> {
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useGetPrinters = ({ queryKey = [], ...options }: useGetPrintersOptions) =>
  useQuery<Printer[], ResponseError<null>>({
    queryKey: ['getPrinters', queryKey],
    queryFn: async () => await getPrinters(),
    ...options
  });
