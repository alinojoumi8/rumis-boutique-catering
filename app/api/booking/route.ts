import { NextResponse } from "next/server";
import { packages, pricing, site, teas, type PackageId } from "@/data/site";
import { calculateEventEstimate } from "@/lib/estimate";
import { isEmail } from "@/lib/validation";

export const runtime = "nodejs";

type BookingPayload = {
  packageId?: PackageId;
  selectedItems?: string[];
  selectedTeas?: string[];
  guests?: number;
  servingStaff?: {
    enabled?: boolean;
    count?: number;
    hours?: number;
  };
  bartender?: {
    enabled?: boolean;
    hours?: number;
  };
  extras?: string[];
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    eventDate?: string;
    message?: string;
    company?: string;
  };
};

export async function POST(request: Request) {
  let payload: BookingPayload;
  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid booking request." }, { status: 400 });
  }

  if (payload.contact?.company) {
    return NextResponse.json({ ok: true, message: "Your booking request has been received." });
  }

  const errors: Record<string, string> = {};
  const selectedPackage = packages.find((item) => item.id === payload.packageId);
  if (!selectedPackage) {
    errors.packageId = "Please choose a package.";
  }

  const validTeaIds = new Set(teas.map((tea) => tea.id));
  const selectedTeas = Array.isArray(payload.selectedTeas)
    ? payload.selectedTeas.filter((teaId) => validTeaIds.has(teaId))
    : [];
  if (selectedTeas.length !== 3) {
    errors.teas = "Choose exactly three teas.";
  }

  const guests = Number(payload.guests);
  if (!Number.isFinite(guests) || guests < pricing.minimumGuests) {
    errors.guestCount = `Minimum ${pricing.minimumGuests} guests.`;
  }

  if (!payload.contact?.name?.trim()) {
    errors.name = "Please share your name.";
  }

  if (!isEmail(payload.contact?.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, message: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const estimate = calculateEventEstimate({
    guests,
    servingStaff: {
      enabled: Boolean(payload.servingStaff?.enabled),
      count: Number(payload.servingStaff?.count ?? 1),
      hours: Number(payload.servingStaff?.hours ?? pricing.servingStaffMinimumHours)
    },
    bartender: {
      enabled: Boolean(payload.bartender?.enabled),
      hours: Number(payload.bartender?.hours ?? pricing.bartenderMinimumHours)
    }
  });

  await sendBookingEmail({
    to: site.email,
    subject: `Booking request: ${selectedPackage?.name}`,
    estimate
  });

  return NextResponse.json({
    ok: true,
    estimate,
    message: "Your booking request has been received. Rumi's will confirm availability and the final quote."
  });
}

async function sendBookingEmail(details: { to: string; subject: string; estimate: ReturnType<typeof calculateEventEstimate> }) {
  // TODO: add API key and send this selection through Resend, Formspree, or another email provider.
  // The server recomputes the estimate so the submitted total cannot be manipulated client-side.
  void details;
  return Promise.resolve();
}
