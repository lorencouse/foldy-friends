import { Metadata } from "next";
import { getURL } from "next/dist/shared/lib/utils";

const title = "foldy friends";
const description = "Shop origami kits and supplies.";

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
};
