import { useState, useEffect, useRef } from 'react'

export function useAutoSlider(totalSlides, intervalMs = 3000) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  const reset = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % totalSlides)
    }, intervalMs)
  }

  useEffect(() => {
    reset()
    return () => clearInterval(intervalRef.current)
  }, [totalSlides, intervalMs])

  const goTo = (index) => {
    setCurrent(index)
    reset()
  }

  return { current, goTo }
}
