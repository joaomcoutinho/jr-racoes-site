import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'

/* Detecta se o dispositivo tem hover real (mouse) */
function useHasHover() {
  const [hasHover, setHasHover] = useState(false)
  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches)
  }, [])
  return hasHover
}

const WA_URL =
  'https://wa.me/5581996512589?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações.'

/* Anel de pulso único — div block, dimensões explícitas */
function PulseRing({ delay = 0 }) {
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: '#2E5BFF',
        pointerEvents: 'none',
        transformOrigin: 'center center',
      }}
      animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
        repeatDelay: 0.3,
      }}
    />
  )
}

export function WhatsAppFAB() {
  const controls  = useAnimation()
  const hasHover  = useHasHover()
  const shownRef  = useRef(false)

  /* Entrada com spring após 1.5 s */
  useEffect(() => {
    const t = setTimeout(() => {
      controls.start({
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', stiffness: 220, damping: 14 },
      })
      shownRef.current = true
    }, 1500)
    return () => clearTimeout(t)
  }, [controls])

  /* Ao voltar do WhatsApp no mobile, o bfcache reseta o framer-motion
     para o estado initial (scale 0, opacity 0). Escutamos visibilitychange
     e re-exibimos o botão instantaneamente se ele já havia aparecido. */
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'visible' && shownRef.current) {
        controls.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.15, ease: 'easeOut' },
        })
      }
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [controls])

  /* Saída do hover: retorno instantâneo (0.12 s easeOut) */
  const onHoverEnd = () => {
    controls.start({
      scale: 1,
      y: 0,
      rotate: 0,
      boxShadow: '4px 4px 0 0 #1A2370',
      transition: { duration: 0.12, ease: 'easeOut' },
    })
  }

  return (
    /* Wrapper fixo — containing block dos anéis e do botão */
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 9999,
        width: 60,
        height: 60,
      }}
    >
      {/* Anéis defasados de 1 s entre si */}
      <PulseRing delay={0} />
      <PulseRing delay={1} />

      {/* Botão */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale no WhatsApp"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#2E5BFF',
          borderRadius: '50%',
          border: '3px solid #1A2370',
          boxShadow: '4px 4px 0 0 #1A2370',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          zIndex: 1,
          textDecoration: 'none',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
        whileHover={hasHover ? {
          scale: 1.13,
          y: -4,
          rotate: 12,
          boxShadow: '0 0 0 0 #1A2370',
          transition: { type: 'spring', stiffness: 350, damping: 18 },
        } : undefined}
        onHoverEnd={hasHover ? onHoverEnd : undefined}
        whileTap={{ scale: 0.92, rotate: 0, transition: { duration: 0.08 } }}
      >
        <WhatsAppIcon size={30} />
      </motion.a>
    </div>
  )
}
