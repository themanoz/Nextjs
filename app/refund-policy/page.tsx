import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10 dark:text-white">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Return &amp; Refund Policy</h1>
        <p className="text-sm text-gray-500">
          Last Updated: <strong>February 28, 2025</strong>
        </p>
      </header>

      {/* Introduction */}
      <section className="space-y-2">
        <p>
          Thank you for choosing <strong>GitTrek</strong>. Please read these terms carefully before subscribing to our services.
          By using our Service, you agree to these terms. Note that all payments made are final and non-refundable.
        </p>
      </section>

      {/* Eligibility for Refunds */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Eligibility for Refunds</h2>
        <p>
          GitTrek provides a suite of tools including GitHub authentication, tracking of your contributions, pull requests, and commits, as well as features that allow you to save projects and receive issue notifications.
          Because our services are delivered digitally and on a continuous basis, all payments for subscriptions or services are final.
        </p>
        <p className="mt-2 font-medium">
          We do not offer refunds or returns under any circumstances.
        </p>
      </section>

      {/* Refund Period */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Refund Period</h2>
        <p>
          All payments are considered final at the point of purchase. Refund requests will not be entertained, regardless of the situation.
        </p>
      </section>

      {/* Non-Refundable Cases */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Non-Refundable Cases</h2>
        <p>
          Refunds will not be granted if:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>You change your mind after subscribing.</li>
          <li>You fail to use the service during the subscription period.</li>
          <li>The issue is related to third-party software or integrations not controlled by GitTrek.</li>
          <li>Any other scenario—payments for GitTrek services are non-refundable.</li>
        </ul>
      </section>

      {/* Refund Process */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Refund Process</h2>
        <p>
          Since GitTrek does not offer refunds or returns, there is no refund process. We encourage you to carefully review your subscription details before finalizing your purchase.
        </p>
      </section>

      {/* Contact Us */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions regarding this Refund Policy, please contact our support team at{" "}
          <a href="mailto:support@gittrek.com" className="text-green-500">
            support@gittrek.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default RefundPolicy;
