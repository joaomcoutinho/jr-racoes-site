import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionBadge } from '../ui/SectionBadge'
import { Button } from '../ui/Button'
import { PawDecor } from '../ui/PawDecor'
import { services } from '../../data/services'
import styles from './ServicesSection.module.css'

const EASE = [0.16, 1, 0.3, 1]

gsap.registerPlugin(ScrollTrigger)

function ServiceCard({ service }) {
  const waUrl = `https://wa.me/5581996512589?text=${encodeURIComponent(service.whatsappMsg)}`
  return (
    <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <img src={service.image} alt={service.title} className={styles.cardImg} loading="lazy" />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDesc}>{service.description}</p>
        <span className={styles.cardCta}>
          Agendar via WhatsApp <ArrowUpRight size={14} />
        </span>
      </div>
    </a>
  )
}

export function ServicesSection() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    // Mobile: skip GSAP, CSS grid fallback handles it
    if (window.innerWidth < 900) return

    const ctx = gsap.context(() => {
      const cards = cardRefs.current   // [c0, c1, c2, c3, c4]

      // Card[0] visible; all others wait below the clip area
      gsap.set(cards[0], { y: '0%' })
      gsap.set(cards.slice(1), { y: '108%' })

      /*
        Timeline layout (units):
          Each card gets: transitionDur to enter + holdDur to be read
          Transitions overlap: prev exits while next enters

          step = transitionDur + holdDur
          card i transitions at position: i * step
          Total ≈ (n-1)*step + final-hold  →  ~8.8 units for 5 cards
      */
      const transitionDur = 0.45
      const holdDur       = 0.7
      const step          = transitionDur + holdDur

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top top',
          end:     'bottom bottom',
          scrub:   1,
        },
      })

      for (let i = 0; i < cards.length - 1; i++) {
        const pos = i * step
        // Current card exits upward
        tl.to(cards[i],     { y: '-108%', duration: transitionDur, ease: 'expo.inOut' }, pos)
        // Next card enters from below simultaneously
        tl.to(cards[i + 1], { y: '0%',   duration: transitionDur, ease: 'expo.inOut' }, pos)
      }

      // Hold last card in view
      tl.to({}, { duration: holdDur }, '>')

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="servicos" ref={sectionRef} className={styles.section}>
      {/* PawDecor fora do sticky → cobre os 360 vh inteiros da seção */}
      <PawDecor theme="light" />

      {/* ── DESKTOP: sticky 2-column layout ── */}
      <div className={styles.sticky}>
        <div className={styles.layout}>

          {/* LEFT — slide from left */}
          <motion.div
            className={styles.colLeft}
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <SectionBadge>O que oferecemos</SectionBadge>
            <h2 className={styles.title}>
              Tudo que seu pet precisa,<br />num só lugar
            </h2>
            <p className={styles.subtitle}>
              Veterinário, banho&nbsp;&amp;&nbsp;tosa, rações, farmácia pet
              e delivery — sem precisar sair de Aldeia, com preço
              justo e atendimento de quem conhece o seu pet.
            </p>
            <Button
              variant="whatsapp"
              href="https://wa.me/5581996512589?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20JR%20Rações."
            >
              Fale no WhatsApp
            </Button>
          </motion.div>

          {/* RIGHT — scroll-driven card stack */}
          <div className={styles.colRight}>
            {services.map((s, i) => (
              <div
                key={s.id}
                className={styles.cardWrap}
                ref={el => { cardRefs.current[i] = el }}
              >
                <ServiceCard service={s} />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── MOBILE ONLY ─────────────────────────────────── */}
      <div className={styles.mobileWrapper}>

        {/* Header — visível só no mobile */}
        <motion.div
          className={styles.mobileHeader}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <SectionBadge>O que oferecemos</SectionBadge>
          <h2 className={styles.mobileTitle}>
            Tudo que seu pet precisa,<br />num só lugar
          </h2>
          <p className={styles.mobileSubtitle}>
            Veterinário, rações, banho&nbsp;&amp;&nbsp;tosa, farmácia pet
            e delivery — tudo aqui em Aldeia.
          </p>
          <Button
            variant="whatsapp"
            href="https://wa.me/5581996512589?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20JR%20Rações."
          >
            Fale no WhatsApp
          </Button>
        </motion.div>

        {/* Cards grid */}
        <div className={styles.mobileGrid}>
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              className={styles.mobileItem}
              initial={{ opacity: 0, x: i % 2 === 0 ? -55 : 55 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.06 * i, ease: EASE }}
            >
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
