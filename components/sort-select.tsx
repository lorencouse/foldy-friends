"use client";

import Form from "next/form";
import { SORTS, type Sort } from "@/lib/sort";

/** Sort order as a GET form, so it works before scripts load; it submits on change. */
export function SortSelect({ action, value }: { action: string; value: Sort }) {
  return (
    <Form action={action} className="flex items-center gap-2.5">
      <label htmlFor="sort" className="text-base font-extrabold">
        Sort
      </label>
      <select
        id="sort"
        name="sort"
        defaultValue={value}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="min-h-11 rounded-xl border-2 border-ink bg-card px-3.5 text-base font-bold"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <noscript>
        <button type="submit" className="btn btn-sm">
          Sort
        </button>
      </noscript>
    </Form>
  );
}
