export function Star({ filled, size = 32 }: { filled: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <polygon
        points="12,2 15,9 22,9.5 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9.5 9,9"
        fill={filled ? "#f6b93b" : "#d6ccb8"}
      />
    </svg>
  );
}

/** Five small stars, filled up to `rating`. Without a `label`, screen readers skip it. */
export function StarRow({ rating, label }: { rating: number; label?: string }) {
  return (
    <span className="flex" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rating} size={18} />
      ))}
    </span>
  );
}
