import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10 dark:text-white">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Terms and Conditions</h1>
        <p className="text-sm text-gray-500">
          Last Updated: <strong>February 28, 2025</strong>
        </p>
      </header>

      {/* Acknowledgment */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Acknowledgment</h2>
        <p>
          These Terms and Conditions (&quot;Terms&quot;) govern your use of the
          GitTrek Service and constitute a binding agreement between you
          (&quot;User&quot;) and GitTrek (&quot;Company&quot;). By accessing or
          using our Service, you agree to be bound by these Terms. If you
          disagree with any part of these Terms, you may not access or use the
          Service.
        </p>
        <p>
          Your use of GitTrek is also subject to our Privacy Policy, which
          describes our practices regarding the collection, use, and disclosure
          of your personal information.
        </p>
      </section>

      {/* User Accounts & GitHub Integration */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">
          User Accounts & GitHub Integration
        </h2>
        <p>
          To access GitTrek, you must create an account by logging in via
          GitHub. When you log in, we retrieve your GitHub email and public
          profile information. You are responsible for maintaining the
          confidentiality of your account credentials, and you agree to notify
          us immediately of any unauthorized use of your account. Any breach of
          these Terms may result in immediate account termination.
        </p>
        <p>
          In addition, GitTrek tracks your GitHub contributions, pull requests,
          and commit activity to provide personalized insights and analytics. By
          using our Service, you consent to this data retrieval and its usage as
          described in our Privacy Policy.
        </p>
      </section>

      {/* Service Access and Use */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Service Access and Use</h2>
        <p>
          GitTrek allows you to save projects from other organizations and fetch
          issue data related to those projects. This enables you to receive
          notifications about updates and issues on your saved projects. You
          agree to use the Service only for lawful purposes and in accordance
          with these Terms. Misuse of the Service may result in suspension or
          termination of your account.
        </p>
      </section>

      {/* Intellectual Property & Copyright */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Intellectual Property</h2>
        <p>
          All content, features, and functionality on GitTrek, including but not
          limited to text, graphics, logos, images, and software, are the
          exclusive property of GitTrek and are protected by international
          copyright, trademark, and other intellectual property laws.
          Unauthorized reproduction or distribution of this content is strictly
          prohibited.
        </p>
        <p>
          If you believe that your intellectual property rights have been
          infringed, please refer to our DMCA procedures below.
        </p>
        <h3 className="text-xl font-semibold mt-4">
          DMCA Notice and Procedure
        </h3>
        <ol className="list-decimal list-inside ml-4 space-y-2">
          <li>
            Provide an electronic or physical signature of the person authorized
            to act on behalf of the copyright owner.
          </li>
          <li>
            Describe the copyrighted work that has been infringed, including the
            URL or a copy of the work.
          </li>
          <li>
            Identify the URL or specific location on GitTrek where the
            infringing material is located.
          </li>
          <li>
            Include your contact information such as address, telephone number,
            and email.
          </li>
          <li>
            Include a statement of good faith belief that the use of the
            material is not authorized by the copyright owner or the law.
          </li>
          <li>
            Submit a statement, under penalty of perjury, that the information
            in your notice is accurate and that you are the copyright owner or
            authorized to act on their behalf.
          </li>
        </ol>
        <p>
          Contact our Copyright Agent at{" "}
          <a href="mailto:support@gittrek.com" className="text-green-700">
            support@gittrek.com
          </a>{" "}
          for DMCA-related concerns.
        </p>
      </section>

      {/* Your Feedback to Us */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Your Feedback to Us</h2>
        <p>
          Any feedback or suggestions you provide to GitTrek shall become our
          exclusive property. In the event that such assignment is deemed
          ineffective, you grant GitTrek a non-exclusive, perpetual,
          irrevocable, royalty-free license to use, reproduce, distribute, and
          modify your feedback.
        </p>
      </section>

      {/* Links to Other Websites */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Links to Other Websites</h2>
        <p>
          GitTrek may contain links to third-party websites or services that are
          not owned or controlled by us. We are not responsible for the content,
          privacy policies, or practices of any third-party sites. We encourage
          you to review the terms and conditions of those websites before using
          them.
        </p>
      </section>

      {/* Termination */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior
          notice or liability, if you breach these Terms. Upon termination, your
          right to use the Service will cease immediately. You may terminate
          your account at any time by discontinuing use of the Service.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
        <p>
          In no event shall GitTrek or its suppliers be liable for any indirect,
          incidental, special, consequential or punitive damages, or any loss of
          profits or revenues, whether incurred directly or indirectly, arising
          out of your use of the Service. Our total liability, if any, shall not
          exceed the amount you have paid to GitTrek through the Service in the
          preceding 12 months, or $100 if no payments have been made.
        </p>
        <p>
          The Service is provided on an &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; basis without any warranties, either express or
          implied.
        </p>
      </section>

      {/* Governing Law & Dispute Resolution */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Governing Law & Dispute Resolution
        </h2>
        <p>
          These Terms shall be governed and construed in accordance with the
          laws of India, without regard to its conflict of law provisions. You
          agree to submit to the exclusive jurisdiction of the courts located
          within India for the resolution of any disputes arising out of or
          related to these Terms.
        </p>
        <p>
          If you have any concerns or disputes, please contact us first so that
          we can try to resolve the matter amicably.
        </p>
      </section>

      {/* Changes to These Terms */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Changes to These Terms and Conditions
        </h2>
        <p>
          We reserve the right to modify or replace these Terms at any time at
          our sole discretion. If a revision is material, we will provide at
          least 30 days&apos; notice prior to any new terms taking effect. By
          continuing to use our Service after those revisions become effective,
          you agree to be bound by the revised Terms.
        </p>
      </section>

      {/* Contact Us */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us via our website at{" "}
          <a
            href="https://www.gittrek.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700"
          >
            https://www.gittrek.com
          </a>{" "}
          or send an email to{" "}
          <a href="mailto:support@gittrek.com" className="text-green-700">
            support@gittrek.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
