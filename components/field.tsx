import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

type FieldProps = {
  name: string;
  label: string;
  hint?: string;
  /** Span both columns of a two-column form. */
  wide?: boolean;
};

function FieldFrame({
  id,
  label,
  hint,
  wide,
  children,
}: Omit<FieldProps, "name"> & { id: string; children: ReactNode }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-small text-ink-soft">
          {hint}
        </p>
      )}
    </div>
  );
}

/** A labelled text input, required unless told otherwise. `id` defaults to `name`. */
export function Field({
  name,
  label,
  hint,
  wide,
  id = name,
  required = true,
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldFrame id={id} label={label} hint={hint} wide={wide}>
      <input
        id={id}
        name={name}
        required={required}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="field"
        {...rest}
      />
    </FieldFrame>
  );
}

/** The same as `Field`, for longer text. */
export function TextareaField({
  name,
  label,
  hint,
  wide,
  id = name,
  required = true,
  ...rest
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldFrame id={id} label={label} hint={hint} wide={wide}>
      <textarea
        id={id}
        name={name}
        required={required}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="field"
        {...rest}
      />
    </FieldFrame>
  );
}

/** A form's error message; renders nothing when there is none. */
export function FormError({ message, className = "" }: { message?: string | null; className?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className={`text-danger ${className}`}>
      {message}
    </p>
  );
}
