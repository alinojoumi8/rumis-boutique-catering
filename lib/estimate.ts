import { pricing } from "@/data/site";

export type StaffingInput = {
  enabled: boolean;
  count?: number;
  hours?: number;
};

export type BartenderInput = {
  enabled: boolean;
  hours?: number;
};

export type EstimateInput = {
  guests: number;
  servingStaff: StaffingInput;
  bartender: BartenderInput;
};

export type Estimate = {
  billableGuests: number;
  base: number;
  servingStaff: number;
  bartender: number;
  total: number;
};

export function clampGuestCount(guests: number) {
  return Math.max(pricing.minimumGuests, Number.isFinite(guests) ? Math.floor(guests) : pricing.minimumGuests);
}

export function calculateEventEstimate(input: EstimateInput): Estimate {
  const billableGuests = clampGuestCount(input.guests);
  const base = billableGuests * pricing.perPerson;

  const staffCount = Math.max(1, Math.floor(input.servingStaff.count ?? 1));
  const staffHours = Math.max(pricing.servingStaffMinimumHours, Math.floor(input.servingStaff.hours ?? 4));
  const servingStaff = input.servingStaff.enabled
    ? staffCount * staffHours * pricing.servingStaffHourly
    : 0;

  const bartenderHours = Math.max(pricing.bartenderMinimumHours, Math.floor(input.bartender.hours ?? 4));
  const bartender = input.bartender.enabled ? bartenderHours * pricing.bartenderHourly : 0;

  return {
    billableGuests,
    base,
    servingStaff,
    bartender,
    total: base + servingStaff + bartender
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(value);
}
