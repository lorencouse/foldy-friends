/** An order line in words, e.g. "2 × Fox asleep on the moon (Blue)". */
export function OrderLineLabel({
  quantity,
  name,
  option,
}: {
  quantity: number;
  name: string;
  option: string | null;
}) {
  return (
    <span>
      {quantity} × {name}
      {option ? ` (${option})` : ""}
    </span>
  );
}
