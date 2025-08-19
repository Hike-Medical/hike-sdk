import { ProductType } from '../../../prisma';

const ProductTypeEnum = {
  FOOT_SCAN: 'FOOT_SCAN',
  FOOT_RENDER: 'FOOT_RENDER',
  INSOLE_RENDER: 'INSOLE_RENDER',
  INSOLE_GCODE: 'INSOLE_GCODE',
  INSOLE: 'INSOLE',
  PREFABRICATED_DEVICE: 'PREFABRICATED_DEVICE',
  FABRICATED_DEVICE: 'FABRICATED_DEVICE',
  REWARD: 'REWARD'
} as const satisfies Record<ProductType, ProductType> & {
  [K in ProductType]: K;
};

export const ProductTypeList = Object.values(ProductTypeEnum);

