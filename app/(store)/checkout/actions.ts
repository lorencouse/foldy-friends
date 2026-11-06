"use server";

import { randomBytes } from "node:crypto";
import { inArray } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { orderItems, orders, products } from "@/lib/db/schema";
import { effectivePrice, shippingFor } from "@/lib/money";
import { getUser } from "@/lib/session";

const Line = z.object({
  productId: z.uuid(),
  option: z.string().max(40).nullable(),
  quantity: z.number().int().min(1).max(20),
});

const CheckoutInput = z.object({
  email: z.email("Enter an email address we can send the confirmation to."),
  name: z.string().trim().min(2, "Enter the name for the parcel.").max(100),
  line1: z.string().trim().min(3, "Enter the street address.").max(200),
  line2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(2, "Enter the town or city.").max(100),
  region: z.string().trim().min(2, "Enter the state.").max(100),
  postalCode: z.string().trim().min(3, "Enter the ZIP code.").max(20),
  lines: z.array(Line).min(1, "Your cart is empty.").max(50),
});

export type CheckoutState = { error?: string };

export async function placeOrder(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  let lines: unknown;
  try {
    lines = JSON.parse(String(formData.get("lines") ?? "[]"));
  } catch {
    return { error: "Your cart could not be read. Refresh and try again." };
  }
  const parsed = CheckoutInput.safeParse({
    ...Object.fromEntries(formData),
    lines,
  });
  if (!parsed.success)
    return {
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };
  const input = parsed.data;

  // Prices always come from the database, never from the browser.
  const ids = [...new Set(input.lines.map((l) => l.productId))];
  const found = await db.select().from(products).where(inArray(products.id, ids));
  const byId = new Map(found.map((p) => [p.id, p]));
  const items = input.lines.flatMap((l) => {
    const p = byId.get(l.productId);
    if (!p) return [];
    const option = l.option && p.options.includes(l.option) ? l.option : null;
    return [{ product: p, option, quantity: l.quantity, unit: effectivePrice(p) }];
  });
  if (items.length === 0) return { error: "Those products are no longer available." };
  const short = items.find((i) => i.product.stock < i.quantity);
  if (short)
    return {
      error: `Only ${short.product.stock} of ${short.product.name} left. Lower the amount and try again.`,
    };

  const subtotal = items.reduce((s, i) => s + i.unit * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const reference = `FF-${randomBytes(4).toString("hex").toUpperCase()}`;
  const user = await getUser();

  await db.transaction(async (tx) => {
    const [order] = await tx
      .insert(orders)
      .values({
        reference,
        userId: user?.id ?? null,
        email: input.email,
        shipping: {
          name: input.name,
          line1: input.line1,
          line2: input.line2 || undefined,
          city: input.city,
          region: input.region,
          postalCode: input.postalCode,
          country: "US",
        },
        subtotalCents: subtotal,
        shippingCents: shipping,
        totalCents: subtotal + shipping,
      })
      .returning({ id: orders.id });
    await tx.insert(orderItems).values(
      items.map((i) => ({
        orderId: order.id,
        productId: i.product.id,
        name: i.product.name,
        option: i.option,
        unitPriceCents: i.unit,
        quantity: i.quantity,
      })),
    );
    // Demo orders do not take stock, so visitors trying the checkout never sell the shop out.
    // When real payments arrive, decrement products.stock here inside the same transaction.
  });

  // Lets this browser see its receipt without an account.
  (await cookies()).set("ff_order", reference, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/checkout",
  });
  redirect(`/checkout/${reference}`);
}
