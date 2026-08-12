import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SeoHead from "@/components/SeoHead";

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <SeoHead
        title="Privacy Policy | Great Escape Consulting"
        description="Privacy Policy for greatescapeconsulting.com"
        canonicalPath="/privacy-policy"
      />

      <PageHero
        title="Privacy Policy"
        subtitle="Last updated: June 2025"
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="section-padding bg-white" aria-label="Privacy policy content">
        <div className="container max-w-3xl prose prose-sm prose-slate max-w-none">
          <div className="space-y-8 text-[oklch(0.40_0.03_55)]">
            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                Great Escape Consulting ("we," "us," or "our") operates the website
                greatescapeconsulting.com. This Privacy Policy explains how we collect, use, and
                protect your information when you visit our website.
              </p>
              <p className="leading-relaxed mt-3">
                Please read this policy carefully. If you disagree with its terms, please
                discontinue use of the site.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                2. Information We Collect
              </h2>
              <p className="leading-relaxed mb-3">
                We may collect information about you in the following ways:
              </p>
              <h3 className="font-semibold text-[oklch(0.25_0.03_50)] mb-2">
                Information You Provide Directly
              </h3>
              <p className="leading-relaxed mb-3">
                When you fill out our contact form, we collect: your name, email address, company
                or business name, website URL (optional), the reason you reached out, your learning
                goals, industry (optional), and how you found us (optional). We use this information
                solely to respond to your inquiry and to improve our services.
              </p>
              <h3 className="font-semibold text-[oklch(0.25_0.03_50)] mb-2">
                Automatically Collected Information
              </h3>
              <p className="leading-relaxed">
                When you visit our website, we may automatically collect certain information about
                your device and usage, including your IP address, browser type, operating system,
                referring URLs, and pages visited. This information is used for analytics and to
                improve the website experience.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                3. How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Communicate with you about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third
                parties without your consent, except as required by law.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                4. Data Retention
              </h2>
              <p className="leading-relaxed">
                We retain contact form submissions and related correspondence for as long as
                necessary to provide our services and comply with legal obligations. You may request
                deletion of your information at any time by contacting us.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                5. Third-Party Analytics
              </h2>
              <p className="leading-relaxed">
                Our website may use third-party analytics services. These services may collect
                information about your use of our website in accordance with their own privacy
                policies.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                6. Your Rights
              </h2>
              <p className="leading-relaxed">
                Depending on your location, you may have rights regarding your personal information,
                including the right to access, correct, or delete your data. To exercise these
                rights, please contact us at{" "}
                <a
                  href="mailto:jason@greatescapeconsulting.com"
                  className="text-[oklch(0.33_0.08_155)] underline hover:no-underline"
                >
                  jason@greatescapeconsulting.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                7. Children's Privacy
              </h2>
              <p className="leading-relaxed">
                Our website is not directed to children under 13. We do not knowingly collect
                personal information from children under 13.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                8. Changes to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new policy on this page with an updated date.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">9. Contact</h2>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a
                  href="mailto:jason@greatescapeconsulting.com"
                  className="text-[oklch(0.33_0.08_155)] underline hover:no-underline"
                >
                  jason@greatescapeconsulting.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
