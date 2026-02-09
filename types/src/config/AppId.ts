export const appIds = [
  '@hike/admin-web',
  '@hike/insoles-web',
  '@hike/consumer-web',
  '@hike/stepzero-web',
  '@hike/backend'
] as const;

export type AppId = (typeof appIds)[number];
