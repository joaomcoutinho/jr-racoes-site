import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { SectionBadge } from '../ui/SectionBadge'
import { Button } from '../ui/Button'
import styles from './ContactSection.module.css'

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const units = [
  {
    name: '🐾 JR Rações — Aldeia',
    address: 'Estrada de Aldeia, km 10,5 após a entrada do Vera Cruz',
    phones: [
      { label: '(81) 99651-2589', href: 'tel:+5581996512589' },
      { label: '(81) 92150-1252', href: 'tel:+5581921501252' },
    ],
    whatsapp: 'https://wa.me/5581996512589?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20visita%20na%20unidade%20Aldeia.',
    maps: 'https://maps.google.com/?q=Estrada+de+Aldeia+Recife+PE',
  }
]

const EASE = [0.16, 1, 0.3, 1]

export function ContactSection() {
  return (
    <section id="contato" className={styles.section}>
      {/* Header: badge da esquerda, título da direita */}
      <motion.div
        style={{ textAlign: 'center', marginBottom: '3rem' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <SectionBadge>Como nos encontrar</SectionBadge>
        <h2 style={{ fontFamily: 'Montserrat', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: '#1A2370' }}>
          Fale agora e agende o atendimento do seu pet em Aldeia
        </h2>
      </motion.div>

      <div className={styles.container}>
        {/* CTA card — entra da esquerda */}
        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <h3 className={styles.ctaTitle}>Agende o atendimento do seu pet em Aldeia</h3>
          <p className={styles.ctaText}>
            Estamos aqui para você e seu pet, Segunda a Sábado a partir das 7h. Manda um Zap ou liga — resposta rápida garantida.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter', fontSize: 14 }}>
            <Clock size={16} />
            Seg. a Sáb. a partir das 7h · Aldeia, Camaragibe
          </div>
          <div className={styles.ctaBtns}>
            <Button variant="whatsapp"
              href="https://wa.me/5581996512589?text=Olá!%20Gostaria%20de%20agendar%20uma%20visita.">
              WhatsApp
            </Button>
            <Button href="tel:81996512589" iconLeft>
              Ligar
            </Button>
          </div>

          {/* Redes sociais */}
          <div className={styles.socialDivider} />
          <p className={styles.socialLabel}>Siga nas redes sociais</p>
          <div className={styles.socialBtns}>
            <a
              href="https://www.instagram.com/jr.racooes/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.socialBtnInsta}`}
            >
              <InstagramIcon /> Instagram
            </a>
            <a
              href="https://www.facebook.com/jjrracoes/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialBtn} ${styles.socialBtnFb}`}
            >
              <FacebookIcon /> Facebook
            </a>
          </div>
        </motion.div>

        {/* Right: addresses + map — entra da direita */}
        <div className={styles.right}>
          {units.map((u, i) => (
            <motion.div
              key={i}
              className={styles.addressCard}
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            >
              <div className={styles.unitName}>
                <MapPin size={16} color="#2E5BFF" />
                {u.name}
              </div>
              <p className={styles.unitDetail}>{u.address}</p>
              {u.phones.map(p => (
                <p key={p.href} className={styles.unitDetail} style={{ marginTop: 4 }}>
                  <Phone size={12} style={{ display: 'inline', marginRight: 4 }} />
                  <a href={p.href} style={{ color: 'inherit', textDecoration: 'none' }}>{p.label}</a>
                </p>
              ))}
              <a href={u.maps} target="_blank" rel="noopener noreferrer" className={styles.unitLink}>
                <ExternalLink size={12} /> Ver no Google Maps
              </a>
            </motion.div>
          ))}

          {/* Map — entra da direita com delay, ocupa o espaço restante */}
          <motion.div
            className={styles.mapWrapper}
            style={{ flex: 1, minHeight: 0 }}
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63304.24!2d-35.0500!3d-7.9700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18b6932200fb%3A0x37a5a0c9c71ee68a!2sCamaragibe%2C+PE!5e0!3m2!1spt-BR!2sbr!4v1"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="JR Rações — Aldeia, Camaragibe/PE"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
