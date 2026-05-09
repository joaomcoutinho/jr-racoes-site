import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../assets/images/image-removebg-preview (8).png'

function formatarData(dateStr) {
  const [ano, mes, dia] = dateStr.split('-')
  return `${dia}/${mes}/${ano}`
}

export default function ExamesListPage() {
  const { petId } = useParams()
  const { profile, logout } = useAuth()
  const navigate = useNavigate()
  const [pet, setPet] = useState(null)
  const [exames, setExames] = useState([])
  const [loading, setLoading] = useState(true)
  const [temMaisPets, setTemMaisPets] = useState(false)

  useEffect(() => {
    if (!profile) return
    Promise.all([
      supabase.from('pets').select('id, nome, owner_id').eq('id', petId).single(),
      supabase.from('pets').select('id', { count: 'exact', head: true }).eq('owner_id', profile.id)
    ]).then(([{ data: petData }, { count }]) => {
      if (!petData || petData.owner_id !== profile.id) {
        navigate('/exames', { replace: true })
        return
      }
      setPet(petData)
      setTemMaisPets((count || 0) > 1)
      supabase
        .from('exames')
        .select('*')
        .eq('pet_id', petId)
        .order('data_exame', { ascending: false })
        .then(({ data }) => {
          setExames(data || [])
          setLoading(false)
        })
    })
  }, [petId, profile])

  async function handleLogout() {
    navigate('/')
    await logout()
  }

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
        {['top-16 right-10', 'bottom-24 left-8', 'top-1/2 right-1/4'].map((pos, i) => (
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
          <div className="flex items-center gap-4">
            {temMaisPets && (
              <Link
                to="/exames"
                className="font-display font-bold text-[11px] tracking-widest uppercase text-white/50 hover:text-white transition-colors"
              >
                ← Meus pets
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="font-display font-bold text-[11px] tracking-widest uppercase text-white/50 hover:text-white transition-colors"
            >
              Sair
            </button>
          </div>
        </header>
      </div>

      {/* Conteúdo */}
      <div className="relative max-w-2xl mx-auto px-4 pt-14 pb-16">

        {/* Badge + Título */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 border-2 border-white/30 text-white bg-white/10 rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase mb-5">
            Resultados
          </span>
          <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl leading-tight">
            {pet?.nome}
          </h1>
          <p className="font-body text-white/60 mt-2 text-sm">
            Histórico completo de exames
          </p>
        </div>

        {/* Lista de exames */}
        {exames.length === 0 ? (
          <div className="bg-white/5 border-2 border-white/15 rounded-[28px] p-10 text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-display font-bold text-white/60 text-sm tracking-wide">Nenhum exame disponível ainda.</p>
            <p className="font-body text-white/40 text-xs mt-1">Os resultados aparecerão aqui quando adicionados pela clínica.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {exames.map(exame => (
              <div key={exame.id} className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    {/* Tipo badge */}
                    {exame.tipo && (
                      <span className="inline-flex items-center border-2 border-navy text-navy rounded-pill px-3 py-1 font-display text-[10px] font-bold tracking-widest uppercase mb-3">
                        {exame.tipo}
                      </span>
                    )}
                    <p className="font-display font-extrabold text-navy text-base leading-snug">{exame.descricao}</p>
                    <p className="font-body text-midgray text-xs mt-1">{formatarData(exame.data_exame)}</p>
                    {exame.observacoes && (
                      <p className="font-body text-midgray text-sm mt-2 italic">{exame.observacoes}</p>
                    )}
                  </div>
                  <a
                    href={exame.arquivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-pill font-display font-bold text-xs tracking-widest uppercase bg-electric text-white border-2 border-navy shadow-offset-navy hover:shadow-none hover:translate-y-0.5 transition-all duration-300 shrink-0"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Ver PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
