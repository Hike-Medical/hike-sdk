import type { FormField, FormFieldValue, FormRule, FormSchema, FormSection } from '@hike/types';

/**
 * Determines if a given form field should be displayed based on its rule and current form state.
 */
export const isFormFieldDisplayed = (field: FormField, state: Record<string, FormFieldValue>): boolean =>
  isFormRuleDisplayed(field, state);

/**
 * Determines if a given form section should be displayed based on its rule and current form state.
 */
export const isFormSectionDisplayed = (section: FormSection, state: Record<string, FormFieldValue>): boolean =>
  isFormRuleDisplayed(section, state);

const isFormRuleDisplayed = (formItem: { rule?: FormRule }, state: Record<string, FormFieldValue>): boolean => {
  if (!formItem.rule) {
    return true;
  }

  const { effect, condition } = formItem.rule;
  const conditionValue = condition.value;
  const selectedValue = state[condition.name];

  switch (effect) {
    case 'show':
      if (typeof conditionValue === 'boolean') {
        return conditionValue === !!selectedValue && selectedValue != null;
      } else if (typeof conditionValue === 'string') {
        return selectedValue != null && conditionValue === selectedValue;
      } else if (Array.isArray(conditionValue)) {
        if (selectedValue == null) {
          return false;
        }
        if (Array.isArray(selectedValue)) {
          const hasIntersection = (array1: string[], array2: string[]) =>
            array2.some((item) => new Set(array1).has(item));
          return selectedValue.length > 0 && hasIntersection(conditionValue.map(String), selectedValue.map(String));
        }
      }
      break;
    case 'hide':
      if (typeof conditionValue === 'boolean') {
        return !(conditionValue === !!selectedValue && selectedValue != null);
      } else if (typeof conditionValue === 'string') {
        return !(selectedValue != null && conditionValue === selectedValue);
      } else if (Array.isArray(conditionValue)) {
        if (selectedValue == null) {
          return true;
        }
        if (Array.isArray(selectedValue)) {
          const hasIntersection = (array1: string[], array2: string[]) =>
            array2.some((item) => new Set(array1).has(item));
          return !(selectedValue.length > 0 && hasIntersection(conditionValue.map(String), selectedValue.map(String)));
        }
      }
      break;
    default:
      break;
  }

  return true;
};

/**
 * Determines if a given form field is complete based on its requirements and visibility.
 */
export const isFieldComplete = (field: FormField, state: Record<string, FormFieldValue>): boolean =>
  !field.required || state[field.name] !== undefined || !isFormFieldDisplayed(field, state);

/**
 * Determines if all the required fields in the form are answered.
 */
export const isFormValid = (schema: FormSchema | null | undefined, state: Record<string, FormFieldValue>): boolean =>
  !!schema?.sections.flatMap((section) => section.fields).every((field) => isFieldComplete(field, state));

/**
 * The initial values for the form fields based on the template and submission.
 */
export const initialFormValues = (
  schema: FormSchema | null | undefined,
  submission: Record<string, FormFieldValue> | null | undefined
): Record<string, FormFieldValue> =>
  schema?.sections
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

/**
 * Calculates statistics for a given form schema based on the current state.
 */
export const schemaStats = (
  schema: FormSchema,
  state: Record<string, FormFieldValue>
): {
  sectionsCompleted: number;
  sectionsTotal: number;
  sectionNext: number | null;
} => {
  const validSections = schema.sections.filter((section) => isFormSectionDisplayed(section, state));

  const sectionsCompleted = validSections.filter((section) =>
    section.fields.filter((field) => isFormFieldDisplayed(field, state)).every((field) => isFieldComplete(field, state))
  ).length;

  const sectionNext = validSections.findIndex((section) =>
    section.fields.filter((field) => isFormFieldDisplayed(field, state)).some((field) => !isFieldComplete(field, state))
  );

  return {
    sectionsCompleted,
    sectionsTotal: validSections.length,
    sectionNext: sectionNext >= 0 ? sectionNext : null
  };
};
