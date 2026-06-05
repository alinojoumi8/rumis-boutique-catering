"use client";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import TeaScene from "@/components/3d/LazyTeaScene";
import { otherServices, packages, pricing, teas, type PackageId } from "@/data/site";
import { calculateEventEstimate, formatCurrency } from "@/lib/estimate";

const steps = ["Package", "Menu", "Teas", "Guests", "Estimate"] as const;

type BookingContact = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
  company: string;
};

const initialContact: BookingContact = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  message: "",
  company: ""
};

export default function EventBuilder() {
  const [step, setStep] = useState(0);
  const [packageId, setPackageId] = useState<PackageId>("high-tea");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedTeas, setSelectedTeas] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState<number>(pricing.minimumGuests);
  const [servingStaffEnabled, setServingStaffEnabled] = useState(false);
  const [servingStaffCount, setServingStaffCount] = useState(1);
  const [servingStaffHours, setServingStaffHours] = useState<number>(pricing.servingStaffMinimumHours);
  const [bartenderEnabled, setBartenderEnabled] = useState(false);
  const [bartenderHours, setBartenderHours] = useState<number>(pricing.bartenderMinimumHours);
  const [extras, setExtras] = useState<string[]>([]);
  const [contact, setContact] = useState(initialContact);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [teaWarning, setTeaWarning] = useState("");

  const selectedPackage = packages.find((item) => item.id === packageId) ?? packages[0];
  const allPackageItems = useMemo(
    () => [
      ...selectedPackage.savouries.map((name) => ({ name, category: "Savoury" })),
      ...selectedPackage.sweets.map((name) => ({ name, category: "Sweet" }))
    ],
    [selectedPackage]
  );

  const estimate = useMemo(
    () =>
      calculateEventEstimate({
        guests: guestCount,
        servingStaff: {
          enabled: servingStaffEnabled,
          count: servingStaffCount,
          hours: servingStaffHours
        },
        bartender: {
          enabled: bartenderEnabled,
          hours: bartenderHours
        }
      }),
    [bartenderEnabled, bartenderHours, guestCount, servingStaffCount, servingStaffEnabled, servingStaffHours]
  );

  function choosePackage(nextPackageId: PackageId) {
    setPackageId(nextPackageId);
    setSelectedItems([]);
  }

  function toggleItem(itemName: string) {
    setSelectedItems((current) =>
      current.includes(itemName) ? current.filter((item) => item !== itemName) : [...current, itemName]
    );
  }

  function toggleTea(teaId: string) {
    setTeaWarning("");
    setSelectedTeas((current) => {
      if (current.includes(teaId)) {
        return current.filter((item) => item !== teaId);
      }
      if (current.length >= 3) {
        setTeaWarning("Please deselect one tea before adding another.");
        return current;
      }
      return [...current, teaId];
    });
  }

  function toggleExtra(extra: string) {
    setExtras((current) => (current.includes(extra) ? current.filter((item) => item !== extra) : [...current, extra]));
  }

  function canContinue() {
    if (step === 2) return selectedTeas.length === 3;
    if (step === 3) return guestCount >= pricing.minimumGuests;
    return true;
  }

  function nextStep() {
    if (!canContinue()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function updateContact(field: keyof BookingContact, value: string) {
    setContact((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const copy = { ...current };
      delete copy[field];
      return copy;
    });
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");
    const nextErrors: Record<string, string> = {};
    if (!contact.name.trim()) nextErrors.name = "Please share your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) nextErrors.email = "Please enter a valid email.";
    if (selectedTeas.length !== 3) nextErrors.teas = "Choose exactly three teas.";
    if (guestCount < pricing.minimumGuests) nextErrors.guestCount = `Minimum ${pricing.minimumGuests} guests.`;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true") {
      setStatus("success");
      setServerMessage(
        "Preview booking request received. Connect an email provider on Vercel or Netlify to send live booking requests."
      );
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          selectedItems,
          selectedTeas,
          guests: guestCount,
          servingStaff: {
            enabled: servingStaffEnabled,
            count: servingStaffCount,
            hours: servingStaffHours
          },
          bartender: {
            enabled: bartenderEnabled,
            hours: bartenderHours
          },
          extras,
          contact,
          estimate
        })
      });
      const result = (await response.json()) as { ok: boolean; message?: string; errors?: Record<string, string> };
      if (!response.ok || !result.ok) {
        setStatus("idle");
        setErrors(result.errors ?? {});
        setServerMessage(result.message ?? "Please review your request and try again.");
        return;
      }
      setStatus("success");
      setServerMessage(result.message ?? "Your booking request has been received.");
    } catch {
      setStatus("idle");
      setServerMessage("Something went wrong. Please try again or email info@rumiscatering.ca.");
    }
  }

  const selectedTeaNames = selectedTeas
    .map((teaId) => teas.find((tea) => tea.id === teaId)?.name)
    .filter(Boolean)
    .join(", ");

  if (status === "success") {
    return (
      <div className="overflow-hidden rounded-[8px] border border-gold/20 bg-porcelain p-8 text-center shadow-petal md:p-12">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-lilac text-mulberry">
          <Check className="size-8" />
        </div>
        <h2 className="mt-6 font-serif text-5xl font-semibold">Booking request received</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-plum/68">{serverMessage}</p>
        <div className="mx-auto mt-8 max-w-xl rounded-[8px] border border-gold/20 bg-white p-5 text-left">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-mulberry">Estimated total</p>
          <p className="mt-2 font-serif text-4xl font-semibold">{formatCurrency(estimate.total)}</p>
          <p className="mt-2 text-sm text-plum/60">Final quote confirmed by Rumi's.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">
      <div className="rounded-[8px] border border-gold/20 bg-porcelain p-4 shadow-petal md:p-7">
        <Progress step={step} setStep={setStep} />
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-h-[560px] pt-8"
          >
            {step === 0 ? (
              <PackageStep packageId={packageId} choosePackage={choosePackage} />
            ) : step === 1 ? (
              <MenuStep items={allPackageItems} packageId={packageId} selectedItems={selectedItems} toggleItem={toggleItem} />
            ) : step === 2 ? (
              <TeaStep selectedTeas={selectedTeas} toggleTea={toggleTea} warning={teaWarning || errors.teas} />
            ) : step === 3 ? (
              <GuestStep
                guestCount={guestCount}
                setGuestCount={setGuestCount}
                servingStaffEnabled={servingStaffEnabled}
                setServingStaffEnabled={setServingStaffEnabled}
                servingStaffCount={servingStaffCount}
                setServingStaffCount={setServingStaffCount}
                servingStaffHours={servingStaffHours}
                setServingStaffHours={setServingStaffHours}
                bartenderEnabled={bartenderEnabled}
                setBartenderEnabled={setBartenderEnabled}
                bartenderHours={bartenderHours}
                setBartenderHours={setBartenderHours}
                extras={extras}
                toggleExtra={toggleExtra}
                error={errors.guestCount}
              />
            ) : (
              <EstimateStep
                contact={contact}
                updateContact={updateContact}
                errors={errors}
                submitBooking={submitBooking}
                status={status}
                serverMessage={serverMessage}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-col gap-3 border-t border-gold/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={previousStep}
            disabled={step === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 px-5 py-3 text-sm font-extrabold text-plum transition hover:bg-lilac/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
          {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canContinue()}
            data-testid="event-builder-continue"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-extrabold text-white shadow-float transition hover:bg-mulberry disabled:cursor-not-allowed disabled:opacity-45"
          >
              Continue
              <ChevronRight className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <EstimatePanel
        selectedPackage={selectedPackage.name}
        selectedItems={selectedItems}
        selectedTeaNames={selectedTeaNames}
        guestCount={guestCount}
        estimate={estimate}
        servingStaffEnabled={servingStaffEnabled}
        bartenderEnabled={bartenderEnabled}
        extras={extras}
      />
    </div>
  );
}

function Progress({ step, setStep }: { step: number; setStep: (step: number) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-5" aria-label="Event builder progress">
      {steps.map((label, index) => {
        const active = index === step;
        const complete = index < step;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`rounded-[8px] border px-3 py-3 text-left transition ${
              active
                ? "border-mulberry bg-lilac/55 text-plum"
                : complete
                  ? "border-gold/35 bg-white text-plum/70"
                  : "border-gold/20 bg-white/70 text-plum/50"
            }`}
          >
            <span className="block text-xs font-extrabold uppercase tracking-[0.14em]">Step {index + 1}</span>
            <span className="mt-1 block text-sm font-extrabold">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PackageStep({
  packageId,
  choosePackage
}: {
  packageId: PackageId;
  choosePackage: (nextPackageId: PackageId) => void;
}) {
  return (
    <div>
      <h2 className="font-serif text-4xl font-semibold md:text-5xl">Choose a package</h2>
      <p className="mt-3 max-w-2xl text-plum/66">
        Both signature formats are custom quoted at {formatCurrency(pricing.perPerson)} per person with a minimum of{" "}
        {pricing.minimumGuests} guests.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {packages.map((eventPackage) => {
          const active = packageId === eventPackage.id;
          return (
            <button
              key={eventPackage.id}
              type="button"
              onClick={() => choosePackage(eventPackage.id)}
              aria-pressed={active}
              data-testid={`package-${eventPackage.id}`}
              className={`group overflow-hidden rounded-[8px] border bg-white text-left transition hover:-translate-y-1 hover:shadow-float ${
                active ? "border-mulberry ring-2 ring-lilac" : "border-gold/20"
              }`}
            >
              <div className="relative h-64">
                <Image
                  src={eventPackage.id === "high-tea" ? "/images/high-tea-detail.png" : "/images/cocktail-canapes.png"}
                  alt={`${eventPackage.name} placeholder catering image`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-3xl font-semibold">{eventPackage.name}</h3>
                  {active ? <Check className="mt-2 size-5 text-mulberry" /> : null}
                </div>
                <p className="mt-3 text-plum/66">{eventPackage.shortDescription}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MenuStep({
  items,
  packageId,
  selectedItems,
  toggleItem
}: {
  items: { name: string; category: string }[];
  packageId: PackageId;
  selectedItems: string[];
  toggleItem: (itemName: string) => void;
}) {
  return (
    <div>
      <h2 className="font-serif text-4xl font-semibold md:text-5xl">Select menu favorites</h2>
      <p className="mt-3 max-w-2xl text-plum/66">
        These choices help Rumi's shape your quote. Items are informational and not priced individually.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const active = selectedItems.includes(item.name);
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => toggleItem(item.name)}
              aria-pressed={active}
              className={`group overflow-hidden rounded-[8px] border bg-white text-left transition hover:-translate-y-1 hover:shadow-float ${
                active ? "border-mulberry ring-2 ring-lilac" : "border-gold/20"
              }`}
            >
              <div className="relative h-28">
                <Image
                  src={packageId === "high-tea" ? "/images/high-tea-detail.png" : "/images/cocktail-canapes.png"}
                  alt={`${item.name} placeholder image`}
                  fill
                  sizes="(min-width: 1280px) 25vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectPosition: `${40 + (index % 4) * 8}% center` }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-mulberry/70">{item.category}</span>
                  {active ? <Check className="size-4 text-mulberry" /> : null}
                </div>
                <p className="mt-2 font-bold text-plum">{item.name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TeaStep({
  selectedTeas,
  toggleTea,
  warning
}: {
  selectedTeas: string[];
  toggleTea: (teaId: string) => void;
  warning?: string;
}) {
  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">Choose exactly three teas</h2>
          <p className="mt-3 max-w-2xl text-plum/66">
            A Certified Tea Sommelier pairs teas to the food menu, giving the service a signature Rumi's touch.
          </p>
        </div>
        <div className="rounded-full border border-gold/25 bg-white px-5 py-3 text-sm font-extrabold text-plum">
          {selectedTeas.length}/3 selected
        </div>
      </div>
      {warning ? <p className="mt-4 rounded-[8px] bg-rose/10 p-3 text-sm font-bold text-rose">{warning}</p> : null}
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teas.map((tea) => {
          const active = selectedTeas.includes(tea.id);
          return (
            <button
              key={tea.id}
              type="button"
              onClick={() => toggleTea(tea.id)}
              aria-pressed={active}
              data-testid={`tea-${tea.id}`}
              className={`min-h-44 rounded-[8px] border bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-float ${
                active ? "border-mulberry ring-2 ring-lilac" : "border-gold/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-3xl font-semibold">{tea.name}</h3>
                  {tea.note ? <p className="mt-1 text-sm font-bold text-mulberry">"{tea.note}"</p> : null}
                </div>
                {active ? <Check className="size-5 text-mulberry" /> : null}
              </div>
              {tea.description ? <p className="mt-4 text-sm leading-6 text-plum/66">{tea.description}</p> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GuestStep(props: {
  guestCount: number;
  setGuestCount: (count: number) => void;
  servingStaffEnabled: boolean;
  setServingStaffEnabled: (enabled: boolean) => void;
  servingStaffCount: number;
  setServingStaffCount: (count: number) => void;
  servingStaffHours: number;
  setServingStaffHours: (hours: number) => void;
  bartenderEnabled: boolean;
  setBartenderEnabled: (enabled: boolean) => void;
  bartenderHours: number;
  setBartenderHours: (hours: number) => void;
  extras: string[];
  toggleExtra: (extra: string) => void;
  error?: string;
}) {
  return (
    <div>
      <h2 className="font-serif text-4xl font-semibold md:text-5xl">Guest count & staffing</h2>
      <p className="mt-3 max-w-2xl text-plum/66">
        Rumi's custom catering starts at {pricing.minimumGuests} guests. Staffing add-ons are estimated here and confirmed in
        the final quote.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="rounded-[8px] border border-gold/20 bg-white p-5">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-mulberry">Guest count</span>
          <input
            type="number"
            min={pricing.minimumGuests}
            value={props.guestCount}
            onChange={(event) => props.setGuestCount(Number(event.target.value))}
            data-testid="guest-count"
            className="mt-4 w-full rounded-[8px] border border-gold/25 px-4 py-3 text-2xl font-extrabold text-plum"
          />
          {props.guestCount < pricing.minimumGuests || props.error ? (
            <span className="mt-3 block text-sm font-bold text-rose">
              {props.error ?? `Minimum ${pricing.minimumGuests} guests for both packages.`}
            </span>
          ) : null}
        </label>

        <div className="rounded-[8px] border border-gold/20 bg-white p-5">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={props.servingStaffEnabled}
              onChange={(event) => props.setServingStaffEnabled(event.target.checked)}
              className="mt-1 size-5 accent-mulberry"
            />
            <span>
              <span className="block font-serif text-3xl font-semibold">Serving staff</span>
              <span className="text-sm text-plum/62">
                {formatCurrency(pricing.servingStaffHourly)}/hr per person, min {pricing.servingStaffMinimumHours} hrs
              </span>
            </span>
          </label>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Staff"
              value={props.servingStaffCount}
              min={1}
              disabled={!props.servingStaffEnabled}
              onChange={props.setServingStaffCount}
            />
            <NumberField
              label="Hours"
              value={props.servingStaffHours}
              min={pricing.servingStaffMinimumHours}
              disabled={!props.servingStaffEnabled}
              onChange={props.setServingStaffHours}
            />
          </div>
        </div>

        <div className="rounded-[8px] border border-gold/20 bg-white p-5">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={props.bartenderEnabled}
              onChange={(event) => props.setBartenderEnabled(event.target.checked)}
              className="mt-1 size-5 accent-mulberry"
            />
            <span>
              <span className="block font-serif text-3xl font-semibold">Bartender</span>
              <span className="text-sm text-plum/62">
                {formatCurrency(pricing.bartenderHourly)}/hr, min {pricing.bartenderMinimumHours} hrs
              </span>
            </span>
          </label>
          <div className="mt-5">
            <NumberField
              label="Hours"
              value={props.bartenderHours}
              min={pricing.bartenderMinimumHours}
              disabled={!props.bartenderEnabled}
              onChange={props.setBartenderHours}
            />
          </div>
        </div>

        <div className="rounded-[8px] border border-gold/20 bg-white p-5">
          <p className="font-serif text-3xl font-semibold">Optional extras</p>
          <div className="mt-4 grid gap-3">
            {otherServices.slice(0, 3).map((extra) => (
              <label key={extra} className="flex items-center gap-3 text-sm font-bold text-plum/76">
                <input
                  type="checkbox"
                  checked={props.extras.includes(extra)}
                  onChange={() => props.toggleExtra(extra)}
                  className="size-5 accent-mulberry"
                />
                <span>{extra}</span>
                <span className="ml-auto rounded-full bg-lilac/45 px-3 py-1 text-xs text-mulberry">ask about pricing</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  disabled,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-extrabold text-plum/64">{label}</span>
      <input
        type="number"
        min={min}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Math.max(min, Number(event.target.value)))}
        className="w-full rounded-[8px] border border-gold/25 bg-porcelain px-4 py-3 font-extrabold text-plum disabled:opacity-45"
      />
    </label>
  );
}

function EstimateStep({
  contact,
  updateContact,
  errors,
  submitBooking,
  status,
  serverMessage
}: {
  contact: BookingContact;
  updateContact: (field: keyof BookingContact, value: string) => void;
  errors: Record<string, string>;
  submitBooking: (event: FormEvent<HTMLFormElement>) => void;
  status: "idle" | "submitting" | "success";
  serverMessage: string;
}) {
  return (
    <form onSubmit={submitBooking}>
      <h2 className="font-serif text-4xl font-semibold md:text-5xl">Send the booking request</h2>
      <p className="mt-3 max-w-2xl text-plum/66">
        The estimate is live, but the final quote is confirmed by Rumi's after reviewing the menu, timing, delivery, and
        staffing details.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <FormField label="Name" error={errors.name}>
          <input
            value={contact.name}
            onChange={(event) => updateContact("name", event.target.value)}
            data-testid="booking-name"
            className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3"
            autoComplete="name"
          />
        </FormField>
        <FormField label="Email" error={errors.email} required>
          <input
            type="email"
            value={contact.email}
            onChange={(event) => updateContact("email", event.target.value)}
            data-testid="booking-email"
            className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3"
            autoComplete="email"
          />
        </FormField>
        <FormField label="Phone">
          <input
            type="tel"
            value={contact.phone}
            onChange={(event) => updateContact("phone", event.target.value)}
            className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3"
            autoComplete="tel"
          />
        </FormField>
        <FormField label="Event date">
          <input
            type="date"
            value={contact.eventDate}
            onChange={(event) => updateContact("eventDate", event.target.value)}
            className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3"
          />
        </FormField>
      </div>
      <FormField label="Message" className="mt-5">
        <textarea
          value={contact.message}
          onChange={(event) => updateContact("message", event.target.value)}
          rows={5}
          className="w-full rounded-[8px] border border-gold/25 bg-white px-4 py-3"
        />
      </FormField>
      <input
        value={contact.company}
        onChange={(event) => updateContact("company", event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {serverMessage ? <p className="mt-4 text-sm font-bold text-rose">{serverMessage}</p> : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        data-testid="booking-submit"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-plum px-7 py-4 text-sm font-extrabold text-white shadow-float transition hover:bg-mulberry disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
        Submit Booking Request
      </button>
    </form>
  );
}

function FormField({
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

function EstimatePanel(props: {
  selectedPackage: string;
  selectedItems: string[];
  selectedTeaNames: string;
  guestCount: number;
  estimate: ReturnType<typeof calculateEventEstimate>;
  servingStaffEnabled: boolean;
  bartenderEnabled: boolean;
  extras: string[];
}) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="overflow-hidden rounded-[8px] border border-gold/20 bg-plum text-white shadow-petal">
        <div className="relative h-48 bg-[#4a2847]">
          <TeaScene className="absolute inset-0" />
        </div>
        <div className="p-6">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lilac">Live estimate</p>
          <p className="mt-3 font-serif text-5xl font-semibold">
            <span data-testid="estimate-total">
              <AnimatedCurrency value={props.estimate.total} />
            </span>
          </p>
          <p className="mt-3 text-sm text-white/68">Estimate only. Final quote confirmed by Rumi's.</p>

          <div className="mt-6 grid gap-3 text-sm text-white/78">
            <SummaryRow label="Package" value={props.selectedPackage} />
            <SummaryRow label="Guests" value={`${Math.max(props.guestCount, pricing.minimumGuests)} billable`} />
            <SummaryRow label="Food" value={formatCurrency(props.estimate.base)} />
            {props.servingStaffEnabled ? <SummaryRow label="Serving staff" value={formatCurrency(props.estimate.servingStaff)} /> : null}
            {props.bartenderEnabled ? <SummaryRow label="Bartender" value={formatCurrency(props.estimate.bartender)} /> : null}
          </div>

          <div className="mt-6 border-t border-white/12 pt-5">
            <p className="text-sm font-extrabold text-lilac">Selections</p>
            <p className="mt-2 text-sm text-white/68">
              {props.selectedItems.length ? `${props.selectedItems.length} menu favorites selected` : "No menu favorites selected yet"}
            </p>
            <p className="mt-2 text-sm text-white/68">{props.selectedTeaNames || "Choose three teas"}</p>
            {props.extras.length ? (
              <p className="mt-2 text-sm text-white/68">Extras: {props.extras.join(", ")} (ask about pricing)</p>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="font-extrabold text-white">{value}</span>
    </div>
  );
}

function AnimatedCurrency({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduced) {
      motionValue.set(value);
      setDisplay(value);
      return;
    }

    const unsubscribe = motionValue.on("change", (latest) => setDisplay(latest));
    const controls = animate(motionValue, value, { duration: 0.65, ease: "easeOut" });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [motionValue, reduced, value]);

  return <>{formatCurrency(Math.round(display))}</>;
}
