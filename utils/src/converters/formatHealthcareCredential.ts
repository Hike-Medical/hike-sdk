export const formatHealthcareCredential = (title: string) => {
  // for compliance purposes, it doesn't matter if a doctor is a resident, so remove the residency suffix
  return title.replace(/[,\s-]+PGY[\s-][1-4]/,'').trim();
};