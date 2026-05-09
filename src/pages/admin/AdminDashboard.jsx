import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import AreaLayout from '../AreaLayout'

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState('')

  useEffect(() => { carregarClientes() }, [])

  async function carregarClientes() {
    const { data } = await supabase
      .from('profiles')
      .select('id, nome, cpf, created_at')
      .eq('role', 'cliente')
      .order('nome')
    setClientes(data || [])
    setLoading(false)
  }

  async function handleLogout() {
    navigate('/')
    await logout()
  }

  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.cpf.includes(busca)
  )

  return (
    <AreaLayout
      subtitulo="Painel Administrativo"
      actions={
        <button
          onClick={handleLogout}
          className="font-display font-bold text-[11px] tracking-widest uppercase text-white/50 hover:text-white transition-colors"
        >
          Sair
        </button>
      }
    >
      {/* Header da seção */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 border-2 border-navy text-navy rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase mb-3">
            Gestão de Clientes
          </span>
          <h1 className="font-display font-extrabold text-navy text-3xl md:text-4xl leading-tight">
            Clientes
          </h1>
          <p className="font-body text-midgray text-sm mt-1">
            {clientes.length} {clientes.length === 1 ? 'cliente cadastrado' : 'clientes cadastrados'}
          </p>
        </div>
        <Link
          to="/admin/clientes/novo"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-pill font-display font-bold text-sm tracking-widest uppercase bg-electric text-white border-2 border-navy shadow-offset-navy hover:shadow-none hover:translate-y-0.5 transition-all duration-300 shrink-0"
        >
          + Novo Cliente
        </Link>
      </div>

      {/* Busca */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-midgray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar por nome ou CPF..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full border-2 border-navy/30 rounded-xl pl-10 pr-4 py-3 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"
        />
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
            <span className="font-display font-bold text-navy/40 text-xs tracking-widest uppercase">Carregando...</span>
          </div>
        </div>
      ) : clientesFiltrados.length === 0 ? (
        <div className="bg-white border-2 border-navy/20 rounded-[28px] p-12 text-center">
          <p className="font-display font-bold text-navy/40 text-sm tracking-wide">
            {busca ? 'Nenhum resultado encontrado.' : 'Nenhum cliente cadastrado.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy-lg overflow-hidden">
          {clientesFiltrados.map((c, i) => (
            <Link
              key={c.id}
              to={`/admin/clientes/${c.id}`}
              className={`flex items-center justify-between px-6 py-5 hover:bg-offwhite transition-colors group ${i !== 0 ? 'border-t-2 border-navy/10' : ''}`}
            >
              <div>
                <p className="font-display font-bold text-navy text-base">{c.nome}</p>
                <p className="font-body text-midgray text-xs mt-0.5">CPF: {c.cpf}</p>
              </div>
              <span className="font-display font-bold text-[11px] tracking-widest uppercase text-electric opacity-0 group-hover:opacity-100 transition-opacity">
                Ver →
              </span>
            </Link>
          ))}
        </div>
      )}
    </AreaLayout>
  )
}
