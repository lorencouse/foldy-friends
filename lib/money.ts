const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(cents: number) {
  return usd.format(cents / 100);
}

/** The price a buyer actually pays: the sale price when one is set and lower. */
export function effectivePrice(p: { priceCents: number; salePriceCents: number | null }) {
  return p.salePriceCents != null && p.salePriceCents < p.priceCents ? p.salePriceCents : p.priceCents;
}

export const FREE_SHIPPING_FROM_CENTS = 3500;
export const SHIPPING_CENTS = 495;

export function shippingFor(subtotalCents: number) {
  return subtotalCents === 0 || subtotalCents >= FREE_SHIPPING_FROM_CENTS ? 0 : SHIPPING_CENTS;
}
