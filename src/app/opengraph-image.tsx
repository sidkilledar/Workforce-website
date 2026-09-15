import { ImageResponse } from "next/og";

export const alt = "WorkforceOS — one place to see, understand, and run the operation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#57685e",
        color: "#fcfaf5",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 30, fontWeight: 700 }}>WorkforceOS</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 20, color: "rgba(252,250,245,0.85)" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#fcfaf5" }} />
          Systems connected
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1010 }}>
        <div style={{ fontSize: 58, lineHeight: 1.08, letterSpacing: -2, fontWeight: 700 }}>
          One place to see, understand, and run the operation.
        </div>
        <div style={{ fontSize: 27, lineHeight: 1.35, color: "rgba(252,250,245,0.8)" }}>
          Operational intelligence and execution for frontline businesses.
          Connect your systems. Coordinate your people. Complete the response.
        </div>
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 18, color: "rgba(252,250,245,0.7)" }}>
        <span>Catering</span>
        <span>Restaurant groups</span>
        <span>Campus sports &amp; recreation</span>
      </div>
    </div>,
    size,
  );
}
