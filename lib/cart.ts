"use client";

import { useSyncExternalStore } from "react";
import { MAX_LINE_QUANTITY } from "@/lib/money";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  art: string;
  option: string | null;
  unitPriceCents: number;
  /** The regular price, when the item was added on sale; shown as savings. Display only. */
  listPriceCents?: number;
  quantity: number;
};

const KEY = "foldy-cart-v2";
const EMPTY: CartLine[] = [];
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;

function read(): CartLine[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as CartLine[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: CartLine[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); the cart still works for this visit.
  }
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const same = (a: CartLine, productId: string, option: string | null) =>
  a.productId === productId && a.option === option;

export const cart = {
  add(line: Omit<CartLine, "quantity">, quantity = 1) {
    const lines = read();
    const found = lines.find((l) => same(l, line.productId, line.option));
    write(
      found
        ? lines.map((l) =>
            l === found ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_LINE_QUANTITY) } : l,
          )
        : [...lines, { ...line, quantity }],
    );
  },
  setQuantity(productId: string, option: string | null, quantity: number) {
    const lines = read();
    write(
      quantity <= 0
        ? lines.filter((l) => !same(l, productId, option))
        : lines.map((l) =>
            same(l, productId, option) ? { ...l, quantity: Math.min(quantity, MAX_LINE_QUANTITY) } : l,
          ),
    );
  },
  clear() {
    write(EMPTY);
  },
};

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function useCartCount() {
  const lines = useCart();
  return lines.reduce((n, l) => n + l.quantity, 0);
}
