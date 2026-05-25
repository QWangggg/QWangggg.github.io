export function buildQueryString(params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value?.trim()) {
      searchParams.set(key, value.trim());
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
}
