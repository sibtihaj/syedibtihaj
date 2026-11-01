"use client";

import React, { useId, useState } from "react";
import { cn } from "@/lib/utils";

const TO = "syedibtihaj12@gmail.com";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Add your name so I know who to reply to.";
  if (!values.email.trim()) errors.email = "Add an email address for the reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "That email address looks incomplete.";
  if (!values.message.trim()) errors.message = "Write a line or two about what you have in mind.";
  return errors;
}

const inputClass =
  "w-full rounded-xl border bg-white/80 px-4 text-base text-ink placeholder:text-ink-muted/80 transition-colors focus:border-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt/20";

/**
 * Contact form with no backend: it validates, then opens the visitor's own
 * email app with the message filled in. Nothing is stored on this site.
 */
export const Contact = () => {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const id = useId();

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
    setSent(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      return;
    }
    const subject = `Hello from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const fieldProps = (field: Field) => ({
    id: `${id}-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
  });

  const ErrorText = ({ field }: { field: Field }) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="mt-2 text-sm text-destructive">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor={`${id}-name`} className="mb-2 block text-[0.95rem] text-ink">
          Your name
        </label>
        <input
          type="text"
          autoComplete="name"
          className={cn(inputClass, "h-12", errors.name ? "border-destructive" : "border-ink/15")}
          {...fieldProps("name")}
        />
        <ErrorText field="name" />
      </div>

      <div>
        <label htmlFor={`${id}-email`} className="mb-2 block text-[0.95rem] text-ink">
          Email for the reply
        </label>
        <input
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className={cn(inputClass, "h-12", errors.email ? "border-destructive" : "border-ink/15")}
          {...fieldProps("email")}
        />
        <ErrorText field="email" />
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-2 block text-[0.95rem] text-ink">
          Message
        </label>
        <textarea
          rows={6}
          className={cn(inputClass, "resize-y py-3", errors.message ? "border-destructive" : "border-ink/15")}
          {...fieldProps("message")}
        />
        <ErrorText field="message" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-6 text-[0.95rem] text-paper shadow-[0_10px_30px_-14px_rgba(11,42,111,0.7)] transition-colors hover:bg-cobalt-deep"
        >
          Open in my email app
        </button>
        <p className="text-sm text-ink-muted">Nothing is stored on this site.</p>
      </div>

      <p role="status" aria-live="polite" className="text-sm text-ink-body">
        {sent ? (
          <>
            Your email app should now be open with the message filled in. If nothing happened, write to{" "}
            <a href={`mailto:${TO}`} className="ink-link">
              {TO}
            </a>{" "}
            directly.
          </>
        ) : null}
      </p>
    </form>
  );
};
