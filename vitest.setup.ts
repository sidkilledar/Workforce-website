import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom doesn't implement IntersectionObserver. Components that reveal on
// scroll (useInView/useAmbientActive) only need the constructor to exist —
// tests that care about actual intersection can grab the stored callback
// off the instance and invoke it directly.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];
  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

// jsdom doesn't implement matchMedia. Needed both by usePrefersReducedMotion
// and by GSAP's ScrollTrigger, which queries matchMedia at plugin
// registration time (import-time in any component that imports it) —
// without this stub, importing such a component throws in tests regardless
// of whether the test exercises any scroll behavior.
vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })),
);
