export function decodeValue(val: string, encoded?: boolean): string {
  if (!encoded) return val;
  try {
    return atob(val);
  } catch {
    return val;
  }
}

export function formatEmailUrl(email: string, encoded?: boolean): string {
  const decoded = decodeValue(email, encoded);
  return `mailto:${decoded}`;
}
