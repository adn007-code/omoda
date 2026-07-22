"use client";

import { useRef } from "react";
import gsap from "gsap";
import { EditableImage } from "@/components/EditableImage";
import { useGsap } from "@/lib/useGsap";
import { useEditableContent } from "@/lib/useEditableContent";

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { content } = useEditableContent();

  useGsap(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".showcase-image",
        { y: 80, scale: 1.06 },
        {
          y: -40,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
      gsap.from(".showcase-copy", {
        y: 44,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".showcase-copy",
          start: "top 78%"
        }
      });
    }, sectionRef);

    return context;
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="showcase-image image-sheen relative aspect-[4/3] overflow-hidden rounded-[8px] border border-white/10 shadow-[0_36px_120px_rgba(0,0,0,0.46)]">
          <EditableImage
            src={content.showcase.image}
            alt="Showcase gaya hidup camping JAECOO J5"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
          />
        </div>
        <div className="showcase-copy">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-[#c9a75d]">{content.showcase.eyebrow}</p>
          <h2 className="font-display text-balance text-5xl font-semibold leading-none text-white sm:text-6xl">
            {content.showcase.headline}
          </h2>
          <p className="mt-7 text-lg leading-8 text-white/66">
            {content.showcase.body}
          </p>
          <div className="luxury-rule my-9" />
          <div className="grid gap-5 sm:grid-cols-3">
            {content.showcase.pillars.map((item) => (
              <div key={item} className="border-l border-white/16 pl-4">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/86">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
