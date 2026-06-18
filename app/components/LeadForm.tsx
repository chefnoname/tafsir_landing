"use client";

import { useState, FormEvent, ChangeEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type Country = { iso: string; name: string; dial: string; flag: string };

// Common dial codes (UK first as the default for this audience).
const COUNTRIES: Country[] = [
  { iso: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { iso: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { iso: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { iso: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { iso: "AE", name: "UAE", dial: "+971", flag: "🇦🇪" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { iso: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { iso: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { iso: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { iso: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { iso: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { iso: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { iso: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { iso: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { iso: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { iso: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { iso: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { iso: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { iso: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { iso: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { iso: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { iso: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { iso: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
];

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [countryIso, setCountryIso] = useState("GB");
  const [phone, setPhone] = useState("");

  const dialCode =
    COUNTRIES.find((c) => c.iso === countryIso)?.dial ?? "+44";

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    // Keep digits only, then drop any leading zero(s) — the dial code
    // selected from the picker replaces the national trunk "0".
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^0+/, "");
    setPhone(v);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!phone) {
      setStatus("error");
      setMessage("Please enter your phone number.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const fullPhone = `${dialCode} ${phone}`;

    try {
      await fetch("https://hooks.zapier.com/hooks/catch/25162803/4bhku90/", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone: fullPhone,
          countryCode: dialCode,
          phoneNumber: phone,
          source: "ilmi.online — Tafsir Ummul Kitaab & Qisaar Suwaar",
          submittedAt: new Date().toISOString(),
        }),
      });

      // no-cors gives an opaque response we can't inspect, so a completed
      // request without a network error is treated as success.
      setStatus("success");
      form.reset();
      setPhone("");
      setCountryIso("GB");
    } catch (err) {
      console.error("Failed to submit:", err);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="success-box" role="status">
        <div className="tick">✓</div>
        <h3>You&apos;re in! 🎉</h3>
        <p>
         We've sent you a message with how to claim the free week trial with Ilmi Online!
        </p>
        <p>May Allah make it a fruitful and beneficial journey.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <div className="phone-row">
          <select
            className="dial-select"
            name="dialCode"
            aria-label="Country code"
            value={countryIso}
            onChange={(e) => setCountryIso(e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.flag} {c.name} ({c.dial})
              </option>
            ))}
          </select>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="7123 456789"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <span className="field-hint">
          Selected code: <strong>{dialCode}</strong> — for WhatsApp class
          reminders. A leading 0 is removed automatically.
        </span>
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          I&apos;d like to start my free trial and receive occasional updates from
          Ilmi Online.
        </span>
      </label>

      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Start my free trial →"}
      </button>

      <p className={`form-status ${status === "error" ? "error" : ""}`}>
        {message}
      </p>
    </form>
  );
}
