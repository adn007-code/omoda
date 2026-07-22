import "server-only";

import { del, list, put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultContent, mergeContent, type EditableContent } from "@/lib/siteContent";

const contentPrefix = "cms/content/";
const localDataPath = path.join(process.cwd(), ".data", "site-content.json");

function usesBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readStoredContent(): Promise<{ content: EditableContent; source: "stored" | "default" }> {
  if (usesBlobStorage()) {
    const result = await list({ prefix: contentPrefix, limit: 100 });
    const latest = result.blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())[0];

    if (!latest) {
      return { content: defaultContent, source: "default" };
    }

    const response = await fetch(latest.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Konten Blob tidak dapat dibaca.");
    }

    const saved = (await response.json()) as Partial<EditableContent>;
    return { content: mergeContent(saved), source: "stored" };
  }

  if (process.env.VERCEL) {
    return { content: defaultContent, source: "default" };
  }

  try {
    const saved = JSON.parse(await readFile(localDataPath, "utf8")) as Partial<EditableContent>;
    return { content: mergeContent(saved), source: "stored" };
  } catch {
    return { content: defaultContent, source: "default" };
  }
}

export async function writeStoredContent(content: EditableContent) {
  const normalized = mergeContent(content);

  if (usesBlobStorage()) {
    const previous = await list({ prefix: contentPrefix, limit: 100 });
    await put(`${contentPrefix}site-content.json`, JSON.stringify(normalized), {
      access: "public",
      addRandomSuffix: true,
      contentType: "application/json",
      cacheControlMaxAge: 60 * 60 * 24 * 365
    });
    if (previous.blobs.length) {
      await del(previous.blobs.map((blob) => blob.url)).catch((error) => {
        console.warn("Blob konten lama belum terhapus:", error);
      });
    }
    return normalized;
  }

  if (process.env.VERCEL) {
    throw new Error("Vercel Blob belum terhubung. Tambahkan Blob Store pada project Vercel.");
  }

  await mkdir(path.dirname(localDataPath), { recursive: true });
  await writeFile(localDataPath, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}
