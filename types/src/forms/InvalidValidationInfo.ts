export interface InvalidFieldInfo {
  fieldName: string;
  fieldLabel: string;
  sectionIndex: number;
  sectionTitle: string;
}

export interface FormValidationResult {
  isValid: boolean;
  invalidFieldsData: InvalidFieldInfo[];
  invalidSectionIndices?: number[];
}
