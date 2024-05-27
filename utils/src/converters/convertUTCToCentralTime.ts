export const convertUTCToCentralTime = (utcDateStr) => {
  const utcDate = new Date(utcDateStr);

  const centralTimeStr = utcDate.toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return centralTimeStr;
};
