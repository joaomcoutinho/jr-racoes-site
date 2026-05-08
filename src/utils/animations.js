/**
 * Shared Framer Motion animation variants for JR Rações site.
 * All slide-in animations use a spring-like ease for a fluid, snappy feel.
 */

const EASE = [0.16, 1, 0.3, 1]

/* ── Base slide factories ────────────────────────────────── */

export function slideLeft(delay = 0, distance = 70) {
  return {
    initial:     { opacity: 0, x: -distance },
    whileInView: { opacity: 1, x: 0 },
    viewport:    { once: true, margin: '-60px' },
    transition:  { duration: 0.75, delay, ease: EASE },
  }
}

export function slideRight(delay = 0, distance = 70) {
  return {
    initial:     { opacity: 0, x: distance },
    whileInView: { opacity: 1, x: 0 },
    viewport:    { once: true, margin: '-60px' },
    transition:  { duration: 0.75, delay, ease: EASE },
  }
}

export function slideUp(delay = 0, distance = 50) {
  return {
    initial:     { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-60px' },
    transition:  { duration: 0.75, delay, ease: EASE },
  }
}

/**
 * Returns slideLeft or slideRight based on index:
 *   even → from left, odd → from right
 */
export function slideAlternating(index, delay = 0, distance = 60) {
  return index % 2 === 0
    ? slideLeft(delay, distance)
    : slideRight(delay, distance)
}

/* ── Hero entry (no scrollTrigger — plays immediately on mount) ── */
export const heroLeft = {
  initial:  { opacity: 0, x: -80 },
  animate:  { opacity: 1, x: 0 },
  transition: { duration: 0.9, ease: EASE, delay: 0.2 },
}

export const heroRight = {
  initial:  { opacity: 0, x: 80 },
  animate:  { opacity: 1, x: 0 },
  transition: { duration: 1.0, ease: EASE, delay: 0.45 },
}

/* ── Stagger container ─────────────────────────────────────── */
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

export const staggerChildLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
}

export const staggerChildRight = {
  hidden:  { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
}

export const staggerChildUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}
