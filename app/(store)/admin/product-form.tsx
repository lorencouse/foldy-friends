"use client";

import Link from "next/link";
import { useActionState, useTransition } from "react";
import { ProductArt } from "@/components/product-art";
import { deleteProduct, type ProductFormState, removePhoto, saveProduct } from "./actions";

export const ART_KEYS = [
  "paper-double",
  "paper-patterned",
  "paper-iridescent",
  "pen-roller",
  "pen-stick",
  "glitter-set",
  "glue-sticks",
  "glue-sticks-plain",
  "kit-elephant",
  "kit-raccoon",
  "kit-panda",
  "kit-fox",
];

type Initial = {
  id?: string;
  name: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  priceCents: number;
  salePriceCents: number | null;
  stock: number;
  sku: string | null;
  art: string;
  options: string[];
  tags: string[];
  images: string[];
};

const cents = (c: number | null) => (c == null ? "" : (c / 100).toFixed(2));

export function ProductForm({ initial }: { initial: Initial }) {
  const [state, action, pending] = useActionState<ProductFormState, FormData>(saveProduct, {});
  const [busy, startTransition] = useTransition();

  return (
    <form action={action} className="mt-10 grid gap-12 lg:grid-cols-[2fr_1fr]">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <Text name="name" label="Name" defaultValue={initial.name} wide />
        <Text
          name="slug"
          label="Web address"
          defaultValue={initial.slug}
          hint="Lowercase words joined by dashes, e.g. patterned-origami-paper."
        />
        <div>
          <label htmlFor="category" className="field-label">
            Category
          </label>
          <select id="category" name="category" defaultValue={initial.category} className="field">
            <option value="paper">Paper</option>
            <option value="tools">Tools</option>
            <option value="kits">Kits</option>
          </select>
        </div>
        <Text name="price" label="Price (USD)" defaultValue={cents(initial.priceCents)} inputMode="decimal" />
        <Text
          name="salePrice"
          label="Sale price (USD, optional)"
          defaultValue={cents(initial.salePriceCents)}
          inputMode="decimal"
          required={false}
        />
        <Text name="stock" label="In stock" type="number" min={0} defaultValue={String(initial.stock)} />
        <Text name="sku" label="SKU (optional)" defaultValue={initial.sku ?? ""} required={false} />
        <Text name="summary" label="One-line summary" defaultValue={initial.summary} required={false} wide />
        <div className="sm:col-span-2">
          <label htmlFor="description" className="field-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={8}
            defaultValue={initial.description}
            className="field"
            aria-describedby="description-hint"
          />
          <p id="description-hint" className="mt-1 text-small text-ink-soft">
            Leave a blank line between paragraphs.
          </p>
        </div>
        <Text
          name="options"
          label="Options (optional)"
          defaultValue={initial.options.join(", ")}
          required={false}
          hint="Comma-separated, e.g. Blue, Yellow, White."
        />
        <Text
          name="tags"
          label="Tags (optional)"
          defaultValue={initial.tags.join(", ")}
          required={false}
          hint="Comma-separated."
        />
      </div>

      <div className="space-y-8">
        <fieldset>
          <legend className="field-label">Drawing (used until there is a photo)</legend>
          <div className="grid grid-cols-4 gap-2">
            {ART_KEYS.map((key) => (
              <label key={key} className="cursor-pointer">
                <input
                  type="radio"
                  name="art"
                  value={key}
                  defaultChecked={initial.art === key}
                  className="peer sr-only"
                />
                <span className="block outline-offset-2 peer-checked:outline-3 peer-checked:outline-ink peer-focus-visible:outline-3 peer-focus-visible:outline-sky">
                  <ProductArt art={key} className="block w-full" />
                </span>
                <span className="sr-only">{key}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <p className="field-label">Photos</p>
          {initial.images.length > 0 && (
            <ul className="mb-4 grid grid-cols-3 gap-2">
              {initial.images.map((img) => (
                <li key={img} className="relative">
                  {/* biome-ignore lint/performance/noImgElement: uploaded files are served by /media */}
                  <img src={`/media/${img}`} alt="" className="aspect-square w-full object-cover" />
                  <button
                    type="button"
                    className="btn mt-1 min-h-9 w-full px-2 text-small"
                    disabled={busy}
                    onClick={() =>
                      initial.id && startTransition(() => removePhoto(initial.id as string, img))
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <label htmlFor="photos" className="sr-only">
            Add photos
          </label>
          <input
            id="photos"
            name="photos"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            aria-describedby="photos-hint"
            className="block w-full text-small file:mr-4 file:min-h-11 file:cursor-pointer file:bg-ink file:px-4 file:text-paper"
          />
          <p id="photos-hint" className="mt-1 text-small text-ink-soft">
            JPEG, PNG, WebP or AVIF, up to 5 MB each. The first photo leads.
          </p>
        </div>

        {state.error && (
          <p role="alert" className="text-danger">
            {state.error}
          </p>
        )}
        {state.saved && (
          <p role="status" className="sheet p-3">
            Saved.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Saving…" : initial.id ? "Save changes" : "Create product"}
          </button>
          <Link href="/admin" className="btn">
            Back to products
          </Link>
        </div>
        {initial.id && (
          <button
            type="button"
            className="text-small text-danger underline underline-offset-4"
            disabled={busy}
            onClick={() => {
              if (window.confirm(`Delete ${initial.name}? This cannot be undone.`)) {
                startTransition(() => deleteProduct(initial.id as string));
              }
            }}
          >
            Delete this product
          </button>
        )}
      </div>
    </form>
  );
}

function Text({
  name,
  label,
  hint,
  wide = false,
  required = true,
  ...rest
}: {
  name: string;
  label: string;
  hint?: string;
  wide?: boolean;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        aria-describedby={hint ? `${name}-hint` : undefined}
        className="field"
        {...rest}
      />
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-small text-ink-soft">
          {hint}
        </p>
      )}
    </div>
  );
}
