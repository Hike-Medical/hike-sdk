import type { FormField, FormFieldValue, FormTemplateExtended } from '@hike/types';

/**
 * Determines if a given form field should be displayed based on its rule and current form state.
 */
export const isFormFieldDisplayed = (field: FormField, state: Record<string, FormFieldValue>): boolean => {
  if (field.rule?.effect === 'show') {
    const conditionValue = field.rule.condition.value;
    const selectedValue = state[field.rule.condition.name];

    if (typeof conditionValue === 'boolean') {
      if (conditionValue !== !!selectedValue || selectedValue == null) {
        return false;
      }
    } else if (typeof conditionValue === 'string') {
      if (selectedValue === null || selectedValue === undefined) {
        return false;
      }

      if (conditionValue !== selectedValue) {
        return false;
      }
    } else if (Array.isArray(conditionValue)) {
      if (selectedValue === null || selectedValue === undefined) {
        return false;
      }

      if (Array.isArray(selectedValue)) {
        const hasIntersection = (array1: string[], array2: string[]) =>
          array2.some((item) => new Set(array1).has(item));

        if (!selectedValue.length || !hasIntersection(conditionValue.map(String), selectedValue.map(String))) {
          return false;
        }
      }
    }
  }

  return true;
};

/**
 * Determines if all the required fields in the form are answered.
 */
export const isFormValid = (
  template: FormTemplateExtended | null | undefined,
  state: Record<string, FormFieldValue>
): boolean =>
  !!template?.schema.sections
    .flatMap((section) => section.fields)
    .every((field) => !field.required || state[field.name] !== undefined || !isFormFieldDisplayed(field, state));

/**
 * The initial values for the form fields based on the template and submission.
 */
export const initialFormValues = (
  template: FormTemplateExtended | null | undefined,
  submission: Record<string, FormFieldValue> | null | undefined
): Record<string, FormFieldValue> =>
  template?.schema.sections
    .flatMap((section) => section.fields)
    .reduce((acc, field) => {
      const value = submission?.[field.name] ?? field.default;

      if (value !== undefined) {
        acc[field.name] = value;

        // Load label for field if applicable
        const labelKey = `${field.name}-label`;
        acc[labelKey] ??= submission?.[labelKey];
      }

      return acc;
    }, {}) ?? {};
