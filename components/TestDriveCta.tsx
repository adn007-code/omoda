"use client";

import { Button } from "@/components/Button";
import { useEditableContent } from "@/lib/useEditableContent";

export function TestDriveCta() {
  const { content } = useEditableContent();

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container-lux">
        <div className="relative overflow-hidden rounded-[8px] border border-white/12 bg-[#d9dde2] px-6 py-20 text-center text-neutral-950 shadow-[0_40px_120px_rgba(255,255,255,0.10)] sm:px-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-950/40 to-transparent" />
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.42em] text-neutral-600">{content.cta.eyebrow}</p>
          <h2 className="font-display mx-auto max-w-4xl text-balance text-5xl font-semibold leading-none sm:text-6xl md:text-7xl">
            {content.cta.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
            {content.cta.body}
          </p>
          <div className="mt-10">
            <Button href={content.cta.whatsapp} className="bg-neutral-950 text-white hover:bg-neutral-800">
              {content.cta.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
