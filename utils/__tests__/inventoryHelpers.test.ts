import { describe, expect, it } from '@jest/globals';
import {
  buildFormSubmissionData,
  extractFormFields,
  extractGcodeFileKey,
  extractGcodeMetadata,
  INVENTORY_CONSTANTS,
  splitIntoBatches
} from '../src/helpers/inventoryHelpers';

describe('extractGcodeMetadata', () => {
  it('should return printerType and slicerProfile when both attributes are present', () => {
    const attributes = [
      { key: INVENTORY_CONSTANTS.PRINTER_TYPE_KEY, value: 'BAMBU' },
      { key: INVENTORY_CONSTANTS.SLICER_PROFILE_KEY, value: 'FUNCTIONAL_CLINICAL' }
    ];
    expect(extractGcodeMetadata(attributes)).toEqual({
      printerType: 'BAMBU',
      slicerProfile: 'FUNCTIONAL_CLINICAL'
    });
  });

  it('should return only printerType when slicerProfile is missing', () => {
    const attributes = [{ key: INVENTORY_CONSTANTS.PRINTER_TYPE_KEY, value: 'BAMBU' }];
    expect(extractGcodeMetadata(attributes)).toEqual({ printerType: 'BAMBU' });
  });

  it('should return only slicerProfile when printerType is missing', () => {
    const attributes = [{ key: INVENTORY_CONSTANTS.SLICER_PROFILE_KEY, value: 'SHELL' }];
    expect(extractGcodeMetadata(attributes)).toEqual({ slicerProfile: 'SHELL' });
  });

  it('should return empty object when neither attribute is present', () => {
    const attributes = [{ key: 'someOtherKey', value: 'someValue' }];
    expect(extractGcodeMetadata(attributes)).toEqual({});
  });

  it('should return empty object for empty attributes array', () => {
    expect(extractGcodeMetadata([])).toEqual({});
  });

  it('should ignore unrelated attributes', () => {
    const attributes = [
      { key: 'unrelated', value: 'ignored' },
      { key: INVENTORY_CONSTANTS.PRINTER_TYPE_KEY, value: 'BAMBU' },
      { key: 'anotherKey', value: 'anotherValue' },
      { key: INVENTORY_CONSTANTS.SLICER_PROFILE_KEY, value: 'CORK' }
    ];
    expect(extractGcodeMetadata(attributes)).toEqual({
      printerType: 'BAMBU',
      slicerProfile: 'CORK'
    });
  });
});

describe('extractGcodeFileKey', () => {
  it('should return the file key value when present', () => {
    const attributes = [{ key: INVENTORY_CONSTANTS.GCODE_FILE_KEY, value: 'supplier/product/file.gcode.3mf' }];
    expect(extractGcodeFileKey(attributes)).toBe('supplier/product/file.gcode.3mf');
  });

  it('should return null when the attribute is not present', () => {
    const attributes = [{ key: 'someOtherKey', value: 'someValue' }];
    expect(extractGcodeFileKey(attributes)).toBeNull();
  });

  it('should return null for empty attributes array', () => {
    expect(extractGcodeFileKey([])).toBeNull();
  });
});

describe('splitIntoBatches', () => {
  it('should return [1] for 1 pair', () => {
    expect(splitIntoBatches(1)).toEqual([1]);
  });

  it('should return [3] for 3 pairs', () => {
    expect(splitIntoBatches(3)).toEqual([3]);
  });

  it('should return [3, 1] for 4 pairs', () => {
    expect(splitIntoBatches(4)).toEqual([3, 1]);
  });

  it('should return [3, 3, 3, 1] for 10 pairs', () => {
    expect(splitIntoBatches(10)).toEqual([3, 3, 3, 1]);
  });

  it('should return [3, 3, 3, 3] for 12 pairs', () => {
    expect(splitIntoBatches(12)).toEqual([3, 3, 3, 3]);
  });

  it('should return empty array for 0 pairs', () => {
    expect(splitIntoBatches(0)).toEqual([]);
  });

  it('should return empty array for negative pairs', () => {
    expect(splitIntoBatches(-5)).toEqual([]);
  });

  it('should respect custom maxPerBatch', () => {
    expect(splitIntoBatches(7, 2)).toEqual([2, 2, 2, 1]);
  });
});

describe('extractFormFields', () => {
  it('should parse valid JSON object from attribute', () => {
    const formFields = { orthoticType: 'Functional', orthoticTypeFunctional: 'Hike Sport' };
    const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: JSON.stringify(formFields) }];
    expect(extractFormFields(attributes)).toEqual(formFields);
  });

  it('should return empty object when attribute is missing', () => {
    const attributes = [{ key: 'someOtherKey', value: 'someValue' }];
    expect(extractFormFields(attributes)).toEqual({});
  });

  it('should return empty object for empty attributes array', () => {
    expect(extractFormFields([])).toEqual({});
  });

  it('should return empty object for invalid JSON', () => {
    const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: 'not valid json{' }];
    expect(extractFormFields(attributes)).toEqual({});
  });

  it('should return empty object for non-object JSON (array)', () => {
    const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: '["a","b"]' }];
    expect(extractFormFields(attributes)).toEqual({});
  });

  it('should return empty object for non-object JSON (string)', () => {
    const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: '"just a string"' }];
    expect(extractFormFields(attributes)).toEqual({});
  });

  it('should return empty object for JSON null', () => {
    const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: 'null' }];
    expect(extractFormFields(attributes)).toEqual({});
  });
});

describe('buildFormSubmissionData', () => {
  it('should merge form fields with orderQuantity', () => {
    const formFields = { orthoticType: 'Functional', orthoticTypeFunctional: 'Hike Sport' };
    expect(buildFormSubmissionData(formFields, 3)).toEqual({
      orthoticType: 'Functional',
      orthoticTypeFunctional: 'Hike Sport',
      orderQuantity: 3
    });
  });

  it('should work with empty form fields', () => {
    expect(buildFormSubmissionData({}, 1)).toEqual({ orderQuantity: 1 });
  });
});
