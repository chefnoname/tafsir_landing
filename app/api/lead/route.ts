import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Set LEAD_WEBHOOK_URL in your environment to forward every submission to:
 *   • a Zapier "Catch Hook" webhook  → https://hooks.zapier.com/hooks/catch/...
 *   • a GoHighLevel inbound webhook   → from a GHL Workflow "Inbound Webhook" trigger
 *
 * Both accept a plain JSON POST, so the same payload works for either.
 * From Zapier/GHL you can then create the contact and trigger the
 * "1 week free access link" email automatically.
 *
 * If LEAD_WEBHOOK_URL is not set, the lead is logged to the server console so
 * the form still works in local development.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof data.email === "string" ? data.email.trim() : "";
  const firstName = typeof data.firstName === "string" ? data.firstName.trim() : "";

  // Basic validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!firstName || !emailValid) {
    return NextResponse.json(
      { error: "Please enter your name and a valid email address." },
      { status: 422 }
    );
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    // No webhook configured yet — log so nothing is lost in dev.
    console.log("[lead] (no LEAD_WEBHOOK_URL set) New lead:", data);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("[lead] Webhook responded with", res.status);
      return NextResponse.json(
        { error: "We couldn't process that right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, forwarded: true });
  } catch (err) {
    console.error("[lead] Failed to forward to webhook:", err);
    return NextResponse.json(
      { error: "We couldn't process that right now. Please try again." },
      { status: 502 }
    );
  }
}
