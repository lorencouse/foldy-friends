import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Rise } from "@/components/rise";
import "./globals.css";

const switzer = localFont({
  src: [
    { path: "./fonts/switzer-400.woff2", weight: "400" },
    { path: "./fonts/switzer-500.woff2", weight: "500" },
    { path: "./fonts/switzer-600.woff2", weight: "600" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const siteUrl = process.env.SITE_URL ?? "https://www.foldyfriends.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Foldy Friends: origami paper, glue and paper animal kits",
    template: "%s · Foldy Friends",
  },
  description: "Origami paper, glue pens and 3D paper animal kits for kids and families who fold together.",
  openGraph: { siteName: "Foldy Friends", type: "website" },
};

export const viewport: Viewport = { themeColor: "#1d1c1a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={switzer.variable}>
      <body>
        <script
          // Marks the page as scripted so entrance animations can hide content
          // only when they can also reveal it.
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static one-liner
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
        <Rise />
      </body>
    </html>
  );
}
