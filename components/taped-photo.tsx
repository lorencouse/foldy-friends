import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A photo print on a white card, held down with strips of washi tape. Position,
 * width, rotation, padding and shadow come from `className`, which must set
 * `relative` or `absolute`. Stickers and other overlays go in `children`.
 */
export function TapedPhoto({
  src,
  alt,
  sizes,
  priority,
  aspect,
  imageClassName = "",
  objectPosition,
  caption,
  tapes,
  className,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Sizes the picture: an aspect class, or `flex-1` inside a flex figure. */
  aspect: string;
  imageClassName?: string;
  objectPosition?: string;
  caption?: string;
  tapes: { color: string; className: string }[];
  className: string;
  children?: ReactNode;
}) {
  return (
    <figure className={`m-0 rounded-[10px] bg-card ${className}`}>
      <div className={`relative overflow-hidden rounded-md ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-3 text-center font-display text-lg leading-none font-bold text-ink-soft">
          {caption}
        </figcaption>
      )}
      {tapes.map((tape) => (
        <span
          key={tape.className}
          className={`tape tape-strip ${tape.className}`}
          style={{ backgroundColor: tape.color }}
        />
      ))}
      {children}
    </figure>
  );
}
