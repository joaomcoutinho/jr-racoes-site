import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/image-removebg-preview (8).png'

export default function AreaLayout({ children, subtitulo, backTo, backLabel, actions, variant = 'admin' }) {
  const isAdmin = variant === 'admin'

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-offwhite' : 'bg-navy'}`}>

      {/* Header flutuante — estilo navbar do site */}
      <div className="flex justify-center pt-5 px-4">
        <header className="w-full max-w-5xl bg-navy border-2 border-white/15 rounded-pill px-5 py-2.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="JR Rações" className="h-8 w-auto" />
            {subtitulo && <p className="font-body text-white/50 text-[11px] hidden sm:block">· {subtitulo}</p>}
          </div>

          <div className="flex items-center gap-3">
            {backTo && (
              <Link
                to={backTo}
                className="font-display font-bold text-[11px] tracking-widest uppercase text-white/60 hover:text-white transition-colors"
              >
                ← {backLabel || 'Voltar'}
              </Link>
            )}
            {actions}
          </div>
        </header>
      </div>

      {/* Conteúdo */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        {children}
      </main>
    </div>
  )
}
