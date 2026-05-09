import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AreaLayout from '../AreaLayout'

export default function ClienteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [nomePet, setNomePet] = useState('')
  const [adicionandoPet, setAdicionandoPet] = useState(false)
  const [erroPet, setErroPet] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => { carregarDados() }, [id])

  async function carregarDados() {
    const [{ data: perfil }, { data: petsData }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', id).single(),
      supabase.from('pets').select('id, nome, created_at').eq('owner_id', id).order('nome')
    ])
    setCliente(perfil)
    setPets(petsData || [])
    setLoading(false)
  }

  async function adicionarPet(e) {
    e.preventDefault()
    setErroPet('')
    if (!nomePet.trim()) return
    const { error } = await supabase.from('pets').insert({ owner_id: id, nome: nomePet.trim() })
    if (error) { setErroPet('Erro ao adicionar pet.'); return }
    setNomePet('')
    setAdicionandoPet(false)
    carregarDados()
  }

  async function removerPet(petId) {
    if (!window.confirm('Remover este pet e todos os seus exames?')) return
    await supabase.from('pets').delete().eq('id', petId)
    carregarDados()
  }

  async function deletarCliente() {
    await supabase.from('profiles').delete().eq('id', id)
    navigate('/admin')
  }

  if (loading) return (
    <AreaLayout subtitulo="Painel Administrativo" backTo="/admin" backLabel="Clientes">
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
      </div>
    </AreaLayout>
  )

  if (!cliente) return (
    <AreaLayout subtitulo="Painel Administrativo" backTo="/admin" backLabel="Clientes">
      <p className="font-body text-midgray">Cliente não encontrado.</p>
    </AreaLayout>
  )

  return (
    <AreaLayout subtitulo="Painel Administrativo" backTo="/admin" backLabel="Clientes">

      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 border-2 border-navy text-navy rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase mb-3">
          Perfil do Cliente
        </span>
        <h1 className="font-display font-extrabold text-navy text-3xl md:text-4xl leading-tight">{cliente.nome}</h1>
      </div>

      {/* Dados de acesso */}
      <div className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy p-6 mb-6">
        <p className="font-display font-bold text-xs tracking-widest uppercase text-navy mb-4">Dados de Acesso</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-offwhite rounded-xl px-4 py-3">
            <p className="font-display font-bold text-[10px] tracking-widest uppercase text-midgray mb-1">Usuário (login)</p>
            <p className="font-body font-semibold text-navy text-sm">{cliente.nome}</p>
          </div>
          <div className="bg-offwhite rounded-xl px-4 py-3">
            <p className="font-display font-bold text-[10px] tracking-widest uppercase text-midgray mb-1">CPF (senha)</p>
            <p className="font-body font-semibold text-navy text-sm">{cliente.cpf}</p>
          </div>
        </div>
      </div>

      {/* Pets */}
      <div className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <p className="font-display font-bold text-xs tracking-widest uppercase text-navy">Pets</p>
          <button
            onClick={() => setAdicionandoPet(!adicionandoPet)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-pill font-display font-bold text-xs tracking-widest uppercase bg-electric text-white border-2 border-navy shadow-offset-navy hover:shadow-none hover:translate-y-0.5 transition-all duration-300"
          >
            + Adicionar Pet
          </button>
        </div>

        {adicionandoPet && (
          <form onSubmit={adicionarPet} className="flex flex-col sm:flex-row gap-2 mb-5">
            <input
              type="text"
              value={nomePet}
              onChange={e => setNomePet(e.target.value)}
              placeholder="Nome do pet"
              className="w-full sm:flex-1 border-2 border-navy/30 rounded-xl px-4 py-2.5 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"
            />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 sm:flex-none px-4 py-2.5 rounded-pill font-display font-bold text-xs tracking-widest uppercase bg-navy text-white border-2 border-navy hover:bg-electric transition-colors">
                Salvar
              </button>
              <button type="button" onClick={() => setAdicionandoPet(false)} className="flex-1 sm:flex-none px-4 py-2.5 rounded-pill font-display font-bold text-xs tracking-widest uppercase border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all">
                Cancelar
              </button>
            </div>
          </form>
        )}
        {erroPet && <p className="text-red-600 text-sm font-body mb-3">{erroPet}</p>}

        {pets.length === 0 ? (
          <p className="font-body text-midgray text-sm">Nenhum pet cadastrado.</p>
        ) : (
          <div className="space-y-3">
            {pets.map(pet => (
              <div key={pet.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-offwhite rounded-xl px-4 py-3 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-navy rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 52 52" fill="white">
                      <ellipse cx="26" cy="38" rx="13" ry="11"/>
                      <ellipse cx="9" cy="24" rx="6" ry="8" transform="rotate(-22 9 24)"/>
                      <ellipse cx="19" cy="14" rx="5.5" ry="7.5"/>
                      <ellipse cx="32" cy="14" rx="5.5" ry="7.5"/>
                      <ellipse cx="43" cy="24" rx="6" ry="8" transform="rotate(22 43 24)"/>
                    </svg>
                  </div>
                  <p className="font-display font-bold text-navy text-sm truncate">{pet.nome}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    to={`/admin/clientes/${id}/pets/${pet.id}/exames/novo`}
                    className="px-3 py-1.5 rounded-pill font-display font-bold text-[10px] tracking-widest uppercase bg-electric text-white border-2 border-navy hover:bg-navy transition-colors"
                  >
                    + Exame
                  </Link>
                  <Link
                    to={`/admin/clientes/${id}/pets/${pet.id}`}
                    className="px-3 py-1.5 rounded-pill font-display font-bold text-[10px] tracking-widest uppercase border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all"
                  >
                    Ver Exames
                  </Link>
                  <button
                    onClick={() => removerPet(pet.id)}
                    className="px-3 py-1.5 rounded-pill font-display font-bold text-[10px] tracking-widest uppercase border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Zona de perigo */}
      <div className="border-2 border-red-300 rounded-[28px] p-6 bg-red-50">
        <p className="font-display font-bold text-xs tracking-widest uppercase text-red-500 mb-3">Zona de Perigo</p>
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill font-display font-bold text-xs tracking-widest uppercase border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            Deletar este cliente
          </button>
        ) : (
          <div className="flex flex-wrap gap-3 items-center">
            <p className="font-body text-red-600 text-sm">Isso removerá o cliente, todos os pets e exames. Confirma?</p>
            <button onClick={deletarCliente} className="px-5 py-2.5 rounded-pill font-display font-bold text-xs tracking-widest uppercase bg-red-500 text-white border-2 border-red-600 hover:bg-red-600 transition-all">
              Confirmar
            </button>
            <button onClick={() => setConfirmDelete(false)} className="px-5 py-2.5 rounded-pill font-display font-bold text-xs tracking-widest uppercase border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all">
              Cancelar
            </button>
          </div>
        )}
      </div>

    </AreaLayout>
  )
}
