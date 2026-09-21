import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0A",
          color: "#F4F1EA",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9A9A9E",
            marginBottom: 24,
          }}
        >
          Full Stack Developer — Motion &amp; Interaction
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 800, lineHeight: 1.1 }}>
          <span>Rama Bhattarai</span>
          <span style={{ color: "#D8FF4F" }}>builds polished</span>
          <span>web experiences.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
