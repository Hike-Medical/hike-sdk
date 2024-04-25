import type { PagedResponse, Patient, SearchPatientsParams } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { fetchPatients, searchPatients } from '../api/patient.service';
import { ResponseError } from '../errors/ResponseError';

export interface UsePatientsOptions extends SearchPatientsParams {
  key?: string[];
  enabled?: boolean;
}

export const usePatients = ({ key = [], enabled = true, ...params }: UsePatientsOptions = {}) =>
  useQuery<PagedResponse<Patient[]>, ResponseError<null>>({
    queryKey: ['patients', ...key, params],
    queryFn: async () => {
      try {
        const hasParams = Object.values(params).some((value) => value !== undefined);
        return hasParams ? await searchPatients(params) : await fetchPatients();
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving patients', status, null);
      }
    },
    enabled
  });
