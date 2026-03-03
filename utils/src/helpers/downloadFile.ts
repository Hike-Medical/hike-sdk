export const downloadFile = (data: BlobPart | BlobPart[], filename: string, type: string, revokeTimeoutMs = 30_000) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const blobData = Array.isArray(data) ? data : [data];
  const blob = new Blob(blobData, { type });
  const url = window.URL.createObjectURL(blob);
  const anchorElement = window.document.createElement('a');

  anchorElement.href = url;
  anchorElement.download = filename;
  window.document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();

  setTimeout(() => window.URL.revokeObjectURL(url), revokeTimeoutMs);
};
