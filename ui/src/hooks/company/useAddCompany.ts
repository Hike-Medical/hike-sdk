import { addCompany } from '@hike/services';
import { AddCompanyParams, CompanyExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAddCompany = (options?: UseMutationOptions<CompanyExtended, HikeError<null>, AddCompanyParams>) =>
  useMutation({
    mutationKey: ['addCompany'],
    mutationFn: async (params) => await addCompany(params),
    ...options
  });
