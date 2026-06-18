"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EditableImage } from "@/components/EditableImage";
import { useEditableContent } from "@/lib/useEditableContent";

export function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const { content } = useEditableContent();

  return (
    <section id="gallery" className="py-10 sm:py-16">
      <div className="container-lux">
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-[#c9a75d]">Gallery</p>
          <h2 className="font-display text-5xl font-semibold leading-none text-white sm:text-6xl">
            Designed to be noticed
          </h2>
        </div>

        <div className="masonry">
          {content.gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setSelected(src)}
              className={`masonry-item group relative block w-full overflow-hidden rounded-[8px] border border-white/10 bg-white/5 ${
                index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-[5/4]" : "aspect-square"
              }`}
              aria-label="Open gallery image"
            >
              <EditableImage
                src={src}
                alt={`JAECOO J5 gallery image ${index + 1}`}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/24" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/88 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
              aria-label="Close gallery preview"
              onClick={() => setSelected(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              className="relative h-[78vh] w-[min(1100px,100%)] overflow-hidden rounded-[8px]"
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <EditableImage
                src={selected}
                alt="Expanded JAECOO J5 gallery preview"
                sizes="100vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
