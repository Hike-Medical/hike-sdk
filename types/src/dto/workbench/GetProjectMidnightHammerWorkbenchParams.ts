import { GetAggregatedParams } from './GetAggregatedParams';

export type ProjectMidnightHammerDataSource = 'needsValidation' | 'allManufacturing';

export interface GetProjectMidnightHammerWorkbenchParams extends GetAggregatedParams {
  printableOnly?: boolean;
  source?: ProjectMidnightHammerDataSource;
}

