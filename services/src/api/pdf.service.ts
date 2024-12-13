import { AwsBucketConfig } from '@hike/types';
import { getAwsBucketUrl } from './s3.service';

/**
 * Interface representing the parameters required for generating a workbench PDF.
 */
interface WorkbenchPdfParams {
  /**
   * The file name of the PDF without the file extension.
   */
  fileName: string;
  workbenchId: string;
  evaluationId: string;
  patientId: string;
}

/**
 * Generates the file name for a workbench PDF.
 *
 * @example
 * const fileName = getWorkbenchPdfFileName('12345', 'patient');
 * console.log(fileName); // Output: 12345-patient-form.pdf
 */
export const getWorkbenchPdfFileName = ({
  fileName,
  workbenchId
}: Pick<WorkbenchPdfParams, 'fileName' | 'workbenchId'>) => `${workbenchId}-${fileName}.pdf`;

/**
 * Generates the path for a workbench PDF.
 *
 * @example
 * const params = { patientId: 'p1', evaluationId: 'e1', workbenchId: 'w1', type: 'order' };
 * const path = getWorkbenchPdfPath(params);
 * console.log(path); // Output: p1/e1/w1-order-form.pdf
 *
 * @note
 * Uses `getWorkbenchPdfFileName` internally.
 */
export const getWorkbenchPdfPath = ({ patientId, evaluationId, ...rest }: WorkbenchPdfParams) =>
  `${patientId}/${evaluationId}/${getWorkbenchPdfFileName(rest)}`;

/**
 * Generates the URL for a workbench PDF.
 *
 * @example
 * const params = { patientId: 'p1', evaluationId: 'e1', workbenchId: 'w1', type: 'order' };
 * const awsConfig = { bucket: 'my-bucket', region: 'us-west-2' };
 * const url = getWorkbenchPdfUrl({ params, awsConfig });
 * console.log(url); // Output: https://my-bucket.s3.us-west-2.amazonaws.com/p1/e1/w1-order-form.pdf
 *
 * @note
 * Uses `getWorkbenchPdfPath` internally.
 */
export const getWorkbenchPdfUrl = ({ params, awsConfig }: { params: WorkbenchPdfParams; awsConfig: AwsBucketConfig }) =>
  `${getAwsBucketUrl(awsConfig)}/${getWorkbenchPdfPath(params)}`;
