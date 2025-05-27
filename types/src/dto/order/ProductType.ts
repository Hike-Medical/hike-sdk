import { ProductType } from '../../../prisma';

export const ProductTypeList = [
  'FOOT_SCAN',
  'FOOT_RENDER',
  'INSOLE_RENDER',
  'INSOLE_GCODE',
  'INSOLE',
  'PREFABRICATED_DEVICE',
  'FABRICATED_DEVICE',
  'REWARD'
] satisfies ProductType[];
