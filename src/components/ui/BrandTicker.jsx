import { useEffect, useRef } from 'react'
import styles from './BrandTicker.module.css'
import { logos } from '../../data/products'

export function BrandTicker() {
  const trackRef = useRef(null)
  const rafRef   = useRef(null)
  const posRef   = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let started = false

    function startAnimation() {
      if (started) return
      started = true

      // Mede a largura real após as imagens carregarem
      const halfWidth = track.scrollWidth / 2
      if (halfWidth <= 0) return

      // Velocidade proporcional à largura, igual à duração do CSS original
      const isMobile = window.innerWidth < 640
      const duration = isMobile ? 20 : 45 // segundos
      const pxPerFrame = halfWidth / duration / 60 // 60fps

      function tick() {
        posRef.current -= pxPerFrame
        // Reset suave quando completa um ciclo (volta ao início sem salto)
        if (Math.abs(posRef.current) >= halfWidth) {
          posRef.current = posRef.current + halfWidth
        }
        track.style.transform = `translateX(${posRef.current}px)`
        rafRef.current = requestAnimationFrame(tick)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    // Aguarda todas as imagens carregarem antes de medir e animar
    const images = Array.from(track.querySelectorAll('img'))
    const notLoaded = images.filter(img => !img.complete)

    if (notLoaded.length === 0) {
      // Todas já em cache — inicia imediatamente
      startAnimation()
    } else {
      let remaining = notLoaded.length
      notLoaded.forEach(img => {
        const done = () => {
          remaining--
          if (remaining === 0) startAnimation()
        }
        img.addEventListener('load',  done, { once: true })
        img.addEventListener('error', done, { once: true })
      })
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const doubled = [...logos, ...logos]

  return (
    <div className={styles.wrapper}>
      <div ref={trackRef} className={styles.track}>
        {doubled.map((logo, i) => (
          <span key={i} className={styles.brand}>
            <img src={logo} alt="logo" className={styles.logo} />
          </span>
        ))}
      </div>
    </div>
  )
}
