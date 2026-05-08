/**
 * Logo oficial do Mercado Livre como SVG inline.
 * Oval amarela (#FFE600) com borda navy e aperto de mãos branco.
 */
export function MercadoLivreIcon({ height = 38 }) {
  const width = Math.round(height * 200 / 128)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 128"
      width={width}
      height={height}
      aria-label="Mercado Livre"
    >
      {/* Borda externa navy */}
      <ellipse cx="100" cy="64" rx="100" ry="64" fill="#003087" />
      {/* Fundo amarelo */}
      <ellipse cx="100" cy="64" rx="91" ry="55" fill="#FFE600" />

      {/* ── Mão superior (mão direita, vem da direita) ── */}
      <path
        d="M 46,36
           C 70,31 96,31 122,33
           C 148,35 168,37 186,41
           L 186,57
           C 168,54 148,52 122,50
           C 96,48 70,48 48,53
           C 38,55 29,57 22,55
           C 16,52 14,45 18,40
           C 21,35 32,34 46,36 Z"
        fill="white"
        stroke="#003087"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Polegar da mão superior (curva para cima à esquerda) */}
      <path
        d="M 44,38
           C 36,26 25,19 17,20
           C 10,21 8,28 10,36
           C 12,43 22,47 33,46
           C 39,45 43,42 46,38 Z"
        fill="white"
        stroke="#003087"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* ── Mão inferior (mão esquerda, vem da esquerda) ── */}
      <path
        d="M 14,66
           C 38,60 63,59 88,61
           C 113,63 138,64 160,63
           C 172,63 181,63 186,65
           L 186,81
           C 181,81 172,81 160,80
           C 138,81 113,80 88,78
           C 63,76 38,76 14,83 Z"
        fill="white"
        stroke="#003087"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Nós dos dedos — 4 saliências na esquerda */}
      <path d="M 18,66 Q 25,59 32,66" fill="none" stroke="#003087" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 32,64 Q 39,57 46,64" fill="none" stroke="#003087" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 46,63 Q 53,56 60,63" fill="none" stroke="#003087" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 60,62 Q 67,55 74,62" fill="none" stroke="#003087" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  )
}
