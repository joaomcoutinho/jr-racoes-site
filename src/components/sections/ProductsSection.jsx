import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionBadge } from '../ui/SectionBadge'
import { BrandTicker } from '../ui/BrandTicker'
import { PawDecor } from '../ui/PawDecor'
import mlLogo from '../../assets/images/image-removebg-preview.png'
import { products } from '../../data/products'
import styles from './ProductsSection.module.css'

const EASE     = [0.16, 1, 0.3, 1]
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] // suave, natural, sem overshooting

function ProductCard({ product, index }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: EASE_OUT }}
    >
      <img src={product.image} alt={product.name} className={styles.cardImg} loading="lazy" />
      <div className={styles.cardBody}>
        <span className={styles.badge}>{product.category}</span>
        <h3 className={styles.cardName}>{product.name}</h3>
        <p className={styles.cardBrand}>{product.brand}</p>
        <a href={product.mlUrl} target="_blank" rel="noopener noreferrer" className={styles.cardBtn}>
          <ExternalLink size={13} /> Ver no Mercado Livre
        </a>
      </div>
    </motion.div>
  )
}

export function ProductsSection() {
  return (
    <section id="produtos" className={styles.section}>
      <PawDecor theme="dark" />
      <div className={styles.container}>
        {/* Header entra da esquerda */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <SectionBadge light>Produtos selecionados</SectionBadge>
          <h2 className={styles.title}>As marcas que seu pet merece, com o preço justo</h2>

          <div className={styles.mlNote}>
            <img src={mlLogo} alt="Mercado Livre" className={styles.mlLogo} />
            Compre com segurança pelo Mercado Livre ou fale direto no WhatsApp
          </div>
        </motion.div>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* Ticker sobe suavemente — sem deslocamento horizontal para não quebrar o overflow do ticker */}
        <motion.div
          className={styles.tickerSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className={styles.tickerTitle}>Marcas que trabalhamos</p>
          <BrandTicker />
        </motion.div>
      </div>
    </section>
  )
}
