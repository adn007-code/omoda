"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EditableImage } from "@/components/EditableImage";
import { useEditableContent } from "@/lib/useEditableContent";

export function Interior() {
  const { content } = useEditableContent();

  return (
    <section id="interior" className="py-24 sm:py-32">
      <div className="relative min-h-[760px] overflow-hidden">
        <EditableImage
          src={content.interior.image}
          alt="Luxury SUV interior cabin experience"
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.42)_50%,rgba(0,0,0,0.84)),linear-gradient(180deg,rgba(0,0,0,0.24),rgba(0,0,0,0.78))]" />
        <div className="container-lux relative z-10 grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-[#c9a75d]">{content.interior.eyebrow}</p>
            <h2 className="font-display text-balance text-5xl font-semibold leading-none text-white sm:text-6xl">
              {content.interior.headline}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.8 }}
            className="glass rounded-[8px] p-7 sm:p-9"
          >
            <p className="text-lg leading-8 text-white/70">
              {content.interior.body}
            </p>
            <div className="mt-8 grid gap-4">
              {content.interior.bullets.map((bullet) => (
                <div key={bullet} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <p className="leading-7 text-white/76">{bullet}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
