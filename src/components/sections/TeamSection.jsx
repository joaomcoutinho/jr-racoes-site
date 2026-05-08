import { motion } from 'framer-motion'
import { SectionBadge } from '../ui/SectionBadge'
import styles from './TeamSection.module.css'
import vet1Photo from '../../assets/images/vet-1.jpg'
import Logo from '../../assets/images/logo_arredondada_jr.jpg'

const EASE_OUT = [0.25, 0.46, 0.45, 0.94]

const team = [
  {
    id: 1,
    name: 'Fernanda Murakami',
    role: 'Médica Veterinária',
    photo: vet1Photo,
    specialties: [
      'Pós-graduanda em Clínica de Pequenos Animais',
      'Pós-graduanda em Clínica de Animais Silvestres e Exóticos',
    ],
    placeholder: false,
  },
  {
    id: 2,
    name: 'Aguardando',
    role: 'Médico(a) Veterinário(a)',
    photo: null,
    specialties: [],
    placeholder: true,
  },
  {
    id: 3,
    name: 'Aguardando',
    role: 'Médico(a) Veterinário(a)',
    photo: null,
    specialties: [],
    placeholder: true,
  },
]

function PlaceholderPhoto() {
  return (
    <div className={styles.photoPlaceholder}>
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span>Em breve</span>
    </div>
  )
}

export function TeamSection() {
  return (
    <section id="equipe" className={styles.section}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <SectionBadge>Nossa equipe</SectionBadge>
        <h2 className={styles.title}>Quem cuida do seu pet</h2>
        <p className={styles.subtitle}>
          Profissionais apaixonados por animais, com formação especializada e dedicação total ao bem-estar do seu pet.
        </p>
      </motion.div>

      {/* Cards */}
      <div className={styles.grid}>
        {team.map((member, i) => (
          <motion.div
            key={member.id}
            className={`${styles.card} ${member.placeholder ? styles.cardPlaceholder : ''}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE_OUT }}
          >
            {/* Photo area */}
            <div className={styles.photoWrap}>
              {member.photo
                ? <img src={member.photo} alt={member.name} className={styles.photo} />
                : <PlaceholderPhoto />
              }
              {!member.placeholder && (
                <div className={styles.photoBadge}>
                  <img src={Logo} alt="JR Rações" className={styles.badgeLogo} />
                </div>
              )}
            </div>

            {/* Info area */}
            <div className={styles.info}>
              <span className={styles.roleBadge}>{member.role}</span>
              <h3 className={styles.name}>{member.name}</h3>

              {member.placeholder ? (
                <p className={styles.placeholderText}>Informações em breve</p>
              ) : (
                <ul className={styles.specialties}>
                  {member.specialties.map((s, j) => (
                    <li key={j} className={styles.specialty}>
                      <span className={styles.dot} />
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
