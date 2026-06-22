/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ─────────────────────────────────────────────────────────────
  // TEMPORARY redirect for the June 2026 Tafsir ad campaign.
  // Sends all traffic from the homepage (/) to the Kajabi checkout.
  // statusCode: 302 = temporary (NOT a permanent 301/308).
  // Only "/" is matched, so all other routes keep working.
  // TODO: REVERT by ~30 June 2026 (remove this redirects() block).
  // ─────────────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: "/",
        destination:
          "https://www.ilmcourses.uk/offers/iZFPVorF/checkout",
        statusCode: 302,
      },
    ];
  },
};

export default nextConfig;
