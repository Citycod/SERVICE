const FAQ = () => {
  const faqs = [
    {
      question: "What is JoyDome Nigeria?",
      answer: "JoyDome Nigeria is a marketplace connecting clients with skilled Nigerian professionals, such as caterers, plumbers, and fashion designers, for quality services.",
    },
    {
      question: "How do I hire a professional?",
      answer: "Browse services, select a professional, review their profile, and place an order through our secure checkout process. You can communicate directly via our messaging system.",
    },
    {
      question: "How are payments handled?",
      answer: "Payments are securely processed via Paystack. Funds are held until you approve the completed work, ensuring satisfaction.",
    },
    {
      question: "Can I become a service provider?",
      answer: "Yes! Sign up as a seller, complete your profile, and list your services to start receiving orders from clients across Nigeria.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Contact our support team within 7 days of delivery. We offer a money-back guarantee for eligible cases to ensure your satisfaction.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="card p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
            <p className="text-sm text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ