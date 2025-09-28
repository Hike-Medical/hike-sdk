export const RenderType = {
  LEFT_ONLY: 1,
  LEFT_MIRROR: 3,
  RIGHT_ONLY: 2,
  RIGHT_MIRROR: 4,
  BOTH: 0
} as const;

export type RenderType = (typeof RenderType)[keyof typeof RenderType];
