"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      consent: (form.elements.namedItem("consent") as HTMLInputElement).checked,
      source: "ilmi.online landing — Tafsir Ummul Kitaab & Qisaar Suwaar",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="success-box" role="status">
        <div className="tick">✓</div>
        <h3>You&apos;re in! 🎉</h3>
        <p>
          Check your inbox — we&apos;ll send your link for 1 week of free access
          (including all previous lessons) shortly. See you on 28 June.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="Your first name"
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
        <label htmlFor="phone">Phone (optional)</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="For WhatsApp class reminders"
        />
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          I&apos;d like to receive my free access link and occasional updates from
          Ilmi Online.
        </span>
      </label>

      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send my free week link →"}
      </button>

      <p className={`form-status ${status === "error" ? "error" : ""}`}>
        {message}
      </p>
    </form>
  );
}
