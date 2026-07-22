"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsap(setup: () => gsap.Context | void, dependencies: unknown[] = []) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = setup();

    return () => {
      context?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
