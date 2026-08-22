"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Registers ScrollTrigger against native browser scroll — no Lenis. Lenis's
 * inertia was reported as making the whole site feel slow/laggy to scroll,
 * so smooth-scroll is dropped in favor of native feel; every pinned or
 * scrubbed animation elsewhere in the app still registers through
 * ScrollTrigger, which works directly off native scroll events without it.
 *
 * Mounted once in the root layout, renders nothing.
 */
export function ScrollRuntime() {
  useEffect(() => {
    // Layout settles after webfonts finish and after the first paint —
    // recompute pin/trigger positions once both have happened.
    const settleTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => {
      window.clearTimeout(settleTimer);
    };
  }, []);

  return null;
}
