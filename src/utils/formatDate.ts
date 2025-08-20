export function formatCreatedAt(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
