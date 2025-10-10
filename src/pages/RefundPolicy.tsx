/* eslint-disable @typescript-eslint/no-unused-vars */

// import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen py-8 bg-neutral-lightGray">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="card">
          <div className="p-8">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Refund Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-gray-600">Last updated: January 2024</p>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">1. Refund Eligibility</h2>
                <p className="mb-4">
                  Refunds may be issued under the following circumstances:
                </p>
                <ul className="mb-4 space-y-2 list-disc list-inside">
                  <li>Service not delivered as described</li>
                  <li>Service provider fails to deliver the service</li>
                  <li>Significant delay in service delivery without communication</li>
                  <li>Mutual agreement between buyer and seller</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">2. Non-Refundable Situations</h2>
                <p className="mb-4">Refunds will not be issued for:</p>
                <ul className="mb-4 space-y-2 list-disc list-inside">
                  <li>Change of mind after service has started</li>
                  <li>Dissatisfaction with subjective quality aspects</li>
                  <li>Failure to provide required information to the service provider</li>
                  <li>Services already completed and delivered</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">3. Refund Process</h2>
                <p className="mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ol className="mb-4 space-y-2 list-decimal list-inside">
                  <li>Contact the service provider directly to resolve the issue</li>
                  <li>If unresolved, submit a refund request through the platform</li>
                  <li>Provide detailed information and evidence supporting your claim</li>
                  <li>Our team will review the case within 3-5 business days</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">4. Partial Refunds</h2>
                <p className="mb-4">
                  In some cases, partial refunds may be issued based on the work completed 
                  and the nature of the dispute.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">5. Processing Time</h2>
                <p className="mb-4">
                  Approved refunds will be processed within 5-10 business days. The refund 
                  will be issued to the original payment method.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">6. Service Provider Refunds</h2>
                <p className="mb-4">
                  Service providers may issue refunds voluntarily through their dashboard. 
                  Commission fees for refunded transactions may not be refundable.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">7. Contact Us</h2>
                <p className="mb-4">
                  For refund-related inquiries, please contact our support team at:
                </p>
                <p className="text-blue-600">support@joydome.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;