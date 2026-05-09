import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RequireAdmin({ children }) {
  const { session, profile, loading } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-navy-950"><span className="text-white">Carregando...</span></div>
  if (!session || profile?.role !== 'admin') return <Navigate to="/admin/login" replace />

  return children
}
