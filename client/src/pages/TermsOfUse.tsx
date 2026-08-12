import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SeoHead from "@/components/SeoHead";

export default function TermsOfUse() {
  return (
    <PageLayout>
      <SeoHead
        title="Terms of Use | Great Escape Consulting"
        description="Terms of Use for greatescapeconsulting.com"
        canonicalPath="/terms-of-use"
      />

      <PageHero
        title="Terms of Use"
        subtitle="Last updated: June 2025"
        breadcrumbs={[{ label: "Terms of Use" }]}
      />

      <section className="section-padding bg-white" aria-label="Terms of use content">
        <div className="container max-w-3xl">
          <div className="space-y-8 text-[oklch(0.40_0.03_55)]">
            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By accessing and using greatescapeconsulting.com (the "Site"), you accept and agree
                to be bound by these Terms of Use. If you do not agree to these terms, please do not
                use the Site.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                2. Use of the Site
              </h2>
              <p className="leading-relaxed mb-3">
                You may use the Site for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use the Site in any way that violates applicable laws or regulations</li>
                <li>
                  Transmit any unsolicited or unauthorized advertising or promotional material
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the Site or its related systems
                </li>
                <li>
                  Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the
                  Site
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                3. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                The content on this Site, including text, graphics, and other materials, is owned
                by Great Escape Consulting and is protected by applicable intellectual property laws.
                You may not reproduce, distribute, or create derivative works without our express
                written permission.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                4. Disclaimer of Warranties
              </h2>
              <p className="leading-relaxed">
                The Site is provided "as is" without warranties of any kind, either express or
                implied. We do not warrant that the Site will be uninterrupted, error-free, or free
                of viruses or other harmful components. The information on this Site is for general
                informational purposes only and does not constitute professional advice.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                5. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by law, Great Escape Consulting shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages arising
                from your use of the Site or any content thereon.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                6. Third-Party Links
              </h2>
              <p className="leading-relaxed">
                The Site may contain links to third-party websites. These links are provided for
                your convenience only. We have no control over the content of those sites and accept
                no responsibility for them or for any loss or damage that may arise from your use of
                them.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                7. Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We may revise these Terms of Use at any time by updating this page. Your continued
                use of the Site after any changes constitutes your acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">
                8. Governing Law
              </h2>
              <p className="leading-relaxed">
                These Terms of Use are governed by and construed in accordance with the laws of the
                United States, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[oklch(0.18_0.02_50)] mb-3">9. Contact</h2>
              <p className="leading-relaxed">
                If you have questions about these Terms of Use, please contact us at{" "}
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
