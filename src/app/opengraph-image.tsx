import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STAGES = ["Idea", "Architecture", "Build", "Test", "Ship"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#111110",
          color: "#ecebe8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#8b8b90" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#141416",
              border: "1px solid rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ededeb",
              fontSize: 24,
            }}
          >
            L
          </div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 78, lineHeight: 1, letterSpacing: -3, maxWidth: 950 }}>
            I build web apps, from the first idea to production.
          </div>
          <div style={{ fontSize: 30, color: "#c9c9c6" }}>{site.role}</div>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 20 }}>
          {STAGES.map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.16)",
                color: "#8f8e89",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
