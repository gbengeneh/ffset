"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type FieldShellProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
};

function FieldShell({ label, htmlFor, hint, children }: FieldShellProps) {
  return (
    <label className="block space-y-2" htmlFor={htmlFor}>
      <span className="form-label">{label}</span>
      {children}
      {hint ? <span className="block text-xs leading-6 text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}

type TextFieldProps = {
  label: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, hint, id, ...props }: TextFieldProps) {
  const fieldId = id ?? String(props.name ?? label).toLowerCase().replace(/\s+/g, "-");

  return (
    <FieldShell label={label} htmlFor={fieldId} hint={hint}>
      <input id={fieldId} className="form-input" {...props} />
    </FieldShell>
  );
}

type TextAreaFieldProps = {
  label: string;
  hint?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ label, hint, id, ...props }: TextAreaFieldProps) {
  const fieldId = id ?? String(props.name ?? label).toLowerCase().replace(/\s+/g, "-");

  return (
    <FieldShell label={label} htmlFor={fieldId} hint={hint}>
      <textarea id={fieldId} className="form-input" {...props} />
    </FieldShell>
  );
}

type SelectFieldProps = {
  label: string;
  hint?: string;
  options: Array<{ label: string; value: string }>;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({
  label,
  hint,
  id,
  options,
  ...props
}: SelectFieldProps) {
  const fieldId = id ?? String(props.name ?? label).toLowerCase().replace(/\s+/g, "-");

  return (
    <FieldShell label={label} htmlFor={fieldId} hint={hint}>
      <select id={fieldId} className="form-input" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.value === ""}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
