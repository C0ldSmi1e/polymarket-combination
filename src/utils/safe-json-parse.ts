// Helper to safely parse JSON strings from API
const safeJsonParse = <T>(value: string | null | undefined, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export { safeJsonParse };