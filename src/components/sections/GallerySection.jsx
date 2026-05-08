import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'
import { SectionBadge } from '../ui/SectionBadge'
import { Button } from '../ui/Button'
import styles from './GallerySection.module.css'

const galleryImages = [
  new URL('../../assets/images/67beb2def4f6a878320ccbbe_pet1_6df36d2d61c6.webp', import.meta.url).href,
  new URL('../../assets/images/67beb2de994946ca0bc12ab6_pet2_bcd5abc7e14d.webp', import.meta.url).href,
  new URL('../../assets/images/67beb2dec9f3973db234539d_pet3_d43900fffdd1.webp', import.meta.url).href,
  new URL('../../assets/images/67beb2df5de595b80a5c9ed2_pet4_1edf76a889dd.webp', import.meta.url).href,
  new URL('../../assets/images/67beb2de60f077ebbf481063_pet5_f5cfe3ea16b3.webp', import.meta.url).href,
  new URL('../../assets/images/67beb2de3332e852e662e982_pet6_ae1d38a520a9.webp', import.meta.url).href,
]

export function GallerySection() {
  return (
    <section id="galeria" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionBadge>Instagram</SectionBadge>
          <h2 className={styles.title}>Nossos pets favoritos 🐾</h2>
        </div>

        <div className={styles.grid}>
          {galleryImages.map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/jr.racooes"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imgWrap}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              aria-label={`Ver no Instagram — foto ${i + 1}`}
            >
              <img src={src} alt={`Pet JR Rações ${i + 1}`} className={styles.img} loading="lazy" />
              <div className={styles.overlay}>
                <Share2 size={36} color="white" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className={styles.cta}>
          <Button variant="ghost-navy" href="https://instagram.com/jr.racooes">
            Seguir no Instagram @jr.racooes
          </Button>
        </div>
      </div>
    </section>
  )
}
