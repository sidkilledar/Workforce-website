import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How WorkforceOS collects, uses, and protects your information.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains what information the WorkforceOS marketing site collects, why we use it, and the choices available to you."
      lastUpdated="August 21, 2026"
    >
      <LegalSection title="Information we collect">
        <p>
          When you request a demo, we collect the information you provide: your name,
          work email, company, role or job title, industry, number of locations,
          approximate hourly workforce size, current systems, the workflow creating
          the most friction, and any message you choose to include.
        </p>
        <p>
          Our hosting and security systems may automatically receive basic technical
          information such as your IP address, browser type, device type, requested
          pages, and the date and time of a request. If analytics are enabled, we may
          also collect aggregated information about how visitors use the site.
        </p>
      </LegalSection>

      <LegalSection title="How we use information">
        <p>We use this information to:</p>
        <ul>
          <li>review and respond to demo requests;</li>
          <li>prepare a conversation relevant to your operation;</li>
          <li>send the confirmation and follow-up you requested;</li>
          <li>operate, secure, troubleshoot, and improve the website; and</li>
          <li>comply with applicable legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection title="How information is disclosed">
        <p>
          We do not sell personal information or share it for cross-context behavioral
          advertising. We disclose information to service providers that help us host
          the site, prevent abuse, understand site usage, and deliver email. These
          providers process information on our behalf for those services. We may also
          disclose information when required by law, to protect rights or safety, or as
          part of a merger, financing, acquisition, or sale of business assets.
        </p>
      </LegalSection>

      <LegalSection title="Retention and security">
        <p>
          We retain demo-request information only as long as reasonably necessary to
          respond, maintain appropriate business records, resolve disputes, and meet
          legal obligations. We use reasonable administrative, technical, and
          organizational safeguards, but no method of transmission or storage is
          completely secure.
        </p>
      </LegalSection>

      <LegalSection title="Your choices and rights">
        <p>
          You may ask to access, correct, or delete personal information you submitted,
          or object to further contact, by emailing us. Depending on where you live,
          applicable law may provide additional rights. We may need to verify your
          identity before completing a request.
        </p>
        <p>
          Because we do not sell personal information or use it for cross-context
          behavioral advertising, browser-based opt-out preference signals do not
          change how this site handles personal information. The site does not currently
          respond differently to other Do Not Track signals.
        </p>
      </LegalSection>

      <LegalSection title="Children’s privacy">
        <p>
          This business-to-business site is not directed to children under 13, and we
          do not knowingly collect their personal information through it.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>
          We may update this policy as our site or practices change. We will post the
          revised policy here and update its effective date.
        </p>
        <p>
          Questions or privacy requests can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
