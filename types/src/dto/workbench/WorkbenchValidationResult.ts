export type WorkbenchValidationStatus = 'accept' | 'reject';

export interface WorkbenchValidationResult {
  workbenchId: string;
  validationResult?: WorkbenchValidationStatus;
}

export type WorkbenchValidationResultsMap = Record<string, WorkbenchValidationResult>;
