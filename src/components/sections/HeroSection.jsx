import { scroller } from 'react-scroll'
import { SCROLL_CONFIG } from '../../utils/scrollConfig'
import { motion } from 'framer-motion'
import { SectionBadge } from '../ui/SectionBadge'
import { Button } from '../ui/Button'
import { PawDecor } from '../ui/PawDecor'
import { useAutoSlider } from '../../hooks/useAutoSlider'
import styles from './HeroSection.module.css'

const EASE = [0.16, 1, 0.3, 1]

const slideImages = [
  { src: new URL('../../assets/images/67beb2def4f6a878320ccbbe_pet1_6df36d2d61c6.webp', import.meta.url).href,  fit: 'cover',   alt: 'Papagaio branco' },
  { src: new URL('../../assets/images/image.png', import.meta.url).href,  fit: 'cover', alt: 'Porquinho-da-índia' },
  { src: new URL('../../assets/images/67beb2dec9f3973db234539d_pet3_d43900fffdd1.webp', import.meta.url).href,  fit: 'cover',   alt: 'Filhote de Husky' },
  { src: new URL('../../assets/images/67beb2df5de595b80a5c9ed2_pet4_1edf76a889dd.webp', import.meta.url).href,  fit: 'cover',   alt: 'Gatinho laranja' },
  { src: new URL('../../assets/images/67beb2de60f077ebbf481063_pet5_f5cfe3ea16b3.webp', import.meta.url).href,  fit: 'cover',   alt: 'Spitz Alemão' },
  { src: new URL('../../assets/images/coelho_preto.webp', import.meta.url).href,  fit: 'cover', alt: 'Coelho branco' },
]


export function HeroSection() {
  const { current, goTo } = useAutoSlider(slideImages.length, 3500)

  return (
    <section id="hero" className={styles.section}>
      <PawDecor theme="light" />

      <div className={styles.container}>
        {/* Left col — elementos entram da esquerda em cascata */}
        <div className={styles.left}>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <SectionBadge>🐾 Petshop completo em Aldeia, Camaragibe</SectionBadge>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
          >
            Cuidado real,{' '}
            <span className={styles.titleGold}>perto</span>
            {' '}de você{' '}
            <br />aqui em{' '}
            <span className={styles.titleGold}>Aldeia</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          >
            Veterinário, rações, banho&nbsp;&amp;&nbsp;tosa, farmácia pet e delivery
            — tudo em um só lugar no coração de Aldeia, Camaragibe.
          </motion.p>

          <motion.div
            className={styles.btnGroup}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.56, ease: EASE }}
          >
            <Button
              variant="whatsapp"
              href="https://wa.me/5581996512589?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20a%20JR%20Rações."
            >
              Fale no WhatsApp
            </Button>
            <Button
              variant="ghost-navy"
              href="#servicos"
              onClick={e => { e.preventDefault(); scroller.scrollTo('servicos', SCROLL_CONFIG) }}
            >
              Nossos Serviços
            </Button>
          </motion.div>

        </div>

        {/* Right col — slideshow entra da direita */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 90 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.35, ease: EASE }}
        >
          <div className={styles.slideWrapper}>
            {slideImages.map((slide, i) => (
              <div
                key={i}
                className={styles.slide}
                style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : 1 }}
              >
                {/* Fundo desfocado para imagens landscape — elimina barras brancas */}
                {slide.fit === 'contain' && (
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${slide.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(28px) brightness(0.82) saturate(0.7)',
                      transform: 'scale(1.18)',
                      zIndex: 0,
                    }}
                  />
                )}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  style={{ objectFit: slide.fit, position: 'relative', zIndex: 1 }}
                />
              </div>
            ))}
          </div>
          <div className={styles.dots}>
            {slideImages.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
