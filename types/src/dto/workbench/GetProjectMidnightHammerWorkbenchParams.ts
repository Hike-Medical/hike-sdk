import { GetAggregatedParams } from './GetAggregatedParams';

export type ProjectMidnightHammerDataSource = 'needsValidation' | 'allManufacturing';

export interface GetProjectMidnightHammerWorkbenchParams extends GetAggregatedParams {
  printableOnly?: boolean;
  source?: ProjectMidnightHammerDataSource;
  /** Filter by whether assets have a taikaId (true = has taikaId, false = no taikaId, undefined = no filter) */
  hasTaikaId?: boolean;
}
