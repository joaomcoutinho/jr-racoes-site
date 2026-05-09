import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../assets/images/logo_arredondada_jr.jpg'

export default function AdminLoginPage() {
  const { loginAdmin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    try {
      await loginAdmin(email, senha)
      navigate('/admin')
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 py-16">

      {/* Decoração de patas no fundo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {['top-10 right-10', 'bottom-20 left-16', 'top-1/2 left-10', 'bottom-10 right-1/4'].map((pos, i) => (
          <svg key={i} className={`absolute ${pos} opacity-[0.04] w-20 h-20`} viewBox="0 0 52 52" fill="white">
            <ellipse cx="26" cy="38" rx="13" ry="11"/>
            <ellipse cx="9" cy="24" rx="6" ry="8" transform="rotate(-22 9 24)"/>
            <ellipse cx="19" cy="14" rx="5.5" ry="7.5"/>
            <ellipse cx="32" cy="14" rx="5.5" ry="7.5"/>
            <ellipse cx="43" cy="24" rx="6" ry="8" transform="rotate(22 43 24)"/>
          </svg>
        ))}
      </div>

      <div className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy-lg w-full max-w-md p-8 md:p-10 relative">

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

        {/* Logo + Badge gold para admin */}
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="JR Rações" className="w-16 h-16 rounded-full object-cover border-2 border-gold shadow-offset-gold mb-4" />
          <span className="inline-flex items-center gap-2 border-2 border-gold text-gold rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase">
            Acesso Restrito
          </span>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="font-display font-extrabold text-navy text-2xl md:text-3xl leading-tight mb-2">
            Painel Administrativo
          </h1>
          <p className="font-body text-midgray text-sm">
            Área exclusiva para a equipe JR Rações.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border-2 border-navy/30 rounded-xl px-4 py-3 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"
            />
          </div>
          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
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
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-pill font-display font-bold text-sm tracking-widest uppercase bg-navy text-white border-2 border-navy shadow-offset-gold hover:shadow-none hover:translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Entrando...' : 'Entrar'}
            {!loading && (
              <span className="w-7 h-7 bg-gold rounded-full flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
