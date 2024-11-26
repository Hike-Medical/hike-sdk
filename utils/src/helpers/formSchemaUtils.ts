import type {
  FormField,
  FormFieldValue,
  FormRule,
  FormSchemaTyped,
  FormSection,
  InvalidFormSection
} from '@hike/types';
import { asStringArray } from '../guards/isString';
import { isAddressFieldValid } from './formAddressUtils';

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
export const isFieldValid = (
  field: FormField,
  state: Record<string, FormFieldValue>,
  isOnlyField?: boolean,
  activeFoot?: string
): boolean => {
  return (
    (!field.required && !isOnlyField) ||
    (field.type === 'address'
      ? isAddressFieldValid(field.name, state)
      : Object.keys(state).some(
          (key) =>
            key.startsWith(field.name) && state[key] != null && (state[key]?.toString() !== '' || !field.required)
        )) ||
    !isFormFieldDisplayed(field, state, activeFoot)
  );
};

/**
 * Determines if all the required fields in the form are answered.
 */
export const isFormValid = (
  sections: FormSection[],
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): boolean =>
  sections
    .filter((section) => isFormSectionDisplayed(section, state))
    .flatMap((section) => section.fields)
    .every((field, _, fields) => isFieldValid(field, state, fields.length === 1, activeFoot));

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

export const completedSections = (validSections: FormSection[], state: Record<string, FormFieldValue>): FormSection[] =>
  validSections.filter((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(field, state))
      .every((field, _, fields) => isFieldValid(field, state, fields.length === 1))
  );

export const getInvalidSections = (sections: FormSection[], state: Record<string, FormFieldValue>): FormSection[] =>
  sections
    .filter((section) => isFormSectionDisplayed(section, state))
    .filter((section) =>
      section.fields
        .filter((field) => isFormFieldDisplayed(field, state) && field.required)
        .some((field, _, fields) => !isFieldValid(field, state, fields.length === 1))
    );

export const getVisibleSections = ({
  sections,
  state,
  slug
}: {
  sections: FormSection[] | null | undefined;
  state: Record<string, FormFieldValue>;
  slug?: string;
}): FormSection[] =>
  sections?.filter(
    (section) =>
      isFormSectionDisplayed(section, state) && !asStringArray(section.meta?.excludedSlugs)?.includes(slug ?? '')
  ) ?? [];

export const getSectionId = (section: FormSection) => section.id ?? encodeURIComponent(section.title);

export const getSectionIndex = (sections: FormSection[], sectionId: string) =>
  Math.max(
    sections.findIndex((section) => getSectionId(section) === sectionId),
    parseInt(sectionId, 10) || 0
  );

export const schemaStats = (
  sections: FormSection[],
  state: Record<string, FormFieldValue>,
  activeFoot?: string
): {
  sectionsCompleted: number;
  sectionsTotal: number;
  sectionNext: FormSection | null;
} => {
  const validSections = sections.filter((section) => isFormSectionDisplayed(section, state));
  const sectionsCompleted = validSections.filter((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(field, state), activeFoot)
      .every((field, _, fields) => isFieldValid(field, state, fields.length === 1, activeFoot))
  ).length;

  const sectionNext = validSections.find((section) =>
    section.fields
      .filter((field) => isFormFieldDisplayed(field, state), activeFoot)
      .some((field, _, fields) => !isFieldValid(field, state, fields.length === 1, activeFoot))
  );

  return {
    sectionsCompleted,
    sectionsTotal: validSections.length,
    sectionNext: sectionNext ?? validSections[0] ?? null
  };
};

export const formValidator = (sections: FormSection[], state: Record<string, FormFieldValue>): InvalidFormSection[] =>
  getInvalidSections(sections, state).map((section) => ({
    index: sections.indexOf(section),
    title: section.title,
    fields: section.fields
      .filter((field) => !isFieldValid(field, state, section.fields.length === 1))
      .map((field) => {
        return {
          name: field.name,
          label: field.label
        };
      })
  }));
