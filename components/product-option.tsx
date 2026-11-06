"use client";

import { createContext, type ReactNode, use, useState } from "react";
import { ProductArt } from "@/components/product-art";

type Ctx = { option: string | null; setOption: (o: string) => void };
const OptionContext = createContext<Ctx | null>(null);

/** Shares the chosen option (moon colour, pack size) between the picture and the buy box. */
export function OptionProvider({ initial, children }: { initial: string | null; children: ReactNode }) {
  const [option, setOption] = useState(initial);
  return <OptionContext value={{ option, setOption }}>{children}</OptionContext>;
}

export function useOption() {
  return use(OptionContext);
}

export function OptionArt({ art, title, className }: { art: string; title: string; className?: string }) {
  const ctx = useOption();
  return <ProductArt art={art} option={ctx?.option ?? undefined} title={title} className={className} />;
}
