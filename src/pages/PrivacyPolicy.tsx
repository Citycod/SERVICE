/* eslint-disable @typescript-eslint/no-unused-vars */

// import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-neutral-lightGray py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="card">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: January 2024</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information you provide directly to us when you use our platform, including:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Service provider details (business information, skills, portfolio)</li>
                  <li>Payment and transaction information</li>
                  <li>Communication data (messages between buyers and sellers)</li>
                  <li>Usage data and platform interactions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze trends and usage</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                <p className="mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Service providers who assist in our operations</li>
                  <li>Other users as necessary to provide our services</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify or update your personal information</li>
                  <li>Delete your personal information</li>
                  <li>Restrict or object to our processing of your data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-blue-600">privacy@joydome.com</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PrivacyPolicy;
