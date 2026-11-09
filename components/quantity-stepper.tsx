import { MAX_LINE_QUANTITY } from "@/lib/money";

/**
 * Minus and plus buttons around a quantity. `min` is 1 by default; the cart
 * uses 0, where stepping down removes the line. `itemName` tells screen readers
 * which product a stepper belongs to when a page has several.
 */
export function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  itemName,
  compact = false,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  itemName?: string;
  compact?: boolean;
}) {
  const suffix = itemName ? ` ${itemName}` : "";
  return (
    <fieldset className="stepper">
      <legend className="sr-only">{itemName ? `Quantity of ${itemName}` : "Quantity"}</legend>
      <button
        type="button"
        className="step"
        aria-label={`One fewer${suffix}`}
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= min}
      >
        −
      </button>
      <output
        aria-live="polite"
        className={`text-center font-display font-extrabold ${compact ? "min-w-8 text-lg" : "min-w-9 text-xl"}`}
      >
        {quantity}
      </output>
      <button
        type="button"
        className="step"
        aria-label={`One more${suffix}`}
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= MAX_LINE_QUANTITY}
      >
        +
      </button>
    </fieldset>
  );
}
