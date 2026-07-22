"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/Button";
import { EditableImage } from "@/components/EditableImage";
import { useEditableContent } from "@/lib/useEditableContent";

export function UnitPricing() {
  const { content } = useEditableContent();

  return (
    <section id="unit-harga" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_45%,rgba(255,255,255,0.025))]" />
      <div className="container-lux relative z-10">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-[#c9a75d]">{content.pricing.eyebrow}</p>
            <h2 className="font-display text-balance text-5xl font-semibold leading-none text-white sm:text-6xl">
              {content.pricing.headline}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/62">{content.pricing.body}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {content.pricing.units.map((unit, index) => (
            <motion.article
              key={`${unit.name}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="glass flex min-h-[360px] flex-col rounded-[8px] p-7"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/64">
                  Unit {index + 1}
                </span>
                <MessageCircle className="h-5 w-5 text-[#c9a75d]" aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-semibold text-white">{unit.name}</h3>
              <p className="mt-4 text-sm leading-6 text-white/58">{unit.description}</p>

              <div className="my-8 h-px bg-white/10" />

              <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/44">Harga</p>
              <p className="font-display mt-2 text-4xl font-semibold leading-none text-white">{unit.price}</p>

              <div className="mt-8 grid gap-3">
                {unit.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3 text-sm text-white/68">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-neutral-950">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {highlight}
                  </div>
                ))}
              </div>

              {unit.colors && unit.colors.length > 0 ? (
                <div className="mt-8">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-white/44">Pilihan Warna</p>
                  <div className="grid grid-cols-2 gap-3">
                    {unit.colors.map((color) => (
                      <div key={color.name} className="overflow-hidden rounded-[8px] border border-white/10 bg-white/5">
                        <div className="relative aspect-[4/3]">
                          <EditableImage
                            src={color.image}
                            alt={`${unit.name} warna ${color.name}`}
                            sizes="(min-width: 1024px) 20vw, 45vw"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <p className="px-3 py-2 text-xs font-medium text-white/74">{color.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-auto pt-8">
                <Button href={content.cta.whatsapp} variant={index === 1 ? "primary" : "secondary"} className="w-full">
                  Tanya Unit Ini
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
