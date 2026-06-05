"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  eventType: string;
  message: string;
  company: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  guestCount: "",
  eventType: "High Tea",
  message: "",
  company: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const inlineErrors = useMemo(() => {
    const next: Record<string, string> = {};
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Use a valid email address.";
    }
    if (form.guestCount && Number(form.guestCount) < 1) {
      next.guestCount = "Guest count must be at least 1.";
    }
    return next;
  }, [form.email, form.guestCount]);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const copy = { ...current };
      delete copy[field];
      return copy;
    });
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const clientErrors: Record<string, string> = { ...inlineErrors };
    if (!form.name.trim()) clientErrors.name = "Please share your name.";
    if (!form.email.trim()) clientErrors.email = "Email is required.";
    if (!form.message.trim()) clientErrors.message = "Please add a short note about your event.";

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") {
      setStatus("success");
      setServerMessage("Preview request received. Connect an email provider on Vercel or Netlify to send live quote requests.");
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (file) payload.append("attachment", file);

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload
      });
      const result = (await response.json()) as { ok: boolean; errors?: Record<string, string>; message?: string };
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setServerMessage(result.message ?? "Please check the form and try again.");
        setStatus("idle");
        return;
      }
      setStatus("success");
      setServerMessage(result.message ?? "Thank you. Rumi's will follow up with you soon.");
    } catch {
      setStatus("idle");
      setServerMessage("Something went wrong. Please try again or email info@rumiscatering.ca.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[8px] border border-gold/20 bg-porcelain p-5 shadow-petal md:p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid min-h-[520px] place-items-center text-center"
          >
            <div>
              <CheckCircle2 className="mx-auto size-14 text-mulberry" />
              <h2 className="mt-5 font-serif text-4xl font-semibold">Request received</h2>
              <p className="mx-auto mt-3 max-w-md text-plum/68">{serverMessage}</p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setServerMessage("");
                }}
                className="mt-8 rounded-full border border-gold/30 px-6 py-3 text-sm font-extrabold text-plum hover:bg-lilac/45"
              >
                Send another request
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  data-testid="contact-name"
                  className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3 text-plum"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" error={errors.email || inlineErrors.email} required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  data-testid="contact-email"
                  className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3 text-plum"
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3 text-plum"
                  autoComplete="tel"
                />
              </Field>
              <Field label="Event date">
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={(event) => update("eventDate", event.target.value)}
                  className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3 text-plum"
                />
              </Field>
              <Field label="Estimated guest count" error={errors.guestCount || inlineErrors.guestCount}>
                <input
                  type="number"
                  min={1}
                  value={form.guestCount}
                  onChange={(event) => update("guestCount", event.target.value)}
                  className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3 text-plum"
                />
              </Field>
              <Field label="Event type">
                <select
                  value={form.eventType}
                  onChange={(event) => update("eventType", event.target.value)}
                  className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3 text-plum"
                >
                  <option>High Tea</option>
                  <option>Cocktail</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>

            <Field label="Message" error={errors.message} required className="mt-5">
              <textarea
                value={form.message}
                onChange={(event) => update("message", event.target.value)}
                data-testid="contact-message"
                rows={6}
                className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3 text-plum"
              />
            </Field>

            <label className="mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-[8px] border border-dashed border-gold/40 bg-lilac/20 px-4 py-4 text-sm font-bold text-plum transition hover:bg-lilac/35">
              <span className="flex items-center gap-3">
                <Upload className="size-4" />
                {file ? file.name : "Optional attachment"}
              </span>
              <span className="text-plum/52">PDF, image, or menu notes</span>
              <input
                type="file"
                className="sr-only"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
            </label>

            <input
              value={form.company}
              onChange={(event) => update("company", event.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              name="company"
            />

            {serverMessage ? <p className="mt-4 text-sm font-bold text-rose">{serverMessage}</p> : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              data-testid="contact-submit"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-plum px-7 py-4 text-sm font-extrabold text-white shadow-float transition hover:bg-mulberry disabled:cursor-wait disabled:opacity-70"
            >
              {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : null}
              Request a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  required,
  className = ""
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-extrabold text-plum/72">
        {label}
        {required ? <span className="text-rose"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-2 block text-sm font-bold text-rose">{error}</span> : null}
    </label>
  );
}
