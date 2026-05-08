import styles from './PawDecor.module.css'

/* SVG de patinha com almofadas corretas (pad central + 4 dedos) */
function PawSvg({ variant }) {
  const fill   = variant === 'fill'   ? 'currentColor' : 'none'
  const stroke = variant === 'stroke' ? 'currentColor' : 'none'
  const sw     = variant === 'stroke' ? 2.5 : 0

  return (
    <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}>
      <ellipse cx="26" cy="38" rx="13" ry="11" fill={fill} stroke={stroke} strokeWidth={sw}/>
      <ellipse cx="9"  cy="24" rx="6"  ry="8"
        transform="rotate(-22 9 24)"  fill={fill} stroke={stroke} strokeWidth={sw}/>
      <ellipse cx="19" cy="14" rx="5.5" ry="7.5" fill={fill} stroke={stroke} strokeWidth={sw}/>
      <ellipse cx="32" cy="14" rx="5.5" ry="7.5" fill={fill} stroke={stroke} strokeWidth={sw}/>
      <ellipse cx="43" cy="24" rx="6"  ry="8"
        transform="rotate(22 43 24)"  fill={fill} stroke={stroke} strokeWidth={sw}/>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────
   28 patinhas cobrindo 1 % → 98 % da altura da seção pai.
   Distribuição uniforme: ~1 patinha a cada 3.5 % de altura.
   ───────────────────────────────────────────────────────────────── */
const LIGHT_PAWS = [
  /* y ≈  1–10 % */
  { x: '3%',  y: '1%',  rot: -22, size: 44, color: '#1A2370', opacity: 0.09, variant: 'stroke', dur: 7.0, delay: 0.0 },
  { x: '82%', y: '4%',  rot:  18, size: 30, color: '#2E5BFF', opacity: 0.11, variant: 'fill',   dur: 5.5, delay: 0.4 },
  { x: '44%', y: '3%',  rot: -15, size: 22, color: '#4DA8DA', opacity: 0.12, variant: 'fill',   dur: 5.0, delay: 1.1 },
  { x: '58%', y: '8%',  rot:  -8, size: 58, color: '#1A2370', opacity: 0.07, variant: 'fill',   dur: 8.0, delay: 1.0 },
  /* y ≈ 11–24 % */
  { x: '15%', y: '13%', rot:  28, size: 36, color: '#F5A623', opacity: 0.12, variant: 'stroke', dur: 6.0, delay: 0.7 },
  { x: '92%', y: '17%', rot: -32, size: 50, color: '#2E5BFF', opacity: 0.08, variant: 'fill',   dur: 7.5, delay: 1.3 },
  { x: '38%', y: '22%', rot:   6, size: 28, color: '#4DA8DA', opacity: 0.10, variant: 'stroke', dur: 9.0, delay: 0.3 },
  /* y ≈ 25–39 % */
  { x: '70%', y: '26%', rot:  -6, size: 46, color: '#1A2370', opacity: 0.08, variant: 'fill',   dur: 5.0, delay: 0.9 },
  { x: '5%',  y: '31%', rot:  38, size: 34, color: '#F5A623', opacity: 0.12, variant: 'stroke', dur: 6.5, delay: 1.6 },
  { x: '60%', y: '35%', rot: -14, size: 56, color: '#2E5BFF', opacity: 0.07, variant: 'fill',   dur: 7.0, delay: 0.5 },
  /* y ≈ 40–54 % */
  { x: '25%', y: '40%', rot:  20, size: 40, color: '#1A2370', opacity: 0.10, variant: 'stroke', dur: 8.5, delay: 1.1 },
  { x: '88%', y: '44%', rot: -25, size: 26, color: '#4DA8DA', opacity: 0.11, variant: 'fill',   dur: 6.0, delay: 0.2 },
  { x: '47%', y: '49%', rot:  12, size: 50, color: '#1A2370', opacity: 0.08, variant: 'stroke', dur: 7.5, delay: 0.8 },
  { x: '28%', y: '46%', rot:  18, size: 38, color: '#F5A623', opacity: 0.10, variant: 'stroke', dur: 7.0, delay: 0.6 },
  /* y ≈ 55–69 % */
  { x: '10%', y: '53%', rot: -18, size: 38, color: '#F5A623', opacity: 0.13, variant: 'fill',   dur: 5.5, delay: 1.4 },
  { x: '78%', y: '57%', rot:  30, size: 52, color: '#2E5BFF', opacity: 0.08, variant: 'stroke', dur: 8.0, delay: 0.6 },
  { x: '32%', y: '62%', rot:  -5, size: 32, color: '#1A2370', opacity: 0.11, variant: 'fill',   dur: 6.5, delay: 1.2 },
  { x: '64%', y: '66%', rot:  22, size: 44, color: '#4DA8DA', opacity: 0.09, variant: 'stroke', dur: 7.0, delay: 0.0 },
  /* y ≈ 70–84 % */
  { x: '1%',  y: '70%', rot: -35, size: 60, color: '#1A2370', opacity: 0.06, variant: 'fill',   dur: 9.0, delay: 0.9 },
  { x: '52%', y: '74%', rot:  15, size: 28, color: '#F5A623', opacity: 0.13, variant: 'stroke', dur: 5.0, delay: 1.7 },
  { x: '86%', y: '78%', rot:  -9, size: 48, color: '#2E5BFF', opacity: 0.09, variant: 'fill',   dur: 7.5, delay: 0.3 },
  { x: '20%', y: '82%', rot:  26, size: 36, color: '#1A2370', opacity: 0.10, variant: 'stroke', dur: 6.0, delay: 1.0 },
  /* y ≈ 85–98 % */
  { x: '72%', y: '86%', rot: -20, size: 52, color: '#4DA8DA', opacity: 0.08, variant: 'fill',   dur: 8.0, delay: 0.5 },
  { x: '40%', y: '90%', rot:   8, size: 30, color: '#F5A623', opacity: 0.12, variant: 'stroke', dur: 5.5, delay: 1.3 },
  { x: '75%', y: '83%', rot: -28, size: 32, color: '#2E5BFF', opacity: 0.11, variant: 'fill',   dur: 6.0, delay: 1.8 },
  { x: '6%',  y: '93%', rot:  34, size: 46, color: '#1A2370', opacity: 0.08, variant: 'fill',   dur: 7.0, delay: 0.7 },
  { x: '58%', y: '96%', rot: -12, size: 24, color: '#2E5BFF', opacity: 0.10, variant: 'stroke', dur: 6.5, delay: 1.5 },
  { x: '90%', y: '98%', rot:  40, size: 54, color: '#1A2370', opacity: 0.07, variant: 'fill',   dur: 8.5, delay: 0.4 },
]

/* ─────────────────────────────────────────────────────────────────
   22 patinhas para fundos escuros (navy). Mesma cobertura vertical.
   ───────────────────────────────────────────────────────────────── */
const DARK_PAWS = [
  /* y ≈  1–20 % */
  { x: '4%',  y: '2%',  rot: -20, size: 50, color: '#FFFFFF', opacity: 0.07, variant: 'stroke', dur: 7.0, delay: 0.0 },
  { x: '85%', y: '5%',  rot:  16, size: 32, color: '#4DA8DA', opacity: 0.12, variant: 'fill',   dur: 5.5, delay: 0.4 },
  { x: '55%', y: '10%', rot:  -9, size: 58, color: '#FFFFFF', opacity: 0.05, variant: 'fill',   dur: 8.0, delay: 1.0 },
  { x: '18%', y: '15%', rot:  26, size: 38, color: '#F5A623', opacity: 0.13, variant: 'stroke', dur: 6.0, delay: 0.7 },
  /* y ≈ 21–39 % */
  { x: '90%', y: '20%', rot: -30, size: 44, color: '#4DA8DA', opacity: 0.09, variant: 'fill',   dur: 7.5, delay: 1.3 },
  { x: '35%', y: '25%', rot:   8, size: 28, color: '#FFFFFF', opacity: 0.07, variant: 'stroke', dur: 9.0, delay: 0.3 },
  { x: '68%', y: '30%', rot:  -5, size: 48, color: '#F5A623', opacity: 0.12, variant: 'fill',   dur: 5.0, delay: 0.9 },
  { x: '8%',  y: '36%', rot:  34, size: 40, color: '#4DA8DA', opacity: 0.10, variant: 'stroke', dur: 6.5, delay: 1.6 },
  /* y ≈ 40–57 % */
  { x: '60%', y: '41%', rot: -16, size: 54, color: '#FFFFFF', opacity: 0.05, variant: 'fill',   dur: 7.0, delay: 0.5 },
  { x: '28%', y: '46%', rot:  22, size: 34, color: '#F5A623', opacity: 0.13, variant: 'stroke', dur: 8.5, delay: 1.1 },
  { x: '82%', y: '51%', rot: -24, size: 26, color: '#4DA8DA', opacity: 0.11, variant: 'fill',   dur: 6.0, delay: 0.2 },
  { x: '45%', y: '56%', rot:  10, size: 46, color: '#FFFFFF', opacity: 0.07, variant: 'stroke', dur: 7.5, delay: 0.8 },
  /* y ≈ 58–74 % */
  { x: '12%', y: '61%', rot: -18, size: 36, color: '#F5A623', opacity: 0.12, variant: 'fill',   dur: 5.5, delay: 1.4 },
  { x: '75%', y: '66%', rot:  28, size: 52, color: '#4DA8DA', opacity: 0.09, variant: 'stroke', dur: 8.0, delay: 0.6 },
  { x: '30%', y: '71%', rot:  -7, size: 30, color: '#FFFFFF', opacity: 0.07, variant: 'fill',   dur: 6.5, delay: 1.2 },
  { x: '62%', y: '74%', rot:  20, size: 42, color: '#F5A623', opacity: 0.13, variant: 'stroke', dur: 7.0, delay: 0.0 },
  /* y ≈ 75–98 % */
  { x: '2%',  y: '79%', rot: -38, size: 56, color: '#FFFFFF', opacity: 0.05, variant: 'fill',   dur: 9.0, delay: 0.9 },
  { x: '50%', y: '84%', rot:  14, size: 24, color: '#4DA8DA', opacity: 0.12, variant: 'stroke', dur: 5.0, delay: 1.7 },
  { x: '88%', y: '88%', rot: -10, size: 44, color: '#FFFFFF', opacity: 0.06, variant: 'fill',   dur: 7.5, delay: 0.3 },
  { x: '22%', y: '92%', rot:  32, size: 32, color: '#F5A623', opacity: 0.13, variant: 'stroke', dur: 6.0, delay: 1.0 },
  { x: '70%', y: '96%', rot: -22, size: 50, color: '#4DA8DA', opacity: 0.08, variant: 'fill',   dur: 8.0, delay: 0.5 },
  { x: '40%', y: '98%', rot:   6, size: 28, color: '#FFFFFF', opacity: 0.07, variant: 'stroke', dur: 5.5, delay: 1.3 },
]

/* ────────────────────────────── */

export function PawDecor({ theme = 'light' }) {
  const paws = theme === 'dark' ? DARK_PAWS : LIGHT_PAWS

  return (
    <div className={styles.wrap} aria-hidden>
      {paws.map((p, i) => (
        <div
          key={i}
          className={styles.paw}
          style={{
            left:      p.x,
            top:       p.y,
            width:     p.size,
            height:    p.size,
            color:     p.color,
            opacity:   p.opacity,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <div
            className={styles.inner}
            style={{ '--dur': `${p.dur}s`, '--delay': `${p.delay}s` }}
          >
            <PawSvg variant={p.variant} />
          </div>
        </div>
      ))}
    </div>
  )
}
