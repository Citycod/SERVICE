import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../utils/supabase'
import type { Session } from '@supabase/supabase-js'

// Single User interface definition
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar: string;
}

interface AuthContextType {
  user: User | null
  session: Session | null
  login: (user: User) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      if (data) {
        return {
          id: userId,
          name: data.full_name || data.username || email.split('@')[0],
          email: email,
          phone: data.phone || '',
          role: data.role as 'buyer' | 'seller' | 'admin',
          avatar: data.avatar_url || '',
        }
      }
      return null
    } catch (err) {
      console.error('Unexpected error fetching profile:', err)
      return null
    }
  }

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email!).then(profile => {
          if (profile) setUser(profile)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      if (session?.user) {
        // Optionally refetch profile or just rely on state if we want to be reactive
        // For now let's fetch to be safe
        const profile = await fetchProfile(session.user.id, session.user.email!)
        if (profile) setUser(profile)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Legacy login function might not be needed if we rely solely on Supabase Auth state,
  // but keeping it for compatibility if any component calls login() manually with a User object
  // directly without going through Supabase Auth (which shouldn't happen with real auth).
  // We will deprecate it by making it a no-op or just warn.
  const login = (userData: User) => {
    console.warn('login() called manually. simpler to rely on Supabase Auth state changes.')
    setUser(userData)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ user, session, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
