import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import MouseGlow from "@/components/MouseGlow";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "brewprint — coffee discovery, personalized",
  description:
    "Connecting every coffee shop to its perfect customer — and every coffee lover to their perfect cup.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        {/* Map coordinate grid — appears subtly over all sections */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            backgroundImage: [
              'linear-gradient(rgba(255,255,255,0.032) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.032) 1px, transparent 1px)',
              'linear-gradient(rgba(217,142,74,0.018) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(217,142,74,0.018) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '72px 72px, 72px 72px, 360px 360px, 360px 360px',
            mixBlendMode: 'overlay',
          }}
        />
        <MouseGlow />
        <Nav />
        {children}
      </body>
    </html>
  );
}
