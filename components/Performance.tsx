"use client";

import { useRef } from "react";
import gsap from "gsap";
import { performanceStats } from "@/lib/content";
import { useGsap } from "@/lib/useGsap";

export function Performance() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(() => {
    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-counter]").forEach((element) => {
        const target = Number(element.dataset.counter || 0);
        const snap = { value: 0 };
        gsap.to(snap, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = Math.round(snap.value).toString();
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            once: true
          }
        });
      });
    }, sectionRef);

    return context;
  }, []);

  return (
    <section id="performance" ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#050505,#171817_48%,#050505)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="container-lux relative z-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.42em] text-[#c9a75d]">Performa</p>
          <h2 className="font-display text-balance text-5xl font-semibold leading-none text-white sm:text-6xl">
            Tenaga yang tetap terkendali
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/64">
            Kekuatan, responsivitas, dan efisiensi menyatu dalam SUV mewah yang disetel untuk mobilitas perkotaan
            dan perjalanan akhir pekan yang percaya diri.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {performanceStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass rounded-[8px] p-7">
                <Icon className="mb-9 h-6 w-6 text-[#c9a75d]" aria-hidden="true" />
                <p className="font-display text-5xl font-semibold text-white">
                  {stat.custom ? (
                    stat.custom
                  ) : (
                    <>
                      <span data-counter={stat.value}>0</span>
                      {stat.suffix}
                    </>
                  )}
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.24em] text-white/54">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
