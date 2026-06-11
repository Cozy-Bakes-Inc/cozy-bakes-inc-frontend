"use client";

import { useEffect, useState } from "react";

export type PdfMenuItem = { name: string; price: string };
export type PdfMenuCategory = {
  title: string;
  items: PdfMenuItem[];
  extraLabel?: string;
  extraText?: string;
};
type PdfMenuResult = {
  url?: string;
  categories: PdfMenuCategory[];
  error: string | null;
};

const PRICE_RE = /\$[\d,]+(?:\.\d{2})?(?:(?:\s+each)|(?:\s+or\s+\d+\s+for\s+\$[\d,]+))?/gi;
const PDF_LOAD_ERROR = "The menu preview is not available on this device. Please use the download button to view the PDF.";

function defineAtMethod(prototype: unknown) {
  const target = prototype as { at?: (index: number) => unknown };

  if (typeof target.at === "function") return;

  Object.defineProperty(target, "at", {
    configurable: true,
    writable: true,
    value: function at(
      this: { length?: number } & Record<number, unknown>,
      index: number,
    ) {
      const length = Number(this.length) || 0;
      const integerIndex = Math.trunc(index) || 0;
      const relativeIndex =
        integerIndex >= 0 ? integerIndex : length + integerIndex;

      if (relativeIndex < 0 || relativeIndex >= length) return undefined;
      return this[relativeIndex];
    },
  });
}

function ensurePdfRuntimeSupport() {
  defineAtMethod(Array.prototype);
  defineAtMethod(String.prototype);

  [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  ].forEach((TypedArray) => defineAtMethod(TypedArray.prototype));
}

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
  ensurePdfRuntimeSupport();

  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const res = await fetch(proxyUrl(url));

  if (!res.ok) {
    throw new Error("Failed to fetch menu PDF");
  }

  const data = new Uint8Array(await res.arrayBuffer());
  const pdf = await pdfjsLib.getDocument({ data }).promise;
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
  const [result, setResult] = useState<PdfMenuResult>({
    categories: [],
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    let isCancelled = false;

    extractMenuFromPdf(url)
      .then((categories) => {
        if (!isCancelled) {
          setResult({ url, categories, error: null });
        }
      })
      .catch((e: Error) => {
        console.error("Failed to parse menu PDF", e);

        if (!isCancelled) {
          setResult({
            url,
            categories: [],
            error: PDF_LOAD_ERROR,
          });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [url]);

  const isLoading = Boolean(url) && result.url !== url;
  const categories = result.url === url ? result.categories : [];
  const error = result.url === url ? result.error : null;

  return { categories, isLoading, error };
}
