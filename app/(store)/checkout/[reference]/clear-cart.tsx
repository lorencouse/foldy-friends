"use client";

import { useEffect } from "react";
import { cart } from "@/lib/cart";

export function ClearCartOnMount() {
  useEffect(() => cart.clear(), []);
  return null;
}
