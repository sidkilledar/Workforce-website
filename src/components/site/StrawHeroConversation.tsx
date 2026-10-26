"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export const heroMessages = [
  {
    from: "straw",
    text: "Jordan called out of today’s 5–9 shift. Alex is qualified, available, and has confirmed they can cover. Approve the replacement?",
  },
  { from: "you", text: "Approve." },
  { from: "straw", text: "Done. Alex is scheduled, and the team has been notified." },
] as const;

export const heroReceipt = "✓ Coverage confirmed · Schedule updated · Team notified";

/** Messages plus the closing receipt. */
const STEPS = heroMessages.length + 1;
export const STEP_DELAY_MS = 2000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * One scripted exchange. The first message is visible immediately; the rest
 * arrive every two seconds once the conversation is on screen. Every row is
 * rendered from the start (hidden until revealed) so the height never changes.
 */
export function StrawHeroConversation() {
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const count = reducedMotion ? STEPS : revealed;
  const complete = count >= STEPS;

  useEffect(() => {
    if (reducedMotion || complete || paused || !inView) return;
    const timer = setTimeout(() => setRevealed((n) => n + 1), STEP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [reducedMotion, complete, paused, inView, revealed]);

  function replay() {
    setRevealed(1);
    setPaused(false);
  }

  return (
    <figure className="straw-chat" ref={rootRef}>
      <div className="straw-chat__surface">
        <div className="straw-chat__head">
          <span className="straw-chat__avatar" aria-hidden="true">S</span>
          <span className="straw-chat__name">Straw</span>
        </div>
        <ol className="straw-chat__list" aria-label="Example conversation with Straw">
          {heroMessages.map((message, index) => (
            <li
              key={message.text}
              className={`straw-chat__row straw-chat__row--${message.from}`}
              data-revealed={index < count}
              aria-hidden={index < count ? undefined : true}
            >
              <span className="straw-chat__sender">
                {message.from === "straw" ? "Straw" : "You"}
              </span>
              <p className="straw-chat__bubble">{message.text}</p>
            </li>
          ))}
          <li
            className="straw-chat__receipt"
            data-revealed={heroMessages.length < count}
            aria-hidden={heroMessages.length < count ? undefined : true}
          >
            {heroReceipt}
          </li>
        </ol>
      </div>
      <figcaption className="straw-chat__foot">
        <p>
          <span>Available in the app, iMessage, and WhatsApp</span>
          <span className="straw-chat__sample">Illustrative example · sample data</span>
        </p>
        {reducedMotion ? null : (
          <div className="straw-chat__controls">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              disabled={complete}
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button type="button" onClick={replay}>
              Replay
            </button>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
