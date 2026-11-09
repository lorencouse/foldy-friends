import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Rise } from "@/components/rise";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Baloo 2 for headings and buttons, Nunito for reading. Both are variable
// fonts (latin subset), self-hosted so the build needs no network.
const baloo = localFont({
  src: "./fonts/baloo-2-latin.woff2",
  weight: "400 800",
  variable: "--font-baloo",
  display: "swap",
});

const nunito = localFont({
  src: "./fonts/nunito-latin.woff2",
  weight: "400 900",
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Foldy Friends: origami paper, glue and paper animal kits",
    template: "%s · Foldy Friends",
  },
  description: "Origami paper, glue pens and 3D paper animal kits for kids and families who fold together.",
  openGraph: { siteName: SITE_NAME, type: "website" },
};

export const viewport: Viewport = { themeColor: "#fbf6ec" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${baloo.variable} ${nunito.variable}`}>
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
