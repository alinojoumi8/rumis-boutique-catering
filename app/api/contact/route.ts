import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { readString, validateContactPayload } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();

  if (readString(formData.get("company"))) {
    return NextResponse.json({ ok: true, message: "Thank you. Rumi's will follow up with you soon." });
  }

  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    eventDate: formData.get("eventDate"),
    guestCount: formData.get("guestCount"),
    eventType: formData.get("eventType"),
    message: formData.get("message")
  };

  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", errors: validation.errors },
      { status: 400 }
    );
  }

  const attachment = formData.get("attachment");
  const attachmentName = attachment instanceof File ? attachment.name : undefined;

  await sendContactEmail({
    to: site.email,
    subject: `Quote request from ${readString(payload.name)}`,
    attachmentName
  });

  return NextResponse.json({
    ok: true,
    message: "Thank you. Rumi's will follow up with you soon."
  });
}

async function sendContactEmail(details: { to: string; subject: string; attachmentName?: string }) {
  // TODO: add API key and wire this to Resend, Formspree, or another email provider.
  // Keep the API route shape stable so deployment only needs provider credentials.
  void details;
  return Promise.resolve();
}
