import { ImageResponse } from "next/og";

export const alt = "WorkforceOS — the AI operations command center for frontline businesses";
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
        background: "#f1ecde",
        color: "#171310",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 30, fontWeight: 700 }}>WorkforceOS</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 20 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#ff4e1f" }} />
          Operations running
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
        <div style={{ fontSize: 68, lineHeight: 1.04, letterSpacing: -3, fontWeight: 700 }}>
          Your operation, running from one place.
        </div>
        <div style={{ fontSize: 29, lineHeight: 1.35, color: "#5d5750" }}>
          Connect your systems, see one operating picture, and let AI coordinate within the rules you set.
        </div>
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 18, color: "#5d5750" }}>
        <span>Catering</span>
        <span>Restaurant groups</span>
        <span>Campus sports &amp; recreation</span>
      </div>
    </div>,
    size,
  );
}
