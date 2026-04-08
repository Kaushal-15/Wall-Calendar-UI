export function formatDateKey(start, end) {
  if (!start) return null;
  if (!end) return start.toISOString().split("T")[0];
  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];
  // Ensure chronologically start is first in string
  return start < end ? `${startStr}_${endStr}` : `${endStr}_${startStr}`;
}
