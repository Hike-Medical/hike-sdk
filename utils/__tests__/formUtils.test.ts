import type { FormField, FormSchemaTyped } from '@hike/types';
import { describe, expect } from '@jest/globals';
import {
  initialFormValues,
  isFieldComplete,
  isFormFieldDisplayed,
  isFormValid,
  schemaStats
} from '../src/helpers/formSchemaUtils';

describe('Form Schema Utils', () => {
  describe('isFormFieldDisplayed', () => {
    it('should display the field when the condition is met (show, boolean)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'boolean',
        rule: { effect: 'show', condition: { name: 'testCondition', value: true } }
      };
      const state = { testCondition: true };
      expect(isFormFieldDisplayed(field, state)).toBe(true);
    });

    it('should not display the field when the condition is not met (show, boolean)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'boolean',
        rule: { effect: 'show', condition: { name: 'testCondition', value: true } }
      };
      const state = { testCondition: false };
      expect(isFormFieldDisplayed(field, state)).toBe(false);
    });

    it('should display the field when the condition is met (show, string)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        rule: { effect: 'show', condition: { name: 'testCondition', value: 'show' } }
      };
      const state = { testCondition: 'show' };
      expect(isFormFieldDisplayed(field, state)).toBe(true);
    });

    it('should not display the field when the condition is not met (show, string)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        rule: { effect: 'show', condition: { name: 'testCondition', value: 'show' } }
      };
      const state = { testCondition: 'hide' };
      expect(isFormFieldDisplayed(field, state)).toBe(false);
    });

    it('should display the field when the condition is met (show, array)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'multiselect',
        options: [
          { label: 'test1', value: '1' },
          { label: 'test2', value: '2' }
        ],
        rule: { effect: 'show', condition: { name: 'testCondition', value: ['value1', 'value2'] } }
      };
      const state = { testCondition: ['value2'] };
      expect(isFormFieldDisplayed(field, state)).toBe(true);
    });

    it('should not display the field when the condition is not met (show, array)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'multiselect',
        options: [
          { label: 'test1', value: '1' },
          { label: 'test2', value: '2' }
        ],
        rule: { effect: 'show', condition: { name: 'testCondition', value: ['value1', 'value2'] } }
      };
      const state = { testCondition: ['value3'] };
      expect(isFormFieldDisplayed(field, state)).toBe(false);
    });

    it('should hide the field when the condition is met (hide, boolean)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'boolean',
        rule: { effect: 'hide', condition: { name: 'testCondition', value: true } }
      };
      const state = { testCondition: true };
      expect(isFormFieldDisplayed(field, state)).toBe(false);
    });

    it('should not hide the field when the condition is not met (hide, boolean)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'boolean',
        rule: { effect: 'hide', condition: { name: 'testCondition', value: true } }
      };
      const state = { testCondition: false };
      expect(isFormFieldDisplayed(field, state)).toBe(true);
    });

    it('should hide the field when the condition is met (hide, string)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        rule: { effect: 'hide', condition: { name: 'testCondition', value: 'hide' } }
      };
      const state = { testCondition: 'hide' };
      expect(isFormFieldDisplayed(field, state)).toBe(false);
    });

    it('should not hide the field when the condition is not met (hide, string)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'text',
        rule: { effect: 'hide', condition: { name: 'testCondition', value: 'hide' } }
      };
      const state = { testCondition: 'show' };
      expect(isFormFieldDisplayed(field, state)).toBe(true);
    });

    it('should hide the field when the condition is met (hide, array)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'multiselect',
        options: [
          { label: 'test1', value: '1' },
          { label: 'test2', value: '2' }
        ],
        rule: { effect: 'hide', condition: { name: 'testCondition', value: ['value1', 'value2'] } }
      };
      const state = { testCondition: ['value2'] };
      expect(isFormFieldDisplayed(field, state)).toBe(false);
    });

    it('should not hide the field when the condition is not met (hide, array)', () => {
      const field: FormField = {
        name: 'testField',
        label: 'Test Field',
        type: 'multiselect',
        options: [
          { label: 'test1', value: '1' },
          { label: 'test2', value: '2' }
        ],
        rule: { effect: 'hide', condition: { name: 'testCondition', value: ['value1', 'value2'] } }
      };
      const state = { testCondition: ['value3'] };
      expect(isFormFieldDisplayed(field, state)).toBe(true);
    });
  });

  describe('isFormValid', () => {
    it('should be valid when all required fields are answered', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [
              { name: 'field1', label: 'Field 1', type: 'text', required: true },
              { name: 'field2', label: 'Field 2', type: 'number', required: true }
            ]
          }
        ]
      };
      const state = { field1: 'value1', field2: 123 };
      expect(isFormValid(schema, state)).toBe(true);
    });

    it('should not be valid when required fields are not answered', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [
              { name: 'field1', label: 'Field 1', type: 'text', required: true },
              { name: 'field2', label: 'Field 2', type: 'number', required: true }
            ]
          }
        ]
      };
      const state = { field1: 'value1' };
      expect(isFormValid(schema, state)).toBe(false);
    });

    it('should be valid when required fields are hidden', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [
              { name: 'field1', label: 'Field 1', type: 'text', required: true },
              {
                name: 'field2',
                label: 'Field 2',
                type: 'number',
                required: true,
                rule: { effect: 'hide', condition: { name: 'field1', value: 'value1' } }
              }
            ]
          }
        ]
      };
      const state = { field1: 'value1' };
      expect(isFormValid(schema, state)).toBe(true);
    });
  });

  describe('initialFormValues', () => {
    it('should set initial values from schema defaults', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [
              { name: 'field1', label: 'Field 1', type: 'text', default: 'default1' },
              { name: 'field2', label: 'Field 2', type: 'number', default: 123 }
            ]
          }
        ]
      };
      const submission = {};
      expect(initialFormValues(schema, submission)).toEqual({ field1: 'default1', field2: 123 });
    });

    it('should set initial values from submission', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [
              { name: 'field1', label: 'Field 1', type: 'text', default: 'default1' },
              { name: 'field2', label: 'Field 2', type: 'number', default: 123 }
            ]
          }
        ]
      };
      const submission = { field1: 'submitted1', field2: 456 };
      expect(initialFormValues(schema, submission)).toEqual({ field1: 'submitted1', field2: 456 });
    });

    it('should set labels from submission', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [
              { name: 'field1', label: 'Field 1', type: 'text', default: 'default1' },
              { name: 'field2', label: 'Field 2', type: 'number', default: 123 }
            ]
          }
        ]
      };
      const submission = { field1: 'submitted1', 'field1-label': 'Label 1', field2: 456 };

      expect(initialFormValues(schema, submission)).toEqual({
        field1: 'submitted1',
        'field1-label': 'Label 1',
        field2: 456
      });
    });

    it('should handle empty schema and submission', () => {
      expect(initialFormValues(null, null)).toEqual({});
    });
  });

  describe('isFieldComplete', () => {
    it('should return true for non-required fields', () => {
      const field: FormField = { name: 'field1', label: 'Field 1', type: 'text' };
      const state = {};
      expect(isFieldComplete(field, state)).toBe(true);
    });

    it('should return true for required fields with value', () => {
      const field: FormField = { name: 'field1', label: 'Field 1', type: 'text', required: true };
      const state = { field1: 'value' };
      expect(isFieldComplete(field, state)).toBe(true);
    });

    it('should return false for required fields without value', () => {
      const field: FormField = { name: 'field1', label: 'Field 1', type: 'text', required: true };
      const state = {};
      expect(isFieldComplete(field, state)).toBe(false);
    });

    it('should return true for hidden required fields', () => {
      // Define a field with a rule to hide it
      const field: FormField = {
        name: 'field1',
        label: 'Field 1',
        type: 'text',
        required: true,
        rule: {
          effect: 'hide',
          condition: {
            name: 'testCondition',
            value: 'hide'
          }
        }
      };

      // Define a state where the condition is met
      const state = { testCondition: 'hide' };

      // Ensure the field is actually hidden based on the state
      const isDisplayed = isFormFieldDisplayed(field, state);
      expect(isDisplayed).toBe(false);

      // Ensure isFieldComplete returns true for the hidden required field
      const isComplete = isFieldComplete(field, state);
      expect(isComplete).toBe(true);
    });
  });

  describe('schemaStats', () => {
    it('should calculate schema stats correctly for complete sections', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [{ name: 'field1', label: 'Field 1', type: 'text', required: true }]
          },
          {
            title: 'Section 2',
            fields: [{ name: 'field2', label: 'Field 2', type: 'text', required: true }]
          }
        ]
      };
      const state = { field1: 'value1', field2: 'value2' };
      const result = schemaStats(schema, state);

      expect(result).toEqual({
        sectionsCompleted: 2,
        sectionsTotal: 2,
        sectionNext: schema.sections[0]
      });
    });

    it('should calculate schema stats correctly for incomplete sections', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [{ name: 'field1', label: 'Field 1', type: 'text', required: true }]
          },
          {
            title: 'Section 2',
            fields: [{ name: 'field2', label: 'Field 2', type: 'text', required: true }]
          }
        ]
      };
      const state = { field1: 'value1' };
      const result = schemaStats(schema, state);

      expect(result).toEqual({
        sectionsCompleted: 1,
        sectionsTotal: 2,
        sectionNext: schema.sections[1]
      });
    });

    it('should calculate schema stats correctly for sections with rules', () => {
      const schema: FormSchemaTyped['data'] = {
        sections: [
          {
            title: 'Section 1',
            fields: [
              { name: 'field1', label: 'Field 1', type: 'text', required: true },
              {
                name: 'field2',
                label: 'Field 2',
                type: 'text',
                required: true,
                rule: { effect: 'hide', condition: { name: 'field1', value: 'value1' } }
              }
            ]
          },
          {
            title: 'Section 2',
            fields: [{ name: 'field3', label: 'Field 3', type: 'text', required: true }]
          }
        ]
      };
      const state = { field1: 'value1', field3: 'value3' };

      // Ensure the field is actually hidden based on the state
      const field1 = schema.sections[0]?.fields[1];
      expect(field1 ? isFormFieldDisplayed(field1, state) : false).toBe(false);

      // Calculate schema stats
      const result = schemaStats(schema, state);
      expect(result).toEqual({
        sectionsCompleted: 2,
        sectionsTotal: 2,
        sectionNext: schema.sections[0]
      });
    });
  });
});
