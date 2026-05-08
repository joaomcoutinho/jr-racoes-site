import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import styles from './Navbar.module.css'
import { Button } from '../ui/Button'
import Logo from "./../../assets/images/image-removebg-preview (8).png"
import { SCROLL_CONFIG } from '../../utils/scrollConfig'

const navItems = [
  { label: 'Início',   to: 'hero'      },
  { label: 'Sobre',    to: 'sobre'     },
  { label: 'Serviços', to: 'servicos'  },
  { label: 'Produtos', to: 'produtos'  },
  { label: 'Equipe',   to: 'equipe'    },
  { label: 'Contato',  to: 'contato'   },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  

  return (
    <>
      <nav className={styles.navbar} style={scrolled ? { top: 10 } : {}}>
        <div className={styles.logo}>
          <Link
            to="hero"
            {...SCROLL_CONFIG}
            style={{ cursor: 'pointer' }}
            aria-label="Ir para o início"
          >
            <img src={Logo} alt="logo" className={styles.logonova}/>
          </Link>
        </div>

        <ul className={styles.navLinks}>
          {navItems.map(item => (
            <li key={item.to}>
              <Link
                to={item.to}
                {...SCROLL_CONFIG}
                className={styles.navLink}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navCta} style={{ display: 'flex' }}>
          <Button
            variant="whatsapp"
            href="https://wa.me/5581996512589?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações."
          >
            WhatsApp
          </Button>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <span /><span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={item.to}
                  {...SCROLL_CONFIG}
                  className={styles.mobileLink}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Button
                variant="whatsapp"
                href="https://wa.me/5581996512589?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações."
                onClick={() => setOpen(false)}
              >
                Fale no WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
