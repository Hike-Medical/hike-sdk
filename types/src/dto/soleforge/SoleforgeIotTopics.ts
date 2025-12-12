export const SoleforgIotTopics = {
  SOLEFORGEDEVICEBROKER: 'hike/soleforge/soleforge-device-broker/commands/startPrintJob'
} as const;

export type SoleforgIotTopics = (typeof SoleforgIotTopics)[keyof typeof SoleforgIotTopics];
