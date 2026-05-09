import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../assets/images/logo_arredondada_jr.jpg'

export default function ExamesLoginPage() {
  const { loginCliente } = useAuth()
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

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
    setLoading(true)
    try {
      await loginCliente(nome, cpf)
      navigate('/exames')
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-y-scroll no-scrollbar bg-navy">

      {/* Decoração de patas no fundo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {['top-10 left-10', 'top-32 right-16', 'bottom-20 left-1/4', 'top-1/2 right-10', 'bottom-10 right-1/3'].map((pos, i) => (
          <svg key={i} className={`absolute ${pos} opacity-[0.04] w-16 h-16`} viewBox="0 0 52 52" fill="white">
            <ellipse cx="26" cy="38" rx="13" ry="11"/>
            <ellipse cx="9" cy="24" rx="6" ry="8" transform="rotate(-22 9 24)"/>
            <ellipse cx="19" cy="14" rx="5.5" ry="7.5"/>
            <ellipse cx="32" cy="14" rx="5.5" ry="7.5"/>
            <ellipse cx="43" cy="24" rx="6" ry="8" transform="rotate(22 43 24)"/>
          </svg>
        ))}
      </div>

      {/* Card de login — centralizado na tela */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy-lg w-full max-w-md p-8 md:p-10">

          {/* Voltar ao site */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-display font-bold text-[11px] tracking-widest uppercase text-navy/40 hover:text-navy transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao site
            </Link>
          </div>

          {/* Logo + Badge */}
          <div className="flex flex-col items-center mb-8">
            <img src={Logo} alt="JR Rações" className="w-16 h-16 rounded-full object-cover border-2 border-navy shadow-offset-navy mb-4" />
            <span className="inline-flex items-center gap-2 border-2 border-navy text-navy rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase">
              Área de Exames
            </span>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="font-display font-extrabold text-navy text-2xl md:text-3xl leading-tight mb-2">
              Acesse os exames<br />do seu pet
            </h1>
            <p className="font-body text-midgray text-sm">
              Use seu nome e CPF para entrar.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
                Seu nome
              </label>
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                placeholder="Primeiro e último nome"
                className="w-full border-2 border-navy/30 rounded-xl px-4 py-3 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"
              />
            </div>
            <div>
              <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
                CPF
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={cpf}
                onChange={e => setCpf(formatarCpf(e.target.value))}
                required
                placeholder="000.000.000-00"
                className="w-full border-2 border-navy/30 rounded-xl px-4 py-3 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"
              />
            </div>

            {erro && (
              <div className="border-2 border-red-400 bg-red-50 rounded-xl px-4 py-3">
                <p className="text-red-600 text-sm font-body">{erro}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-pill font-display font-bold text-sm tracking-widest uppercase bg-electric text-white border-2 border-navy shadow-offset-navy hover:shadow-none hover:translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Entrando...' : 'Entrar agora'}
              {!loading && (
                <span className="w-7 h-7 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          <p className="text-center font-body text-xs text-midgray mt-6">
            Não tem acesso? Entre em contato com a JR Rações.
          </p>
        </div>
      </div>

      {/* Espaço + link admin escondido abaixo do fold */}
      <div className="relative flex flex-col items-center py-12">
        <div className="h-24" />
        <Link
          to="/admin/login"
          className="font-body text-[11px] text-white/20 hover:text-white/40 transition-colors"
        >
          Acesso administrativo
        </Link>
      </div>

    </div>
  )
}
