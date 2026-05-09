import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AreaLayout from '../AreaLayout'

export default function ClienteForm() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [nomePet, setNomePet] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  function formatarCpf(valor) {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    const cpfLimpo = cpf.replace(/\D/g, '')
    if (cpfLimpo.length !== 11) { setErro('CPF deve ter 11 dígitos.'); return }

    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('create-client', {
        body: { nome: nome.trim(), cpf: cpfLimpo, nomePet: nomePet.trim() }
      })
      if (error || data?.error) throw new Error(data?.error || 'Erro ao criar cliente.')
      navigate(`/admin/clientes/${data.clienteId}`)
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AreaLayout
      subtitulo="Painel Administrativo"
      backTo="/admin"
      backLabel="Clientes"
    >
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 border-2 border-navy text-navy rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase mb-3">
          Novo Cadastro
        </span>
        <h1 className="font-display font-extrabold text-navy text-3xl md:text-4xl leading-tight">
          Criar Cliente
        </h1>
        <p className="font-body text-midgray text-sm mt-1">
          O nome e CPF serão as credenciais de acesso do cliente.
        </p>
      </div>

      {/* Card do formulário */}
      <div className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy-lg p-6 md:p-8 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              Nome do titular <span className="text-electric">*</span>
            </label>
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              placeholder="Nome completo"
              className="w-full border-2 border-navy/30 rounded-xl px-4 py-3 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"
            />
            <p className="font-body text-midgray text-xs mt-1.5">Será o usuário no login — o cliente entra com primeiro + último nome.</p>
          </div>

          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              CPF <span className="text-electric">*</span>
            </label>
            <input
              type="text"
              value={cpf}
              onChange={e => setCpf(formatarCpf(e.target.value))}
              required
              placeholder="000.000.000-00"
              className="w-full border-2 border-navy/30 rounded-xl px-4 py-3 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"
            />
            <p className="font-body text-midgray text-xs mt-1.5">O CPF (sem formatação) será a senha do cliente.</p>
          </div>

          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              Nome do pet <span className="text-electric">*</span>
            </label>
            <input
              type="text"
              value={nomePet}
              onChange={e => setNomePet(e.target.value)}
              required
              placeholder="Nome do pet"
              className="w-full border-2 border-navy/30 rounded-xl px-4 py-3 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"
            />
            <p className="font-body text-midgray text-xs mt-1.5">Mais pets podem ser adicionados depois.</p>
          </div>

          {erro && (
            <div className="border-2 border-red-400 bg-red-50 rounded-xl px-4 py-3">
              <p className="text-red-600 text-sm font-body">{erro}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-pill font-display font-bold text-sm tracking-widest uppercase bg-electric text-white border-2 border-navy shadow-offset-navy hover:shadow-none hover:translate-y-0.5 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Cliente'}
            </button>
            <Link
              to="/admin"
              className="flex-1 inline-flex items-center justify-center py-3.5 rounded-pill font-display font-bold text-sm tracking-widest uppercase bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white transition-all duration-300 text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </AreaLayout>
  )
}
