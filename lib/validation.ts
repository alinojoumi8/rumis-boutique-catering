export type ValidationResult = {
  ok: boolean;
  errors: Record<string, string>;
};

export function isEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function readString(value: FormDataEntryValue | null | unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(payload: Record<string, FormDataEntryValue | null>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!readString(payload.name)) {
    errors.name = "Please share your name.";
  }

  if (!isEmail(readString(payload.email))) {
    errors.email = "Please enter a valid email address.";
  }

  const guestCount = readString(payload.guestCount);
  if (guestCount && Number(guestCount) < 1) {
    errors.guestCount = "Guest count must be at least 1.";
  }

  if (!readString(payload.message)) {
    errors.message = "Please add a short note about your event.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}
