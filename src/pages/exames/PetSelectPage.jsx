import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../assets/images/image-removebg-preview (8).png'

export default function PetSelectPage() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    supabase
      .from('pets')
      .select('id, nome')
      .eq('owner_id', profile.id)
      .order('nome')
      .then(({ data }) => {
        const lista = data || []
        setPets(lista)
        setLoading(false)
        if (lista.length === 1) navigate(`/exames/${lista[0].id}`, { replace: true })
      })
  }, [profile])

  async function handleLogout() {
    navigate('/')
    await logout()
  }

  const primeiroNome = profile?.nome?.split(' ')[0] || 'cliente'

  if (loading) return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span className="font-display font-bold text-white/60 text-xs tracking-widest uppercase">Carregando...</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-navy">

      {/* Decoração fundo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {['top-20 left-8', 'top-40 right-12', 'bottom-32 left-1/3', 'bottom-16 right-8'].map((pos, i) => (
          <svg key={i} className={`absolute ${pos} opacity-[0.04] w-20 h-20`} viewBox="0 0 52 52" fill="white">
            <ellipse cx="26" cy="38" rx="13" ry="11"/>
            <ellipse cx="9" cy="24" rx="6" ry="8" transform="rotate(-22 9 24)"/>
            <ellipse cx="19" cy="14" rx="5.5" ry="7.5"/>
            <ellipse cx="32" cy="14" rx="5.5" ry="7.5"/>
            <ellipse cx="43" cy="24" rx="6" ry="8" transform="rotate(22 43 24)"/>
          </svg>
        ))}
      </div>

      {/* Header flutuante */}
      <div className="relative flex justify-center pt-5 px-4">
        <header className="w-full max-w-2xl bg-navy border-2 border-white/15 rounded-pill px-5 py-2.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center">
            <img src={Logo} alt="JR Rações" className="h-8 w-auto" />
          </div>
          <button
            onClick={handleLogout}
            className="font-display font-bold text-[11px] tracking-widest uppercase text-white/50 hover:text-white transition-colors"
          >
            Sair
          </button>
        </header>
      </div>

      {/* Conteúdo */}
      <div className="relative max-w-2xl mx-auto px-4 pt-14 pb-16">

        {/* Badge + Saudação */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 border-2 border-white/30 text-white bg-white/10 rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase mb-5">
            Bem-vindo de volta
          </span>
          <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight">
            Olá, {primeiroNome}!
          </h1>
          <p className="font-body text-white/60 mt-2 text-sm">
            Selecione o pet para ver os resultados dos exames.
          </p>
        </div>

        {/* Pets */}
        {pets.length === 0 ? (
          <div className="bg-white/5 border-2 border-white/15 rounded-[28px] p-10 text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="font-display font-bold text-white/60 text-sm tracking-wide">Nenhum pet cadastrado ainda.</p>
            <p className="font-body text-white/40 text-xs mt-1">Entre em contato com a JR Rações.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {pets.map(pet => (
              <button
                key={pet.id}
                onClick={() => navigate(`/exames/${pet.id}`)}
                className="group bg-white border-2 border-navy rounded-[28px] shadow-offset-navy p-6 text-left hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center shrink-0 group-hover:bg-electric transition-colors duration-300">
                    <svg className="w-7 h-7" viewBox="0 0 52 52" fill="white">
                      <ellipse cx="26" cy="38" rx="13" ry="11"/>
                      <ellipse cx="9" cy="24" rx="6" ry="8" transform="rotate(-22 9 24)"/>
                      <ellipse cx="19" cy="14" rx="5.5" ry="7.5"/>
                      <ellipse cx="32" cy="14" rx="5.5" ry="7.5"/>
                      <ellipse cx="43" cy="24" rx="6" ry="8" transform="rotate(22 43 24)"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-navy text-lg leading-tight">{pet.nome}</p>
                    <p className="font-body text-electric text-xs mt-0.5 font-semibold">Ver exames →</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
