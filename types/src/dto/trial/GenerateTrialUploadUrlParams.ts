export interface GenerateTrialUploadUrlParams {
  fileExtension: 'csv' | 'xlsx' | 'pdf' | 'jpg' | 'jpeg' | 'png' | 'mp4' | 'mov' | 'avi';
  fileName: string;
}
