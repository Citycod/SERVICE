import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface Service {
  id: string
  title: string
  category: string
  price: number
  status: string
}

const ManageServices = () => {
  const { user } = useAuth()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setServices([
        { id: '1', title: 'Traditional Dress Design', category: 'Fashion', price: 15000, status: 'Active' },
        { id: '2', title: 'Wedding Attire', category: 'Fashion', price: 30000, status: 'Pending' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (!user || user.role !== 'seller') {
    return <div className="container mx-auto px-4 py-8 text-center">Only sellers can manage services.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title">Manage Services</h1>
      <Link to="/create-service" className="btn btn-primary mb-6">Create New Service</Link>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="card p-4">
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-sm text-gray-600">Category: {service.category}</p>
              <p className="text-sm">Price: ₦{service.price.toLocaleString()}</p>
              <p className="text-sm">Status: {service.status}</p>
              <div className="flex gap-2 mt-4">
                <Link to={`/service/${service.id}`} className="btn btn-ghost">Edit</Link>
                <button className="btn btn-ghost text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageServices