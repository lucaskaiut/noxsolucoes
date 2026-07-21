export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(html: string): Heading[] {
  if (!html) return [];

  const headings: Heading[] = [];
  const regex = /<h([23])\b[^>]*>(.*?)<\/h\1>/gi;

  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = Number.parseInt(match[1], 10);
    const innerHtml = match[2];

    const text = innerHtml.replace(/<[^>]*>/g, "").trim();
    if (!text) continue;

    const idMatch = match[0].match(/\sid=["']([^"']+)["']/i);
    const id =
      idMatch?.[1] ??
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (headings.some((h) => h.id === id)) continue;

    headings.push({ id, text, level });
  }

  return headings;
}
