"use client";

import { useEffect, useState } from "react";

export type PdfMenuItem = { name: string; price: string };
export type PdfMenuCategory = {
  title: string;
  items: PdfMenuItem[];
  extraLabel?: string;
  extraText?: string;
};

const PRICE_RE = /\$[\d,]+(?:\.\d{2})?(?:(?:\s+each)|(?:\s+or\s+\d+\s+for\s+\$[\d,]+))?/gi;

function parseMenuLines(lines: string[]): PdfMenuCategory[] {
  const categories: PdfMenuCategory[] = [];
  let current: PdfMenuCategory | null = null;

  for (const raw of lines) {
    const line = raw.trim().replace(/\s{2,}/g, " ");
    if (!line) continue;

    const prices = line.match(PRICE_RE);

    if (prices) {
      const price = prices.join(" / ");
      const name = line.replace(PRICE_RE, "").replace(/\.{2,}/g, "").trim();
      if (!current) current = { title: "Menu", items: [] };
      if (name) current.items.push({ name, price });
    } else if (line.length < 55 && line.split(",").length < 4) {
      if (current) categories.push(current);
      current = { title: line, items: [] };
    } else if (current && line.length >= 55) {
      if (!current.extraText) {
        current.extraLabel = "Flavours";
        current.extraText = line;
      } else {
        current.extraText += " " + line;
      }
    }
  }

  if (current) categories.push(current);
  return categories.filter((c) => c.items.length > 0);
}

function proxyUrl(url: string) {
  return `/api/pdf-proxy?url=${encodeURIComponent(url)}`;
}

async function extractMenuFromPdf(url: string): Promise<PdfMenuCategory[]> {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const pdf = await pdfjsLib.getDocument({ url: proxyUrl(url) }).promise;
  const lines: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    // Group text items by Y position (same row)
    const byY = new Map<number, string[]>();
    for (const item of content.items) {
      if ("str" in item && item.str.trim()) {
        const y = Math.round((item as { transform: number[] }).transform[5]);
        if (!byY.has(y)) byY.set(y, []);
        byY.get(y)!.push(item.str);
      }
    }

    // Sort top-to-bottom (higher Y = higher on page in PDF coords)
    const sorted = Array.from(byY.entries()).sort((a, b) => b[0] - a[0]);
    for (const [, parts] of sorted) {
      const line = parts.join(" ").trim();
      if (line) lines.push(line);
    }
  }

  return parseMenuLines(lines);
}

export function usePdfMenu(url: string | undefined) {
  const [categories, setCategories] = useState<PdfMenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    extractMenuFromPdf(url)
      .then(setCategories)
      .catch((e: Error) => setError(e?.message ?? "Failed to load menu"))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { categories, isLoading, error };
}
