import { motion } from 'framer-motion'
import { SectionBadge } from '../ui/SectionBadge'
import { PawDecor } from '../ui/PawDecor'
import { testimonials } from '../../data/testimonials'
import styles from './TestimonialsSection.module.css'

const EASE     = [0.16, 1, 0.3, 1]
const EASE_OUT = [0.25, 0.46, 0.45, 0.94]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className={styles.section}>
      <PawDecor theme="dark" />

      {/* Header: título entra da esquerda, subtítulo da direita */}
      <div className={styles.header}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionBadge light>Quem confia na JR Rações</SectionBadge>
          <h2 className={styles.title}>Clientes reais de Aldeia que confiam na gente</h2>
        </motion.div>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          Avaliação média de 4,6 ★ no Google — mais de 300 avaliações de clientes reais de Aldeia
        </motion.p>
      </div>

      <div className={styles.grid}>
        {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.52, delay: i * 0.07, ease: EASE_OUT }}
            >
              <div className={styles.cardTop}>
                <img src={t.avatar} alt={t.name} className={styles.avatar} loading="lazy" />
                <div>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.location}>{t.location}</p>
                </div>
              </div>
              <div className={styles.stars}>{'★'.repeat(t.rating)}</div>
              <p className={styles.text}>"{t.text}"</p>
            </motion.div>
        ))}
      </div>
    </section>
  )
}
