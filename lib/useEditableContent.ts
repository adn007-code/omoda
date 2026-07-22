"use client";

import { useEffect, useState } from "react";
import { defaultContent, mergeContent, type EditableContent } from "@/lib/siteContent";

export function useEditableContent() {
  const [content, setContent] = useState<EditableContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/content", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Konten tidak dapat dimuat.");
        }

        return (await response.json()) as { content?: Partial<EditableContent> };
      })
      .then((result) => setContent(mergeContent(result.content ?? null)))
      .catch((error) => {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error);
          setContent(defaultContent);
        }
      })
      .finally(() => setIsLoaded(true));

    return () => controller.abort();
  }, []);

  return { content, isLoaded };
}
