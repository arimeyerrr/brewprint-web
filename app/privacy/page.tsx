import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Brewprint',
  description: 'How Brewprint collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        <p className="text-[10px] tracking-[0.35em] uppercase font-medium mb-4" style={{ color: 'rgba(217,142,74,0.55)' }}>
          legal
        </p>
        <h1 className="text-white font-bold mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
          Privacy Policy
        </h1>
        <p className="text-white/30 text-sm mb-12">Last updated: June 25, 2026</p>

        <div className="prose-brewprint">
          <Section title="1. Who We Are">
            <p>Brewprint (&quot;Brewprint,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a coffee discovery platform that connects coffee lovers with independent coffee shops. We operate the Brewprint mobile application and the website at brewprintapp.com.</p>
            <p>If you have questions about this policy, contact us at <a href="mailto:privacy@brewprintapp.com">privacy@brewprintapp.com</a>.</p>
          </Section>

          <Section title="2. Information We Collect">
            <h3>Information you provide directly</h3>
            <ul>
              <li><strong>Email address</strong> — when you join our waitlist or create an account.</li>
              <li><strong>Profile information</strong> — display name, bio, profile photo, and your preferred drink type when you set up your Brewprint account.</li>
              <li><strong>Shop information</strong> — if you register as a shop owner, your business name, address, hours, and contact details.</li>
              <li><strong>User-generated content</strong> — reviews, ratings, journal entries, comments, stories, and any photos or videos you upload.</li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li><strong>Location data</strong> — with your permission, we use your device location to show you nearby coffee shops. We do not store your precise location history.</li>
              <li><strong>Device information</strong> — device type, operating system, and push notification token (to send you alerts you&apos;ve opted into).</li>
              <li><strong>Usage data</strong> — features you use, shops you view, and interactions within the app, used to improve recommendations.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul>
              <li>To operate and improve the Brewprint app and website.</li>
              <li>To personalize your coffee discovery experience and recommendations.</li>
              <li>To send you the waitlist confirmation email and, when we launch, your early-access invitation.</li>
              <li>To send push notifications you have opted into (new reviews, follows, shop updates).</li>
              <li>To allow shop owners to communicate with their followers via in-app blasts.</li>
              <li>To prevent fraud, abuse, and violations of our Terms of Service.</li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p>We do not sell your personal information. We do not use your data to serve third-party advertisements.</p>
          </Section>

          <Section title="4. How We Share Your Information">
            <h3>With other users</h3>
            <p>Your public profile, reviews, ratings, and stories are visible to other Brewprint users. Journal entries and wishlists are private to you.</p>

            <h3>With service providers</h3>
            <p>We share data with trusted third parties who help us operate Brewprint:</p>
            <ul>
              <li><strong>Supabase</strong> — our database and authentication infrastructure, hosted in the United States.</li>
              <li><strong>Resend</strong> — our email delivery provider, used to send confirmation and transactional emails.</li>
              <li><strong>Apple</strong> — for push notifications delivered through Apple Push Notification service (APNs).</li>
            </ul>
            <p>These providers are contractually required to protect your data and may not use it for their own purposes.</p>

            <h3>Legal requirements</h3>
            <p>We may disclose information if required by law, court order, or to protect the rights, property, or safety of Brewprint, our users, or the public.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We keep your account data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where we are required to retain it by law.</p>
            <p>Waitlist emails are retained until you unsubscribe or we complete our launch outreach, whichever comes first.</p>
          </Section>

          <Section title="6. Your Rights and Choices">
            <ul>
              <li><strong>Access and correction</strong> — you can view and update your profile information in the app at any time.</li>
              <li><strong>Data deletion</strong> — you can delete your account and all associated data from your account settings, or by emailing us at privacy@brewprintapp.com.</li>
              <li><strong>Push notifications</strong> — you can disable push notifications at any time through your device settings.</li>
              <li><strong>Location</strong> — you can revoke location access at any time through your device settings. This will limit shop discovery features.</li>
              <li><strong>Waitlist unsubscribe</strong> — every waitlist email includes an unsubscribe link.</li>
            </ul>
            <p>If you are located in the European Economic Area or California, you may have additional rights under GDPR or CCPA. Contact us at privacy@brewprintapp.com to exercise these rights.</p>
          </Section>

          <Section title="7. Security">
            <p>We use industry-standard security measures including encrypted data transmission (TLS), secure authentication, and row-level database security. No method of transmission over the internet is 100% secure. If you believe your account has been compromised, contact us immediately at privacy@brewprintapp.com.</p>
          </Section>

          <Section title="8. Children">
            <p>Brewprint is not directed at children under 13. We do not knowingly collect personal information from children under 13. If we learn that we have, we will delete that information promptly.</p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>We may update this policy as Brewprint evolves. When we make material changes, we will notify you by email or through the app. Continued use of Brewprint after changes take effect constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="10. Contact Us">
            <p>Questions or concerns about this policy? Email us at <a href="mailto:privacy@brewprintapp.com">privacy@brewprintapp.com</a>.</p>
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
