import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AreaLayout from '../AreaLayout'

function formatarData(dateStr) {
  const [ano, mes, dia] = dateStr.split('-')
  return `${dia}/${mes}/${ano}`
}

export default function PetExamesAdmin() {
  const { id, petId } = useParams()
  const [pet, setPet] = useState(null)
  const [exames, setExames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { carregarDados() }, [petId])

  async function carregarDados() {
    const [{ data: petData }, { data: examesData }] = await Promise.all([
      supabase.from('pets').select('nome').eq('id', petId).single(),
      supabase.from('exames').select('*').eq('pet_id', petId).order('data_exame', { ascending: false })
    ])
    setPet(petData)
    setExames(examesData || [])
    setLoading(false)
  }

  async function removerExame(exameId, arquivoUrl) {
    if (!window.confirm('Remover este exame?')) return
    const path = arquivoUrl.split('/exames/')[1]
    if (path) await supabase.storage.from('exames').remove([path])
    await supabase.from('exames').delete().eq('id', exameId)
    carregarDados()
  }

  if (loading) return (
    <AreaLayout subtitulo="Painel Administrativo" backTo={`/admin/clientes/${id}`} backLabel="Cliente">
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
      </div>
    </AreaLayout>
  )

  return (
    <AreaLayout subtitulo="Painel Administrativo" backTo={`/admin/clientes/${id}`} backLabel="Cliente">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 border-2 border-navy text-navy rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase mb-3">
            Exames do Pet
          </span>
          <h1 className="font-display font-extrabold text-navy text-3xl md:text-4xl leading-tight">
            {pet?.nome}
          </h1>
          <p className="font-body text-midgray text-sm mt-1">
            {exames.length} {exames.length === 1 ? 'exame cadastrado' : 'exames cadastrados'}
          </p>
        </div>
        <Link
          to={`/admin/clientes/${id}/pets/${petId}/exames/novo`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-pill font-display font-bold text-sm tracking-widest uppercase bg-electric text-white border-2 border-navy shadow-offset-navy hover:shadow-none hover:translate-y-0.5 transition-all duration-300 shrink-0"
        >
          + Adicionar Exame
        </Link>
      </div>

      {/* Lista de exames */}
      {exames.length === 0 ? (
        <div className="bg-white border-2 border-navy/20 rounded-[28px] p-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-4 text-navy/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="font-display font-bold text-navy/40 text-sm tracking-wide">Nenhum exame cadastrado para este pet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {exames.map(exame => (
            <div key={exame.id} className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  {exame.tipo && (
                    <span className="inline-flex items-center border-2 border-navy text-navy rounded-pill px-3 py-1 font-display text-[10px] font-bold tracking-widest uppercase mb-3">
                      {exame.tipo}
                    </span>
                  )}
                  <p className="font-display font-bold text-navy text-base">{exame.descricao}</p>
                  <p className="font-body text-midgray text-xs mt-1">{formatarData(exame.data_exame)}</p>
                  {exame.observacoes && <p className="font-body text-midgray text-sm mt-2 italic">{exame.observacoes}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={exame.arquivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-pill font-display font-bold text-[10px] tracking-widest uppercase border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all"
                  >
                    Ver PDF
                  </a>
                  <button
                    onClick={() => removerExame(exame.id, exame.arquivo_url)}
                    className="px-4 py-2 rounded-pill font-display font-bold text-[10px] tracking-widest uppercase border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AreaLayout>
  )
}
