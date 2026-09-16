export function mediaUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  if (/^(https?:|blob:|data:)/i.test(value)) return value;
  if (value.startsWith('/storage/') || value.startsWith('storage/')) {
    const origin = new URL(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api').origin;
    return `${origin}/${value.replace(/^\/+/, '')}`;
  }
  return value;
}
