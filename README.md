# Ilmi Online — Course Landing Page

Landing page for the **Tafsīr of Ummul Kitāb & Qiṣār Suwar** course.
Built with **Next.js 14** (App Router) + TypeScript.

**Theme (light):** Warm Sand `#F9F6F0` background · Deep Charcoal Green
`#2C3E35` text · Rich Forest Green `#1B4332` CTAs with white text. Brand
greens and signal yellow are used as accents, with the pricing card as a
single deep-forest focal panel.

Offer on the page: sign up → get a link for **1 week free** (including all
previous lessons) → then **£25/month** (less than £1 a day). Cohort starts
**28 June 2026**, with live online classes and recorded replays.

---

## Run locally

```bash
npm install
cp .env.example .env.local   # then add your webhook URL
npm run dev
```

Open http://localhost:3000

```bash
npm run build && npm run start   # production build
```

---

## Connect the lead form (GoHighLevel + Zapier)

The form posts to `/api/lead`, which forwards each submission as JSON to the
URL in `LEAD_WEBHOOK_URL`. Set this in `.env.local` (and in your host's env
vars when deployed):

```
LEAD_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/XXXX/XXXX/
```

- **Zapier:** create a Zap with a *Webhooks by Zapier → Catch Hook* trigger,
  copy its URL into `LEAD_WEBHOOK_URL`. Then chain actions (e.g. add to GHL,
  send the free-access email).
- **GoHighLevel:** in a Workflow, add an *Inbound Webhook* trigger, copy its
  URL into `LEAD_WEBHOOK_URL`. Map the fields and add a "send free trial link"
  action.

Each payload looks like:

```json
{
  "firstName": "Aisha",
  "email": "aisha@example.com",
  "phone": "+44…",
  "consent": true,
  "source": "ilmi.online landing — Tafsir Ummul Kitaab & Qisaar Suwaar",
  "submittedAt": "2026-06-17T12:00:00.000Z"
}
```

If `LEAD_WEBHOOK_URL` is unset, leads are logged to the server console so the
form still works while you're testing.

---

## Logo

The full-colour Ilmi logo is at `public/ilmi-logo.svg` (copied from your brand
pack). Swap it for a different lockup if you prefer — keep the same filename.

## Fonts

- **Body:** Inter (brand secondary typeface, loaded from Google Fonts).
- **Headings:** the brand's primary typeface is *Nimbus Sans Extd*, which is
  licensed and not on the web. **Archivo** (wide, bold) is used as the closest
  open fallback. If you hold a web licence for Nimbus Sans Extd, add it via
  `@font-face` in `app/globals.css` and point `--font-heading` at it.

## Colours

| Token | Hex |
|---|---|
| Warm Sand (background) | `#F9F6F0` |
| Deep Charcoal Green (text) | `#2C3E35` |
| Rich Forest Green (CTA) | `#1B4332` |
| Core Green | `#52B955` |
| Forest Green | `#388567` |
| Signal Yellow | `#F6BB25` |

## Deploy

Works out of the box on **Vercel** (recommended for Next.js). Push to a repo,
import it, and add `LEAD_WEBHOOK_URL` as an environment variable.
# tafsir_landing
