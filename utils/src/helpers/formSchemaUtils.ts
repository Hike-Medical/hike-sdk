import type { FormField, FormFieldValue, FormRule, FormSchema, FormSection } from '@hike/types';

/**
 * Determines if a given form field should be displayed based on its rule and current form state.
 */
export const isFormFieldDisplayed = (
  field: FormField,
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): boolean => isFormRuleDisplayed(field, state, activeFoot);

/**
 * Determines if a given form section should be displayed based on its rule and current form state.
 */
export const isFormSectionDisplayed = (section: FormSection, state: Record<string, FormFieldValue>): boolean =>
  isFormRuleDisplayed(section, state);

export const isFormRuleDisplayed = (
  formItem: { rule?: FormRule },
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): boolean => {
  if (!formItem.rule || !state) {
    return true;
  }

  const { effect, condition } = formItem.rule;

  const conditionValue = condition.value;

  const selectedValue = state[condition.name + (activeFoot ?? '')];

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
export const isFieldComplete = (
  field: FormField,
  state: Record<string, FormFieldValue>,
  isOnlyField: boolean,
  activeFoot?: string
): boolean => {
  return (
    (!field.required && !isOnlyField) ||
    (state &&
      Object.keys(state).some(
        (key) =>
          key.startsWith(field.name) && state[key] !== null && (state[key]?.toLocaleString() !== '' || !field.required)
      )) ||
    !isFormFieldDisplayed(field, state, activeFoot)
  );
};

/**
 * Determines if all the required fields in the form are answered.
 */
export const isFormValid = (
  schema: FormSchema | null | undefined,
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): boolean =>
  !!schema?.sections
    .filter((section) => isFormSectionDisplayed(section, state))
    .flatMap((section) => section.fields)
    .every((field, _, fields) => isFieldComplete(field, state, fields.length === 1, activeFoot));

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

export const completedSections = (validSections: FormSection[], state: Record<string, FormFieldValue>): FormSection[] =>
  validSections.filter((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(field, state))
      .every((field, _, fields) => isFieldComplete(field, state, fields.length === 1))
  );

export const schemaStats = (
  schema: FormSchema,
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): {
  sectionsCompleted: number;
  sectionsTotal: number;
  sectionNext: FormSection | null;
} => {
  const validSections = schema.sections.filter((section) => isFormSectionDisplayed(section, state));
  const sectionsCompleted = validSections.filter((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(field, state), activeFoot)
      .every((field, _, fields) => isFieldComplete(field, state, fields.length === 1, activeFoot))
  ).length;

  const sectionNext = validSections.find((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(field, state), activeFoot)
      .some((field, _, fields) => !isFieldComplete(field, state, fields.length === 1, activeFoot))
  );

  return {
    sectionsCompleted,
    sectionsTotal: validSections.length,
    sectionNext: sectionNext ?? validSections[0] ?? null
  };
};
