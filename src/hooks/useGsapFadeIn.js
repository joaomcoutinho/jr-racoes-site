import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGsapFadeIn(containerRef, selector = '.animate-in', options = {}) {
  useEffect(() => {
    if (!containerRef.current) return
    const elements = containerRef.current.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        opacity: 0,
        y: options.y ?? 60,
        duration: options.duration ?? 0.8,
        stagger: options.stagger ?? 0.15,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: options.start ?? 'top 85%',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, selector])
}

export function useGsapParallax(ref, yRange = 60) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y: -yRange / 2 },
        {
          y: yRange / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [ref, yRange])
}
