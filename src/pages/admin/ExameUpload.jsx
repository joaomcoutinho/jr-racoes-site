import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AreaLayout from '../AreaLayout'

const TIPOS_EXAME = [
  'Hemograma',
  'Bioquímico',
  'Urinálise',
  'Coproparasitológico',
  'Raio-X',
  'Ultrassom',
  'Eletrocardiograma',
  'Cultura e Antibiograma',
  'Sorologias',
  'Outro',
]

export default function ExameUpload() {
  const { id, petId } = useParams()
  const navigate = useNavigate()
  const [pet, setPet] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [dataExame, setDataExame] = useState('')
  const [tipo, setTipo] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [arquivo, setArquivo] = useState(null)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.from('pets').select('nome').eq('id', petId).single().then(({ data }) => setPet(data))
  }, [petId])

  function handleArquivo(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setErro('Apenas arquivos PDF são aceitos.')
      e.target.value = ''
      return
    }
    setErro('')
    setArquivo(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    if (!arquivo) { setErro('Selecione um arquivo PDF.'); return }

    setLoading(true)
    try {
      const nomeArquivo = `${petId}/${Date.now()}_${arquivo.name.replace(/\s/g, '_')}`
      const { error: uploadError } = await supabase.storage
        .from('exames')
        .upload(nomeArquivo, arquivo, { contentType: 'application/pdf' })
      if (uploadError) throw new Error('Erro ao fazer upload do PDF.')

      const { data: { publicUrl } } = supabase.storage.from('exames').getPublicUrl(nomeArquivo)

      const { error: dbError } = await supabase.from('exames').insert({
        pet_id: petId,
        descricao: descricao.trim(),
        data_exame: dataExame,
        tipo: tipo || null,
        observacoes: observacoes.trim() || null,
        arquivo_url: publicUrl,
      })
      if (dbError) throw new Error('Erro ao salvar exame no banco.')

      navigate(`/admin/clientes/${id}/pets/${petId}`)
    } catch (err) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full border-2 border-navy/30 rounded-xl px-4 py-3 text-sm font-body text-navy bg-white placeholder:text-midgray/60 focus:outline-none focus:border-electric transition-colors"

  return (
    <AreaLayout
      subtitulo="Painel Administrativo"
      backTo={`/admin/clientes/${id}/pets/${petId}`}
      backLabel="Exames do Pet"
    >

      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 border-2 border-navy text-navy rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase mb-3">
          Novo Exame
        </span>
        <h1 className="font-display font-extrabold text-navy text-3xl md:text-4xl leading-tight">
          Adicionar Exame
        </h1>
        {pet && (
          <p className="font-body text-midgray text-sm mt-1">
            Pet: <span className="font-semibold text-navy">{pet.nome}</span>
          </p>
        )}
      </div>

      {/* Card do formulário */}
      <div className="bg-white border-2 border-navy rounded-[28px] shadow-offset-navy-lg p-6 md:p-8 max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Descrição */}
          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              Descrição <span className="text-electric">*</span>
            </label>
            <input
              type="text"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              required
              placeholder="Ex: Hemograma completo — rotina"
              className={inputClass}
            />
          </div>

          {/* Data */}
          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              Data do Exame <span className="text-electric">*</span>
            </label>
            <input
              type="date"
              value={dataExame}
              onChange={e => setDataExame(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              Tipo de Exame
            </label>
            <div className="relative">
              <select
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                className={`${inputClass} appearance-none pr-10 cursor-pointer`}
              >
                <option value="">Selecione (opcional)</option>
                {TIPOS_EXAME.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              Observações
            </label>
            <textarea
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              rows={3}
              placeholder="Notas adicionais sobre o exame (opcional)"
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Upload PDF */}
          <div>
            <label className="block font-display font-bold text-xs tracking-widest uppercase text-navy mb-2">
              Arquivo PDF <span className="text-electric">*</span>
            </label>

            <label className="flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-navy/30 rounded-xl px-4 py-6 cursor-pointer hover:border-electric hover:bg-electric/5 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-navy/5 group-hover:bg-electric/10 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-navy/40 group-hover:text-electric transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              {arquivo ? (
                <div className="text-center">
                  <p className="font-display font-bold text-navy text-sm">{arquivo.name}</p>
                  <p className="font-body text-midgray text-xs mt-0.5">{(arquivo.size / 1024).toFixed(0)} KB · PDF</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-display font-bold text-navy text-sm">Clique para selecionar</p>
                  <p className="font-body text-midgray text-xs mt-0.5">Apenas arquivos .pdf são aceitos</p>
                </div>
              )}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleArquivo}
                className="sr-only"
              />
            </label>
          </div>

          {/* Erro */}
          {erro && (
            <div className="border-2 border-red-400 bg-red-50 rounded-xl px-4 py-3">
              <p className="text-red-600 text-sm font-body">{erro}</p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-pill font-display font-bold text-sm tracking-widest uppercase bg-electric text-white border-2 border-navy shadow-offset-navy hover:shadow-none hover:translate-y-0.5 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                'Salvar Exame'
              )}
            </button>
            <Link
              to={`/admin/clientes/${id}/pets/${petId}`}
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
