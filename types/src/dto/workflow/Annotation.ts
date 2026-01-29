import { AnnotationType } from '../../../prisma';

export const AnnotationTypeEnum = {
  CLASSIFICATION: 'CLASSIFICATION',
  REVIEW: 'REVIEW',
  FACT: 'FACT'
} as const satisfies Record<AnnotationType, AnnotationType> & {
  [K in AnnotationType]: K;
};

export const AnnotationTypeList = Object.values(AnnotationTypeEnum);
