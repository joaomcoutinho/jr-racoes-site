import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RequireCliente({ children }) {
  const { session, profile, loading } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-navy-950"><span className="text-white">Carregando...</span></div>
  if (!session || profile?.role !== 'cliente') return <Navigate to="/exames/login" replace />

  return children
}
