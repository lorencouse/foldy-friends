"use client";

import { createContext, type ReactNode, use, useState } from "react";

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
