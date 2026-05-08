export function SectionBadge({ children, light = false, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 border-2 rounded-pill px-5 py-2 font-display text-xs font-bold tracking-widest uppercase mb-5 ${
      light
        ? 'border-white/40 text-white bg-white/10'
        : 'border-navy text-navy'
    } ${className}`}>
      {children}
    </div>
  )
}
