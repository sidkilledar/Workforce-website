import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing use of WorkforceOS.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Website Terms of Use"
      description="These terms govern use of the public WorkforceOS website. Any pilot or product use is governed by a separate written agreement."
      lastUpdated="August 21, 2026"
    >
      <LegalSection title="Using this website">
        <p>
          You may use this website for lawful purposes and to learn about WorkforceOS
          or request a demo. You may not interfere with the site, attempt unauthorized
          access, introduce malicious code, misuse its forms, scrape it in a way that
          disrupts service, or use its content to violate another person&apos;s rights.
        </p>
      </LegalSection>

      <LegalSection title="Product and pilot agreements">
        <p>
          This website describes WorkforceOS at a high level and does not grant access
          to the product. Product demonstrations, pilots, and paid services may require
          a separate agreement. If that agreement conflicts with these website terms,
          the separate agreement controls for the product or pilot.
        </p>
      </LegalSection>

      <LegalSection title="Content and ownership">
        <p>
          The website and its original text, graphics, branding, and other content are
          owned by WorkforceOS or its licensors and are protected by applicable laws.
          You may view the site for your internal business evaluation, but may not copy,
          publish, sell, or create derivative works from it without written permission.
        </p>
        <p>
          If you send feedback, you permit us to use it without restriction or
          compensation, provided we do not identify you publicly without permission.
        </p>
      </LegalSection>

      <LegalSection title="Third-party services">
        <p>
          The website may rely on or link to third-party services. Their terms and
          privacy practices apply to their services, and WorkforceOS is not responsible
          for third-party sites it does not control.
        </p>
      </LegalSection>

      <LegalSection title="No warranties">
        <p>
          The website and its content are provided on an “as is” and “as available”
          basis. To the extent permitted by law, WorkforceOS disclaims warranties of
          merchantability, fitness for a particular purpose, non-infringement, and that
          the site will always be available, secure, or error-free. Website content is
          general information and is not a binding product commitment.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the extent permitted by law, WorkforceOS will not be liable for indirect,
          incidental, special, consequential, or punitive damages arising from use of
          or inability to use this website. Nothing in these terms limits liability that
          cannot legally be limited.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>
          We may update these terms by posting a revised version and effective date.
          Continued use after an update means you accept the revised terms. If a part
          of these terms is unenforceable, the remaining terms continue in effect.
        </p>
        <p>
          Questions can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
