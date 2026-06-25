import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Brewprint',
  description: 'The terms governing your use of the Brewprint app and website.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        <p className="text-[10px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: 'rgba(217,142,74,0.55)' }}>
          legal
        </p>
        <h1 className="text-white font-bold mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
          Terms of Service
        </h1>
        <p className="text-white/30 text-sm mb-12">Last updated: June 25, 2026</p>

        <div className="prose-brewprint">
          <Section title="1. Acceptance of Terms">
            <p>By accessing or using Brewprint — including the mobile app and website at brewprintapp.com — you agree to these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use Brewprint.</p>
            <p>We may update these Terms from time to time. Continued use after changes take effect means you accept the revised Terms.</p>
          </Section>

          <Section title="2. What Brewprint Is">
            <p>Brewprint is a coffee discovery platform. It lets coffee lovers find, review, and track independent coffee shops, and lets shop owners create profiles, post updates, and connect with their customers.</p>
            <p>Brewprint is currently in pre-launch. Features described in these Terms may not all be available yet.</p>
          </Section>

          <Section title="3. Your Account">
            <p>To use most Brewprint features, you need an account. You must:</p>
            <ul>
              <li>Be at least 13 years old.</li>
              <li>Provide accurate information when you sign up.</li>
              <li>Keep your login credentials secure. You are responsible for all activity on your account.</li>
              <li>Notify us immediately at hello@brewprintapp.com if you suspect unauthorized access.</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
          </Section>

          <Section title="4. Shop Owner Accounts">
            <p>If you register as a shop owner, you additionally agree to:</p>
            <ul>
              <li>Only claim or manage shops you own or are authorized to represent.</li>
              <li>Provide accurate information about your business, hours, and offerings.</li>
              <li>Use in-app messaging features (blasts, stories) only for legitimate business communications — no spam.</li>
              <li>Not use Brewprint to mislead customers or post false information about competitors.</li>
            </ul>
          </Section>

          <Section title="5. User-Generated Content">
            <p>Brewprint lets you post reviews, ratings, photos, videos, journal entries, comments, and stories (&quot;Content&quot;). By posting Content you:</p>
            <ul>
              <li>Confirm you have the right to post it (including any photos or videos).</li>
              <li>Grant Brewprint a non-exclusive, royalty-free license to display and distribute your Content within the platform.</li>
              <li>Understand that reviews and public content may be visible to other users and to shop owners.</li>
            </ul>

            <h3>You may not post content that:</h3>
            <ul>
              <li>Is false, defamatory, or misleading.</li>
              <li>Harasses, threatens, or discriminates against any person or group.</li>
              <li>Infringes any copyright, trademark, or other intellectual property right.</li>
              <li>Contains spam, unsolicited promotions, or malware.</li>
              <li>Violates any applicable law.</li>
            </ul>
            <p>We may remove Content that violates these Terms at any time without notice.</p>
          </Section>

          <Section title="6. Acceptable Use">
            <p>You agree not to:</p>
            <ul>
              <li>Scrape, crawl, or systematically extract data from Brewprint.</li>
              <li>Attempt to access other users&apos; accounts or data.</li>
              <li>Interfere with or disrupt Brewprint&apos;s infrastructure.</li>
              <li>Use Brewprint to send unsolicited commercial messages.</li>
              <li>Create fake accounts, fake reviews, or artificially inflate ratings.</li>
              <li>Reverse engineer, decompile, or attempt to extract source code from the app.</li>
            </ul>
          </Section>

          <Section title="7. Intellectual Property">
            <p>The Brewprint name, logo, app design, and all original content we create are owned by Brewprint and protected by copyright and trademark law. You may not use our branding without written permission.</p>
            <p>Shop information (names, addresses, hours) may be sourced from public data and is not exclusively owned by Brewprint.</p>
          </Section>

          <Section title="8. Waitlist">
            <p>By joining the Brewprint waitlist you agree to receive a confirmation email and occasional updates about our launch. You can unsubscribe at any time. Joining the waitlist does not guarantee access to the app or any specific features.</p>
          </Section>

          <Section title="9. Disclaimers">
            <p>Brewprint is provided &quot;as is&quot; without warranties of any kind. We do not guarantee:</p>
            <ul>
              <li>The accuracy of shop information, hours, or menus listed on the platform.</li>
              <li>That the app will be available without interruption or error.</li>
              <li>That reviews or ratings reflect your personal experience.</li>
            </ul>
            <p>Always verify shop hours and information directly with the shop before visiting.</p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>To the fullest extent permitted by law, Brewprint is not liable for any indirect, incidental, special, or consequential damages arising from your use of the platform — including lost profits, lost data, or any damages resulting from reliance on information found in the app.</p>
            <p>Our total liability to you for any claim arising from your use of Brewprint will not exceed the amount you paid us in the 12 months preceding the claim (which for most users is $0).</p>
          </Section>

          <Section title="11. Termination">
            <p>You can delete your account at any time from your account settings. We may suspend or terminate your account if you violate these Terms or for any other reason at our discretion, with or without notice.</p>
            <p>Sections 5 (for content already posted), 7, 9, 10, and 12 survive termination.</p>
          </Section>

          <Section title="12. Governing Law">
            <p>These Terms are governed by the laws of the United States. Any disputes will be resolved through binding arbitration rather than in court, except that either party may bring claims in small claims court.</p>
          </Section>

          <Section title="13. Contact">
            <p>Questions about these Terms? Email us at <a href="mailto:hello@brewprintapp.com">hello@brewprintapp.com</a>.</p>
          </Section>
        </div>
      </div>

      <style>{`
        .prose-brewprint p {
          color: rgba(255,255,255,0.55);
          font-size: 15px;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .prose-brewprint h2 {
          color: rgba(255,255,255,0.9);
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .prose-brewprint h3 {
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .prose-brewprint ul {
          color: rgba(255,255,255,0.55);
          font-size: 15px;
          line-height: 1.75;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .prose-brewprint li {
          margin-bottom: 0.4rem;
        }
        .prose-brewprint a {
          color: rgba(217,142,74,0.85);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-brewprint strong {
          color: rgba(255,255,255,0.75);
          font-weight: 600;
        }
        .section-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 2.5rem 0 0;
        }
      `}</style>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <hr className="section-divider" />
      <h2>{title}</h2>
      {children}
    </div>
  )
}
