import {
  buildFormSubmissionData,
  extractFormFields,
  extractGcodeFileKey,
  extractGcodeMetadata,
  INVENTORY_CONSTANTS,
  splitIntoBatches
} from './inventoryHelpers';

describe('inventoryHelpers', () => {
  describe('splitIntoBatches', () => {
    it('should return empty array for zero pairs', () => {
      expect(splitIntoBatches(0)).toEqual([]);
    });

    it('should return empty array for negative pairs', () => {
      expect(splitIntoBatches(-5)).toEqual([]);
    });

    it('should return single batch when pairs <= max', () => {
      expect(splitIntoBatches(1)).toEqual([1]);
      expect(splitIntoBatches(2)).toEqual([2]);
      expect(splitIntoBatches(3)).toEqual([3]);
    });

    it('should split evenly when pairs are a multiple of max', () => {
      expect(splitIntoBatches(6)).toEqual([3, 3]);
      expect(splitIntoBatches(9)).toEqual([3, 3, 3]);
      expect(splitIntoBatches(12)).toEqual([3, 3, 3, 3]);
    });

    it('should handle remainder correctly', () => {
      expect(splitIntoBatches(4)).toEqual([3, 1]);
      expect(splitIntoBatches(5)).toEqual([3, 2]);
      expect(splitIntoBatches(7)).toEqual([3, 3, 1]);
      expect(splitIntoBatches(10)).toEqual([3, 3, 3, 1]);
      expect(splitIntoBatches(11)).toEqual([3, 3, 3, 2]);
    });

    it('should respect custom maxPerBatch', () => {
      expect(splitIntoBatches(10, 5)).toEqual([5, 5]);
      expect(splitIntoBatches(7, 4)).toEqual([4, 3]);
      expect(splitIntoBatches(1, 1)).toEqual([1]);
    });

    it('should return empty array for zero maxPerBatch', () => {
      expect(splitIntoBatches(5, 0)).toEqual([]);
    });

    it('should return empty array for negative maxPerBatch', () => {
      expect(splitIntoBatches(5, -1)).toEqual([]);
    });
  });

  describe('extractGcodeFileKey', () => {
    it('should extract gcode file key from attributes', () => {
      const attributes = [
        { key: INVENTORY_CONSTANTS.GCODE_FILE_KEY, value: 'path/to/gcode.gcode' },
        { key: 'printerType', value: 'BAMBU' }
      ];
      expect(extractGcodeFileKey(attributes)).toBe('path/to/gcode.gcode');
    });

    it('should return null when no gcode file key attribute exists', () => {
      const attributes = [{ key: 'printerType', value: 'BAMBU' }];
      expect(extractGcodeFileKey(attributes)).toBeNull();
    });

    it('should return null for empty attributes', () => {
      expect(extractGcodeFileKey([])).toBeNull();
    });
  });

  describe('extractGcodeMetadata', () => {
    it('should extract printer type from attributes', () => {
      const attributes = [
        { key: INVENTORY_CONSTANTS.GCODE_FILE_KEY, value: 'path/to/gcode.gcode' },
        { key: INVENTORY_CONSTANTS.PRINTER_TYPE_KEY, value: 'BAMBU' }
      ];
      expect(extractGcodeMetadata(attributes)).toEqual({ printerType: 'BAMBU' });
    });

    it('should return empty object when no printer type attribute exists', () => {
      const attributes = [{ key: INVENTORY_CONSTANTS.GCODE_FILE_KEY, value: 'path/to/gcode.gcode' }];
      expect(extractGcodeMetadata(attributes)).toEqual({});
    });

    it('should return empty object for empty attributes', () => {
      expect(extractGcodeMetadata([])).toEqual({});
    });
  });

  describe('extractFormFields', () => {
    it('should parse form fields JSON from attributes', () => {
      const formFields = { orthoticType: 'Functional', orthoticTypeFunctional: 'Hike Sport' };
      const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: JSON.stringify(formFields) }];
      expect(extractFormFields(attributes)).toEqual(formFields);
    });

    it('should return empty object when no form fields attribute exists', () => {
      const attributes = [{ key: 'someOtherKey', value: 'someValue' }];
      expect(extractFormFields(attributes)).toEqual({});
    });

    it('should return empty object for invalid JSON', () => {
      const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: 'not-json' }];
      expect(extractFormFields(attributes)).toEqual({});
    });

    it('should return empty object for non-object JSON', () => {
      const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: '"string"' }];
      expect(extractFormFields(attributes)).toEqual({});
    });

    it('should return empty object for array JSON', () => {
      const attributes = [{ key: INVENTORY_CONSTANTS.FORM_FIELDS_KEY, value: '[1,2,3]' }];
      expect(extractFormFields(attributes)).toEqual({});
    });

    it('should return empty object for empty attributes', () => {
      expect(extractFormFields([])).toEqual({});
    });
  });

  describe('buildFormSubmissionData', () => {
    it('should merge form fields with order quantity', () => {
      const formFields = { orthoticType: 'Functional', orthoticTypeFunctional: 'Hike Sport' };
      const result = buildFormSubmissionData(formFields, 3);
      expect(result).toEqual({
        orthoticType: 'Functional',
        orthoticTypeFunctional: 'Hike Sport',
        orderQuantity: 3
      });
    });

    it('should handle empty form fields', () => {
      const result = buildFormSubmissionData({}, 2);
      expect(result).toEqual({ orderQuantity: 2 });
    });

    it('should preserve all form fields', () => {
      const formFields = {
        orthoticType: 'Diabetic',
        orthoticTypeDiabetic: 'Sweet Solemate'
      };
      const result = buildFormSubmissionData(formFields, 1);
      expect(result).toEqual({
        orthoticType: 'Diabetic',
        orthoticTypeDiabetic: 'Sweet Solemate',
        orderQuantity: 1
      });
    });
  });
});
