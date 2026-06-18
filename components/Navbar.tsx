"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Unit & Harga", href: "#unit-harga" },
  { label: "Performance", href: "#performance" },
  { label: "Interior", href: "#interior" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 120], ["rgba(8,8,8,0.28)", "rgba(8,8,8,0.78)"]);
  const borderColor = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0.10)", "rgba(255,255,255,0.20)"]);

  return (
    <motion.header
      style={{ background, borderColor }}
      className="fixed left-1/2 top-4 z-50 w-[min(1240px,calc(100%-24px))] -translate-x-1/2 rounded-full border bg-black/45 px-3 py-2.5 shadow-[0_22px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
    >
      <nav className="flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3" aria-label="JAECOO-OMODA home">
          <span className="relative flex h-12 w-[176px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white shadow-[0_16px_50px_rgba(255,255,255,0.10)] sm:h-14 sm:w-[220px]">
            <Image
              src="/omoda-jaecoo-navbar-logo.png"
              alt="OMODA JAECOO"
              fill
              sizes="220px"
              className="object-contain px-3 py-1.5"
              priority
            />
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/66 transition duration-300 hover:bg-white hover:text-neutral-950 xl:px-4"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="mt-3 grid gap-1 rounded-[24px] border border-white/10 bg-black/88 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.5)] lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/76 transition hover:bg-white hover:text-neutral-950"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </motion.header>
  );
}
