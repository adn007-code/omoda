"use client";

import { motion } from "framer-motion";
import { iconMap } from "@/lib/siteContent";
import { useEditableContent } from "@/lib/useEditableContent";

export function FeatureCards() {
  const { content } = useEditableContent();

  return (
    <section className="py-10 sm:py-16">
      <div className="container-lux">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-[#c9a75d]">{content.features.eyebrow}</p>
            <h2 className="font-display text-4xl font-semibold leading-none text-white sm:text-5xl">
              {content.features.headline}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/62">
            {content.features.body}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.features.cards.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? iconMap.Sparkles;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="glass group min-h-[250px] rounded-[8px] p-7 transition duration-300 hover:border-white/28 hover:shadow-[0_36px_100px_rgba(201,167,93,0.14)]"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#d6d9de] transition duration-300 group-hover:border-[#c9a75d]/70 group-hover:text-[#c9a75d]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-4 leading-7 text-white/60">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
