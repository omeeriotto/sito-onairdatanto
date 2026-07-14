import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const socialPreviewAlt =
  "Adriano Carlucci - Social e Digital Marketing per artisti, band e label";

export const socialPreviewSize = {
  width: 1200,
  height: 630,
};

export const socialPreviewContentType = "image/png";

export async function createSocialPreviewImage() {
  const profileData = await readFile(
    join(process.cwd(), "public/media/adriano-story-profile.jpg"),
    "base64",
  );
  const profileSrc = `data:image/jpeg;base64,${profileData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#dfffa3",
          color: "#11150d",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0) 42%), linear-gradient(180deg, #dfffa3 0%, #edffc8 54%, #dfffa3 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -180,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: "rgba(21,61,40,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -210,
            bottom: -270,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: "rgba(133,247,30,0.50)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "58px 66px",
            gap: 54,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: 690,
              height: "100%",
              gap: 52,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  padding: "12px 18px",
                  border: "2px solid rgba(17,21,13,0.14)",
                  borderRadius: 999,
                  background: "rgba(241,255,208,0.76)",
                  color: "#153d28",
                  fontSize: 22,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    width: 12,
                    height: 12,
                    borderRadius: 99,
                    background: "#85f71e",
                  }}
                />
                Social & Digital Marketing per la musica
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 48,
                  gap: 2,
                  fontSize: 92,
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: 0,
                  textTransform: "uppercase",
                }}
              >
                <span>Adriano</span>
                <span>Carlucci</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 12,
                color: "#fffdf1",
                fontSize: 21,
                fontWeight: 800,
              }}
            >
              {["Consulenze", "Lanci discografici", "Formazione"].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      padding: "13px 18px",
                      borderRadius: 999,
                      background: "#11150d",
                    }}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 342,
              height: 342,
              borderRadius: 342,
              padding: 12,
              background: "#85f71e",
              boxShadow: "0 28px 70px rgba(17,21,13,0.25)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileSrc}
              alt=""
              width="318"
              height="318"
              style={{
                width: 318,
                height: 318,
                borderRadius: 318,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    ),
    socialPreviewSize,
  );
}
