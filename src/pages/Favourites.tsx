import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface Favorite {
  id: string
  service: string
  seller: string
  price: number
}

const Favorites = () => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setFavorites([
        { id: '1', service: 'Traditional Dress Design', seller: 'Chiamaka Okoro', price: 15000 },
        { id: '2', service: 'Event Catering', seller: 'Chioma Okeke', price: 30000 },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">Please sign in to view your favorites.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title">Your Favorites</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="card p-4">
              <h3 className="font-semibold text-lg">{favorite.service}</h3>
              <p className="text-sm text-gray-600">Seller: {favorite.seller}</p>
              <p className="text-sm">Price: ₦{favorite.price.toLocaleString()}</p>
              <div className="flex gap-2 mt-4">
                <Link to={`/service/${favorite.id}`} className="btn btn-primary">View Details</Link>
                <button className="btn btn-ghost text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites