"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/Button";
import { EditableImage } from "@/components/EditableImage";
import { useEditableContent } from "@/lib/useEditableContent";

export function Hero() {
  const { content } = useEditableContent();

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <EditableImage
        src={content.hero.image}
        alt="SUV premium JAECOO J5 dengan latar pemandangan sinematik"
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86),rgba(0,0,0,0.38)_42%,rgba(0,0,0,0.28)_72%,rgba(0,0,0,0.62)),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.86))]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />

      <div className="container-lux relative z-10 flex min-h-screen items-center pb-16 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.8 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.44em] text-white/70"
          >
            {content.hero.eyebrow}
          </motion.p>
          <h1 className="font-display text-balance text-6xl font-semibold leading-[0.88] text-white sm:text-7xl md:text-8xl lg:text-[8.6rem]">
            {content.hero.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl">
            {content.hero.subheadline}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#features">{content.hero.primaryButton}</Button>
            <Button href={content.cta.whatsapp} variant="secondary" icon="calendar">
              {content.hero.secondaryButton}
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#features"
        aria-label="Gulir ke bagian fitur"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-white/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-12 w-px bg-gradient-to-b from-white/0 via-white/60 to-white/0" />
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
