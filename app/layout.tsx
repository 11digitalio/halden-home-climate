import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: {
    default: "Halden Home Climate | Heating & Cooling for the Phoenix Valley",
    template: "%s | Halden Home Climate",
  },
  description:
    "Clear, thoughtful heating and cooling service for homes across Phoenix, Scottsdale, and the East Valley.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Comfort, without the runaround.",
    description: "Heating and cooling service for the Phoenix Valley, with clear options before any work begins.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Halden Home Climate: comfort, without the runaround" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Halden Home Climate",
    description: "Comfort, without the runaround.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10352d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
