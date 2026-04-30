export const getFilenameFromDisposition = (
  disposition?: string,
): string | null => {
  if (!disposition) return null;

  const match = disposition.match(/filename="?([^"]+)"?/);
  return match?.[1] ?? null;
};
