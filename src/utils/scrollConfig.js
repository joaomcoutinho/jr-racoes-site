/**
 * Configuração global de scroll suave para react-scroll.
 *
 * easing: "easeOutQuart" → arranca imediatamente ao clique e
 *         desacelera suavemente ao chegar — sem delay perceptível.
 *
 * duration: dinâmica mas curta — máximo 500ms para que o movimento
 *           nunca pareça lento, mesmo em scrolls longos.
 */
export const SCROLL_CONFIG = {
  spy:      true,
  smooth:   'easeOutQuart',
  duration: (distancePx) => Math.min(Math.max(Math.abs(distancePx) * 0.3, 200), 500),
  offset:   -80,
}
