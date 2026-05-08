import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { SCROLL_CONFIG } from '../../utils/scrollConfig'
import { MapPin, Clock, Phone } from 'lucide-react'
import Logo from "./../../assets/images/image-removebg-preview (8).png"
import styles from './Navbar.module.css'

function useHasHover() {
  const [has, setHas] = useState(false)
  useEffect(() => { setHas(window.matchMedia('(hover: hover)').matches) }, [])
  return has
}

function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.771.463 3.432 1.272 4.876L2 22l5.273-1.38A9.953 9.953 0 0 0 12.004 22C17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2zm0 18.19a8.178 8.178 0 0 1-4.164-1.14l-.299-.177-3.13.82.834-3.048-.195-.314A8.19 8.19 0 1 1 12.004 20.19z"/>
    </svg>
  )
}

const navItems = [
  { label: 'Início',   to: 'hero'     },
  { label: 'Sobre nós',to: 'sobre'    },
  { label: 'Serviços', to: 'servicos' },
  { label: 'Produtos', to: 'produtos' },
  { label: 'Equipe',   to: 'equipe'   },
  { label: 'Contato',  to: 'contato'  },
]

export function Footer() {
  const hasHover = useHasHover()

  return (
    <footer style={{
      backgroundColor: '#1A2370',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      padding: '80px 0 40px',
      color: '#fff',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Top Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand col */}
          <div>
            <div style={{ fontFamily: 'Montserrat', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>
              <img src={Logo} alt="logo" className={styles.logonova}/>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Petshop completo em Aldeia, Camaragibe. Veterinário, rações, banho & tosa e farmácia pet — há mais de 20 anos cuidando dos pets da região.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com/jr.racooes" target="_blank" rel="noopener noreferrer"
                style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
                aria-label="Instagram"
                onMouseEnter={hasHover ? e => e.currentTarget.style.background = '#F5A623' : undefined}
                onMouseLeave={hasHover ? e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)' : undefined}
              >
                <InstagramIcon />
              </a>
              <a href="https://wa.me/5581996512589" target="_blank" rel="noopener noreferrer"
                style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}
                aria-label="WhatsApp"
                onMouseEnter={hasHover ? e => e.currentTarget.style.background = '#25D366' : undefined}
                onMouseLeave={hasHover ? e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)' : undefined}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 style={{ fontFamily: 'Montserrat', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#F5A623', marginBottom: '1.25rem' }}>Menu</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navItems.map(item => (
                <li key={item.to}>
                  <Link to={item.to} {...SCROLL_CONFIG}
                    style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.65)', cursor: 'pointer', transition: 'color 0.25s' }}
                    onMouseEnter={hasHover ? e => e.currentTarget.style.color = '#fff' : undefined}
                    onMouseLeave={hasHover ? e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Addresses */}
          <div>
            <h4 style={{ fontFamily: 'Montserrat', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#F5A623', marginBottom: '1.25rem' }}>Localização</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14 }}>
                  <MapPin size={14} color="#F5A623" /> Aldeia
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  Estrada de Aldeia, km 10,5 após a entrada do Vera Cruz
                </p>
              </div>
              
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontFamily: 'Montserrat', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#F5A623', marginBottom: '1.25rem' }}>Horário</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <Clock size={16} color="rgba(255,255,255,0.5)" style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                Segunda a Sábado
              </span>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.55)', marginLeft: 26, marginBottom: 12 }}>
              7h30 às 18h
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <Clock size={16} color="rgba(255,255,255,0.5)" style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                Domingo
              </span>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.55)', marginLeft: 26, marginBottom: 12 }}>
              7h30 às 12h
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 4 }}>
              <Phone size={16} color="rgba(255,255,255,0.5)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <a href="tel:+5581996512589" style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.75)', transition: 'color 0.25s' }}
                  onMouseEnter={hasHover ? e => e.currentTarget.style.color = '#fff' : undefined}
                  onMouseLeave={hasHover ? e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)' : undefined}
                >
                  (81) 99651-2589
                </a>
                <a href="tel:+5581921501252" style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255,255,255,0.75)', transition: 'color 0.25s' }}
                  onMouseEnter={hasHover ? e => e.currentTarget.style.color = '#fff' : undefined}
                  onMouseLeave={hasHover ? e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)' : undefined}
                >
                  (81) 92150-1252
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: '2rem' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            © 2025 JR Rações · Aldeia, Camaragibe — PE. Todos os direitos reservados.
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            Aldeia, Camaragibe — PE
          </p>
        </div>
      </div>
    </footer>
  )
}
