import { ProductType } from '../../../prisma';
import { PagedParams } from '../PagedParams';

export interface GetCompletedStationParams extends PagedParams {
  productType?: ProductType[];
  searchQuery?: string;
}
