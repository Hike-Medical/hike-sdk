import type { FormField, FormFieldValue, FormRule, FormSchemaTyped, FormSection } from '@hike/types';

/**
 * Determines if a given form field should be displayed based on its rule and current form state.
 */
export const isFormFieldDisplayed = (
  slug: string,
  field: FormField,
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): boolean => isFormRuleDisplayed(slug, state, field.rule, activeFoot);

/**
 * Determines if a given form section should be displayed based on its rule and current form state.
 */
export const isFormSectionDisplayed = (slug: string, section: FormSection, state: Record<string, FormFieldValue>): boolean =>
  section.rule?.every((rule) => isFormRuleDisplayed(slug, state, rule)) ?? true;

export const isFormRuleDisplayed = (
  slug: string,
  state: Record<string, FormFieldValue>,
  rule?: FormRule,
  activeFoot?: string,
): boolean => {
  if (!rule) {
    return true;
  }


  const { effect, condition } = rule;

  let conditionValue = condition.value;
  let selectedValue: FormFieldValue;
  if(condition.name === 'slug') {
    selectedValue = [slug]
  }
  else{
    if(!state) {
      return true
    }
    selectedValue = state[condition.name + (activeFoot ?? '')];
  }

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
        } else {
          return conditionValue.reduce((acc, item) => acc || item === selectedValue, false);
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
        } else {
          return !conditionValue.reduce((acc, item) => acc || item === selectedValue, false);
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
  slug: string,
  field: FormField,
  state: Record<string, FormFieldValue>,
  isOnlyField?: boolean,
  activeFoot?: string
): boolean => {
  return (
    (!field.required && !isOnlyField) ||
    (state &&
      Object.keys(state).some(
        (key) =>
          key.startsWith(field.name) && state[key] != null && (state[key]?.toLocaleString() !== '' || !field.required)
      )) ||
    !isFormFieldDisplayed(slug, field, state, activeFoot)
  );
};

/**
 * Determines if all the required fields in the form are answered.
 */
export const isFormValid = (
  slug: string, 
  schema: FormSchemaTyped['data'] | null | undefined,
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): boolean =>
  !!schema?.sections
    .filter((section) => isFormSectionDisplayed(slug, section, state))
    .flatMap((section) => section.fields)
    .every((field, _, fields) => isFieldComplete(slug, field, state, fields.length === 1, activeFoot));

/**
 * The initial values for the form fields based on the schema and submission.
 */
export const initialFormValues = (
  schema: FormSchemaTyped['data'] | null | undefined,
  submission: Record<string, FormFieldValue> | null | undefined
): Record<string, FormFieldValue> =>
  schema?.sections
    .flatMap((section) => section.fields)
    .reduce(
      (acc, field) => {
        const value = submission?.[field.name] ?? field.default;

        if (value !== undefined) {
          acc[field.name] = value;

          // Load label for field if applicable
          const labelKey = `${field.name}-label`;
          acc[labelKey] ??= submission?.[labelKey];

          // Load description for field if applicable
          const descriptionKey = `${field.name}-description`;
          acc[descriptionKey] ??= submission?.[descriptionKey];
        }

        return acc;
      },
      { ...submission } // Capture submissions not in schema
    ) ?? {};

export const completedSections = (slug : string, validSections: FormSection[], state: Record<string, FormFieldValue>): FormSection[] =>
  validSections.filter((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(slug, field, state))
      .every((field, _, fields) => isFieldComplete(slug, field, state, fields.length === 1))
  );

export const schemaStats = (
  slug: string,
  schema: FormSchemaTyped['data'],
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): {
  sectionsCompleted: number;
  sectionsTotal: number;
  sectionNext: FormSection | null;
} => {

  const validSections = schema.sections.filter((section) => isFormSectionDisplayed(slug, section, state));

  const sectionsCompleted = validSections.filter((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(slug, field, state), activeFoot)
      .every((field, _, fields) => isFieldComplete(slug, field, state, fields.length === 1, activeFoot))
  ).length;

  const sectionNext = validSections.find((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(slug, field, state), activeFoot)
      .some((field, _, fields) => !isFieldComplete(slug, field, state, fields.length === 1, activeFoot))
  );

  return {
    sectionsCompleted,
    sectionsTotal: validSections.length,
    sectionNext: sectionNext ?? validSections[0] ?? null
  };
};
