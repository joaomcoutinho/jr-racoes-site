import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

// Remove acentos e converte para minúsculo
function normalizar(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

// Extrai primeiro e segundo nome
function primeiroESegundo(str) {
  const partes = normalizar(str).split(/\s+/).filter(Boolean)
  if (partes.length <= 1) return partes.join(' ')
  return `${partes[0]} ${partes[1]}`
}

// Compara nome digitado com nome cadastrado (aceita primeiro+segundo nome, sem acento, sem case)
function nomeCorresponde(digitado, cadastrado) {
  return primeiroESegundo(digitado) === primeiroESegundo(cadastrado)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        setLoading(true)
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data)
    setLoading(false)
  }

  async function loginCliente(nome, cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '')
    const email = `${cpfLimpo}@jrracoes.com`

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: cpfLimpo })
    if (error) throw new Error('Nome ou CPF incorretos.')

    // Verifica se o perfil corresponde ao nome digitado
    const { data: perfil } = await supabase
      .from('profiles')
      .select('nome')
      .eq('id', data.user.id)
      .single()

    if (!perfil || !nomeCorresponde(nome, perfil.nome)) {
      await supabase.auth.signOut()
      throw new Error('Nome ou CPF incorretos.')
    }

    return data
  }

  async function loginAdmin(email, senha) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) throw new Error('E-mail ou senha incorretos.')
    return data
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  const isAdmin = profile?.role === 'admin'
  const isCliente = profile?.role === 'cliente'

  return (
    <AuthContext.Provider value={{ session, profile, loading, isAdmin, isCliente, loginCliente, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
