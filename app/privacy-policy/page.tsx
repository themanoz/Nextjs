import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 dark:text-white">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last Updated: February 28, 2025</p>
      </header>

      {/* Introduction */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Introduction</h2>
        <p>
          Welcome to <strong>GitTrek</strong>. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our platform. GitTrek enables you to log in via GitHub to track your contributions, pull requests, and commits, and to save projects from other organizations—ensuring you stay informed with real-time issue notifications.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p>
          When you log in through GitHub, we collect your email address and public profile details. Additionally, we retrieve data regarding your contributions, pull requests, and commit activities to provide you with personalized insights. If you choose to save projects, we fetch and store relevant issue data to deliver timely notifications about those projects.
        </p>
      </section>

      {/* How We Use Your Information */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
        <p>The information we collect is used to:</p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Authenticate your login via GitHub and retrieve necessary profile details.</li>
          <li>Track and analyze your coding activities, including contributions, pull requests, and commits.</li>
          <li>Enable you to save projects and fetch issue data from external organizations.</li>
          <li>Deliver timely notifications regarding updates and issues in your saved projects.</li>
          <li>Enhance our platform and personalize your experience.</li>
        </ul>
      </section>

      {/* Third-Party Integrations */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Third-Party Integrations</h2>
        <p>
          GitTrek utilizes GitHub for authentication and data retrieval. We do not store your GitHub password; rather, we use the publicly available data to provide our services. Additionally, we may use third-party services for analytics, payment processing, or marketing. Their respective privacy policies govern the information they collect.
        </p>
      </section>

      {/* Security */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Security</h2>
        <p>
          We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. While no security system is completely foolproof, we continuously monitor and update our security practices to ensure your data remains safe.
        </p>
      </section>

      {/* Your Rights */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access, update, or request deletion of your personal data. If you wish to exercise these rights, please contact our support team, and we will respond in accordance with applicable data protection laws.
        </p>
      </section>

      {/* Changes to This Privacy Policy */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any significant changes will be posted on this page, and your continued use of GitTrek signifies your acceptance of the updated terms.
        </p>
      </section>

      {/* Contact Us */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
          <a href="mailto:support@gittrek.com" className="text-green-500">
            support@gittrek.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
