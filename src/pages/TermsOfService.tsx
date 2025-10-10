/* eslint-disable @typescript-eslint/no-unused-vars */

// import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-8 bg-neutral-lightGray">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="card">
          <div className="p-8">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="mb-6 text-gray-600">Last updated: January 2024</p>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using JoyDome, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">2. Description of Service</h2>
                <p className="mb-4">
                  JoyDome is a platform that connects service providers with customers seeking 
                  various services. We provide the platform but are not responsible for the 
                  quality of services provided by third-party sellers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">3. User Responsibilities</h2>
                <p className="mb-4">As a user, you agree to:</p>
                <ul className="mb-4 space-y-2 list-disc list-inside">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Use the platform in compliance with all applicable laws</li>
                  <li>Not engage in fraudulent or illegal activities</li>
                  <li>Respect the intellectual property rights of others</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">4. Service Provider Responsibilities</h2>
                <p className="mb-4">As a service provider, you agree to:</p>
                <ul className="mb-4 space-y-2 list-disc list-inside">
                  <li>Provide services as described in your listings</li>
                  <li>Deliver services in a professional and timely manner</li>
                  <li>Maintain appropriate insurance and licenses</li>
                  <li>Resolve customer disputes professionally</li>
                  <li>Pay applicable fees and commissions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">5. Payments and Fees</h2>
                <p className="mb-4">
                  Service providers pay a commission fee for each completed transaction. 
                  All payments are processed through secure third-party payment processors.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">6. Dispute Resolution</h2>
                <p className="mb-4">
                  In case of disputes between buyers and sellers, we provide a mediation 
                  service. Both parties agree to participate in good faith in the resolution process.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">7. Limitation of Liability</h2>
                <p className="mb-4">
                  JoyDome shall not be liable for any indirect, incidental, special, 
                  consequential or punitive damages resulting from your use of the platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">8. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these terms at any time. We will notify 
                  users of any material changes via email or platform notifications.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">9. Contact Information</h2>
                <p className="mb-4">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-blue-600">legal@joydome.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;