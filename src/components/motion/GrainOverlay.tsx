/**
 * One static, fixed film-grain texture. Keeping this server-rendered and
 * motionless preserves the tactile surface without repainting a full-screen
 * SVG filter every 90–150ms on mobile devices.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 select-none"
      style={{ opacity: 0.025, mixBlendMode: "overlay" }}
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <filter id="site-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect x="-4" y="-4" width="calc(100% + 8px)" height="calc(100% + 8px)" filter="url(#site-grain)" />
      </svg>
    </div>
  );
}
