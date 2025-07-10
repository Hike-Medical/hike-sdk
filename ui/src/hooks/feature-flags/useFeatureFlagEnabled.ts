import { getFeatureFlagEnabled } from '@hike/services';
import { useQuery } from '@tanstack/react-query';

export const useFeatureFlagEnabled = (key: string): boolean | undefined => {
  const { data } = useQuery({
    queryKey: ['featureFlagEnabled', key],
    queryFn: async () => await getFeatureFlagEnabled(key),
    enabled: !!key
  });

  return data?.isEnabled;
};
