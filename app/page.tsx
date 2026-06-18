import LeadForm from "./components/LeadForm";

export default function Home() {
  return (
    <>
      {/* ---------------- Nav ---------------- */}
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label="Ilmi Online home">
            {/* Full-colour Ilmi logo (works on the light sand background).
                Swap public/ilmi-logo.svg if you prefer another lockup. */}
            <img src="/ilmi_english.png" alt="Ilmi" />
          </a>
          <a className="btn btn-ghost" href="#signup">
            Start free trial
          </a>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="hero" id="top">
        <div className="container hero-center">
          <span className="badge">
            <span className="dot" />
            Live cohort begins 28 June 2026
          </span>
          <h1 className="heading">
            <span className="arabic">تفسير أمّ الكتاب وقصار السور</span>
            Tafsīr of Ummul Kitāb &amp; Qiṣār Suwar
          </h1>
          <p className="lead">
            A guided journey through Surah Al-Fātiḥah — the Mother of the Book —
            and the short surahs you recite every day. Understand the meaning,
            context, and lessons behind the verses, with both live online
            classes and on-demand replays you can revisit anytime.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#signup">
              Start your free trial →
            </a>
            <span className="hero-note">
              7 days free — start your trial at checkout. No charge until it
              ends, cancel anytime.
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- What you'll get ---------------- */}
      <section className="section" id="course">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The course</span>
            <h2 className="heading">Learning built around how you actually study</h2>
            <p>
              Whether you can join live or prefer to learn on your own schedule,
              every session is yours to keep and revisit.
            </p>
          </div>
          <div className="cards">
            <article className="card">
              <div className="icon">🟢</div>
              <h3>Live online classes</h3>
              <p>
                Join the teacher in real time, ask questions, and learn alongside
                the cohort starting 28 June.
              </p>
            </article>
            <article className="card">
              <div className="icon">🎬</div>
              <h3>Recorded &amp; on-demand</h3>
              <p>
                Miss a session or want to review? Every class is recorded and
                ready to watch whenever suits you.
              </p>
            </article>
            <article className="card">
              <div className="icon">📚</div>
              <h3>Full lesson library</h3>
              <p>
                Your free week unlocks access to all previous lessons — start from
                the beginning, no catching up required.
              </p>
            </article>
          </div>

          {/* Offer card — its own centered row */}
          <div className="offer-row">
            <aside className="offer-card" aria-label="Pricing">
              <span className="tag">Launch offer</span>
              <div className="offer-price">
                <span className="free">1 week free</span>
              </div>
              <p className="offer-sub">
                then <strong className="gold">£25 / month</strong> — less than £1 a
                day. Cancel anytime during your trial and pay nothing.
              </p>
              <ul className="offer-list">
                <li>
                  <span className="check">✓</span>
                  <span>Start at checkout — no charge for your first 7 days</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Full access, including every previous lesson</span>
                </li>
                {/* <li>
                  <span className="check">✓</span>
                  <span>Live online classes + recorded replays</span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>Learn at your own pace, on any device</span>
                </li> */}
              </ul>
              <a className="btn btn-invert btn-block" href="#signup">
                Start your free trial
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- Curriculum ---------------- */}
      <section className="section" id="curriculum">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What you&apos;ll cover</span>
            <h2 className="heading">Two pillars, verse by verse</h2>
          </div>
          <div className="split">
            <div className="module">
              <div className="arabic arabic-h">أمّ الكتاب</div>
              <h3>Tafsīr of Ummul Kitāb</h3>
              <p>
                A deep study of Surah Al-Fātiḥah — its names, themes, and the
                meaning behind the words you repeat in every prayer. Understand
                why it is called the Mother of the Book.
              </p>
            </div>
            <div className="module">
              <div className="arabic arabic-h">قِصار السور</div>
              <h3>Tafsīr of Qiṣār Suwar</h3>
              <p>
                Move through the short surahs of the final juzʾ, unpacking their
                context, lessons, and how to bring their meanings into daily life
                and worship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Signup ---------------- */}
      <section className="signup" id="signup">
        <div className="container">
          <div className="signup-wrap">
            <div>
              <span className="eyebrow">Reserve your place</span>
              <h2 className="heading">Start your free trial</h2>
              <p>
                Sign up below to begin your{" "}
                <strong className="accent">7-day free trial</strong> at checkout —
                full access to Ilmi Online, including every previous lesson. You
                won&apos;t be charged until your trial ends.
              </p>
              <p>
                After your free week it&apos;s just{" "}
                <strong className="accent">£25 / month</strong>, less than £1 a day.
                Cancel anytime before then and you pay nothing.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="brand">
            <img src="/ilmi_arabic.png" alt="Ilmii" />
          </span>
          <span>Tafsīr Ummul Kitāb &amp; Qiṣār Suwar · Starts 28 June 2026</span>
          <a href="https://ilmi.online">ilmi.online · @ilmi.online</a>
        </div>
      </footer>
    </>
  );
}
