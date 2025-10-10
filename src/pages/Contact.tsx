import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all fields')
      setSubmitting(false)
      return
    }

    try {
      // Mock API call (replace with real API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('An error occurred while sending your message')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="section-title">Contact Us</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Get in Touch</h2>
          <p className="mb-4 text-neutral-textGray">We’re here to help! Reach out with any questions or feedback.</p>
          <ul className="space-y-2 text-sm text-neutral-textGray">
            <li><strong>Email:</strong> oluwayinkaogunbodebiz@gmail.com</li>
            <li><strong>Phone:</strong> +234 8140728174</li>
            <li><strong>Address:</strong> Lagos, Nigeria</li>
          </ul>
        </div>
        <div>
          {submitted ? (
            <div className="text-center text-primary-green">Message sent successfully!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-textGray">Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                  aria-label="Full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-textGray">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                  aria-label="Email address"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-textGray">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                  rows={4}
                  aria-label="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full btn btn-primary"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact