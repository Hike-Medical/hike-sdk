import { RenderType } from '@hike/types';

export const RenderTypeDescriptions: Record<number, string> = {
  1: 'Left Only',
  3: 'Left Mirror',
  2: 'Right Only',
  4: 'Right Mirror',
  0: 'Both'
};

export const getRenderTypeDescription = (value: RenderType): string | undefined => {
  return RenderTypeDescriptions[value];
};
