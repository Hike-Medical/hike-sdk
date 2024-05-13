import type { FormTemplateExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findFormTemplatesByIds } from '../api/form.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseFormTemplatesOptions {
  key?: string[];
  templateIds: string[];
  enabled?: boolean;
}

export const useFormTemplates = ({ key = [], templateIds, enabled = true }: UseFormTemplatesOptions) =>
  useQuery<FormTemplateExtended[], ResponseError<null>>({
    queryKey: ['formTemplates', ...key, ...templateIds],
    queryFn: async () => await findFormTemplatesByIds(templateIds),
    enabled
  });
