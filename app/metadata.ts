import { Metadata } from "next";
import { getURL } from "@/lib/utils"; // Assuming this is where getURL is defined

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
