import { ImageResponse } from "next/og";

export const alt = "Straw — the assistant manager for frontline operations";
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
        background: "#17251f",
        color: "#faf9f6",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 30, fontWeight: 700 }}>Straw</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 20, color: "rgba(250,249,246,0.85)" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#faf9f6" }} />
          Available in the app, iMessage, and WhatsApp
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1010 }}>
        <div style={{ fontSize: 58, lineHeight: 1.08, letterSpacing: -2, fontWeight: 700 }}>
          Your AI assistant manager for the whole operation.
        </div>
        <div style={{ fontSize: 27, lineHeight: 1.35, color: "rgba(250,249,246,0.8)" }}>
          Built-in tools, connected systems, or both. Remembers how you work and helps run scheduling, inventory, forecasting, and tasks.
        </div>
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 18, color: "rgba(250,249,246,0.7)" }}>
        <span>Restaurants &amp; cafés</span>
        <span>Catering &amp; events</span>
        <span>Campus departments &amp; recreation</span>
      </div>
    </div>,
    size,
  );
}
