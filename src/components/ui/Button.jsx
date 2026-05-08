import { ArrowRight } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'

export function Button({ variant = 'primary', href, children, className = '', iconLeft = false, ...props }) {
  const base = 'inline-flex items-center gap-2.5 px-8 py-3.5 rounded-pill font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer select-none'

  const variants = {
    primary:     'bg-electric text-white border-2 border-navy shadow-offset-navy [@media(hover:hover)]:hover:shadow-none [@media(hover:hover)]:hover:translate-y-0.5',
    ghost:       'bg-transparent text-white border-2 border-white [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-navy',
    'ghost-navy':'bg-transparent text-navy border-2 border-navy [@media(hover:hover)]:hover:bg-navy [@media(hover:hover)]:hover:text-white',
    whatsapp:    'bg-electric text-white border-2 border-navy shadow-offset-navy [@media(hover:hover)]:hover:shadow-none [@media(hover:hover)]:hover:translate-y-0.5',
  }

  const Tag = href ? 'a' : 'button'
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Tag
      className={`${base} ${variants[variant]} ${className}`}
      {...linkProps}
      {...props}
    >
      {variant === 'whatsapp' && (
        <span className="w-8 h-8 bg-navy rounded-full flex items-center justify-center shrink-0">
          <WhatsAppIcon size={17} className="text-white" />
        </span>
      )}
      {(variant === 'primary' || variant === 'ghost-navy') && iconLeft && (
        <span className="w-8 h-8 bg-navy rounded-full flex items-center justify-center shrink-0">
          <ArrowRight size={17} className="text-white" />
        </span>
      )}
      <span className="leading-none">{children}</span>
      {(variant === 'primary' || variant === 'ghost-navy') && !iconLeft && (
        <span className="w-7 h-7 bg-navy rounded-full flex items-center justify-center shrink-0">
          <ArrowRight size={14} className="text-white" />
        </span>
      )}
    </Tag>
  )
}
