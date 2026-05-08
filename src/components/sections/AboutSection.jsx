import { scroller } from 'react-scroll'
import { SCROLL_CONFIG } from '../../utils/scrollConfig'
import { useRef, useEffect } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { SectionBadge } from '../ui/SectionBadge'
import { Button } from '../ui/Button'
import { PawDecor } from '../ui/PawDecor'
import styles from './AboutSection.module.css'
import aboutImg from '../../assets/images/67beb2def57caeca528aa9a0_hero_b4848b621db6.webp'
import LogoArredondada from '../../assets/images/logo_arredondada_jr.jpg'

/* ── Contador animado ──────────────────────────────────────── */
function CountUp({ to, suffix = '', duration = 2, decimals = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) {
          const formatted = decimals > 0
            ? v.toFixed(decimals).replace('.', ',')
            : Math.round(v).toLocaleString('pt-BR')
          ref.current.textContent = formatted + suffix
        }
      },
    })
    return ctrl.stop
  }, [inView, to, suffix, duration, decimals])

  return <span ref={ref}>0{suffix}</span>
}

/* ── Dados ─────────────────────────────────────────────────── */
const metrics = [
  { to: 5,    suffix: '',   label: 'Serviços\nnum só lugar'  },
  { to: 20,   suffix: '+',  label: 'Anos cuidando\nem Aldeia' },
  { to: 4.6,  suffix: '',   decimals: 1, label: '★ Avaliação no Google\n+300 avaliações'  },
]

const EASE = [0.16, 1, 0.3, 1]

/* ── Variants framer-motion ────────────────────────────────── */
const titleVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const wordVariant = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

/* ── Componente ────────────────────────────────────────────── */
export function AboutSection() {
  return (
    <section id="sobre" className={styles.section}>
      <PawDecor theme="dark" />
      <div className={styles.bgNumber} aria-hidden>20</div>

      <div className={styles.bento}>

        {/* ── CELL A: Manifesto — entra da esquerda ─── */}
        <motion.div
          className={styles.cellManifesto}
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div>
            <SectionBadge light>Quem somos</SectionBadge>
          </div>

          <motion.h2
            className={styles.title}
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span className={styles.wordWhite}   variants={wordVariant}>Seu pet </motion.span>
            <motion.span className={styles.wordWhite}   variants={wordVariant}>tem quem </motion.span>
            <motion.span className={styles.wordWhite}   variants={wordVariant}>cuide dele </motion.span>
            <br />
            <motion.span className={styles.wordWhite}   variants={wordVariant}>aqui em </motion.span>
            <br />
            <motion.span className={styles.wordGold}    variants={wordVariant}>Aldeia</motion.span>
          </motion.h2>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
          >
            Há mais de 20 anos, a JR Rações é o petshop de confiança de quem
            mora em Aldeia e região. Aqui você encontra veterinário, rações das
            melhores marcas, banho&nbsp;&amp;&nbsp;tosa, farmácia pet e delivery
            — tudo num único endereço, com preço justo e atendimento que você
            recomenda para os vizinhos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.6, ease: EASE }}
          >
            <Button
              variant="ghost"
              href="#servicos"
              onClick={e => {
                e.preventDefault()
                scroller.scrollTo('servicos', SCROLL_CONFIG)
              }}
            >
              Veja todos os nossos serviços
            </Button>
          </motion.div>

        </motion.div>

        {/* ── CELL B: Foto — entra da direita ─────────── */}
        <motion.div
          className={styles.cellPhoto}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
        >
          <img
            src={aboutImg}
            alt="Equipe JR Rações atendendo clientes"
            className={styles.photo}
          />
          <div className={styles.photoOverlay} />

          {/* Badge anos */}
          <motion.div
            className={styles.yearBadge}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 260, damping: 18 }}
          >
            <span className={styles.yearNum}>20+</span>
            <span className={styles.yearLabel}>anos</span>
          </motion.div>

          {/* Badge logo */}
          <motion.div
            className={styles.logoBadge}
            initial={{ opacity: 0, x: -22, y: 8 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.65, ease: EASE }}
          >
            <div className={styles.badgeLogoWrap}>
              <img src={LogoArredondada} alt="JR Rações" className={styles.badgeLogo} />
            </div>
            <div>
              <p className={styles.badgeTitle}>Referência em Aldeia</p>
              <p className={styles.badgeSub}>Há mais de 20 anos cuidando</p>
            </div>
          </motion.div>
        </motion.div>


      </div>

      {/* ── METRICS STRIP — alternando esquerda / centro / direita ── */}
      <div className={styles.metricsStrip}>
        {metrics.map((m, i) => {
          const xFrom = i === 0 ? -50 : i === 2 ? 50 : 0
          const yFrom = i === 1 ? 30 : 0
          return (
            <motion.div
              key={i}
              className={styles.metricCard}
              initial={{ opacity: 0, x: xFrom, y: yFrom }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 * i, duration: 0.7, ease: EASE }}
            >
              <span className={styles.metricNum}>
                <CountUp to={m.to} suffix={m.suffix} decimals={m.decimals ?? 0} />
              </span>
              <span className={styles.metricLabel}>{m.label}</span>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
