"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Tracks the user's reduced-motion preference, live. useSyncExternalStore
 * (rather than effect + setState) so the browser-only value is read
 * correctly without a synchronous setState-in-effect or a hydration
 * mismatch — the server snapshot is always `false`, matching until the
 * client takes over.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, () => false);
}

/**
 * True once the element has entered the viewport, and stays true — for
 * one-shot narrative reveals (a section's entrance) rather than continuous
 * ambient motion. Returns a ref to attach and the boolean.
 */
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

/**
 * Live (non-latching) signal for whether ambient/continuous motion should
 * currently run: the element is on screen, the tab is visible, and the user
 * hasn't asked for reduced motion. Use this to gate infinite pulses/loops —
 * never run continuous animation the viewer can't see or has opted out of.
 */
export function useAmbientActive<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [intersecting, setIntersecting] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setDocumentVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return [ref, intersecting && documentVisible && !reducedMotion];
}

/**
 * GSAP ease names, exactly as specified for each motion category — pass
 * these strings directly to gsap.to/gsap.timeline, never a raw
 * cubic-bezier() (that's for CSS-only transitions; see globals.css's
 * --ease-out/--ease-in-out, which resolve to the same curve GSAP's own
 * "power" eases approximate).
 */
export const gsapEase = {
  /** Standard entrances (fade/slide/scale in). */
  entrance: "power3.out",
  /** Dramatic headline/hero reveals only. */
  dramatic: "expo.out",
} as const;

/** Live signal for whether the document tab is currently visible — gate any continuous/ambient GSAP loop (grain drift, ambient pulses) on this so nothing animates in a backgrounded tab. */
export function useDocumentVisible(): boolean {
  return useSyncExternalStore(
    (callback) => {
      document.addEventListener("visibilitychange", callback);
      return () => document.removeEventListener("visibilitychange", callback);
    },
    () => !document.hidden,
    () => true,
  );
}
