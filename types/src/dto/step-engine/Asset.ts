import { StepEngineAssetType, StepEngineAssetStatus } from '../../../prisma';

const StepEngineAssetTypeEnum = {
  PRESCRIPTION: 'PRESCRIPTION',
  PROVIDER_FAX: 'PROVIDER_FAX'
} as const satisfies Record<StepEngineAssetType, StepEngineAssetType> & {
  [K in StepEngineAssetType]: K;
};

export const StepEngineAssetTypeList = Object.values(StepEngineAssetTypeEnum);

const StepEngineAssetStatusEnum = {
  NEW: 'NEW',
  PROCESSED_OK: 'PROCESSED_OK',
  PROCESSED_FAILED: 'PROCESSED_FAILED'
} as const satisfies Record<StepEngineAssetStatus, StepEngineAssetStatus> & {
  [K in StepEngineAssetStatus]: K;
};

export const StepEngineAssetStatusList = Object.values(StepEngineAssetStatusEnum);
