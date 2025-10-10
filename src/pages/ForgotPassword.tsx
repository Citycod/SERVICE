import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    // Mock API call
    setTimeout(() => {
      if (email) {
        setSubmitted(true)
        setSubmitting(false)
      } else {
        setError('Please enter a valid email')
        setSubmitting(false)
      }
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="section-title">Reset Password</h1>
        {submitted ? (
          <p className="text-green-600 text-center">A password reset link has been sent to your email.</p>
        ) : (
          <>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  aria-label="Email address"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn btn-primary w-full">
                {submitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              Back to <Link to="/login" className="text-primary-blue hover:underline">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword