import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface Earning {
  id: string
  order: string
  amount: number
  date: string
}

const Earnings = () => {
  const { user } = useAuth()
  const [earnings, setEarnings] = useState<Earning[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setEarnings([
        { id: '1', order: 'Traditional Dress Design', amount: 15000, date: '2025-09-01' },
        { id: '2', order: 'Wedding Attire', amount: 30000, date: '2025-08-15' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (!user || user.role !== 'seller') {
    return <div className="container mx-auto px-4 py-8 text-center">Only sellers can view earnings.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title">Your Earnings</h1>
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold">Total Earnings</h3>
        <p className="text-2xl font-bold text-primary-blue">₦{earnings.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</p>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {earnings.map((earning) => (
            <div key={earning.id} className="card p-4">
              <h3 className="font-semibold">{earning.order}</h3>
              <p className="text-sm">Amount: ₦{earning.amount.toLocaleString()}</p>
              <p className="text-sm">Date: {earning.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Earnings