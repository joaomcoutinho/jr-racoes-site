import { Helmet } from 'react-helmet-async'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { WhatsAppFAB } from './components/layout/WhatsAppFAB'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { ProductsSection } from './components/sections/ProductsSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { TeamSection } from './components/sections/TeamSection'
//import { GallerySection } from './components/sections/GallerySection'
import { ContactSection } from './components/sections/ContactSection'

export default function App() {
  return (
    <>
      <Helmet>
        <title>JR Rações — Petshop em Aldeia | Camaragibe, PE</title>
        <meta name="description" content="Petshop completo em Aldeia, Camaragibe/PE. Veterinário, rações, banho & tosa, farmácia pet e delivery. Há mais de 20 anos cuidando dos pets de quem mora na região." />
        <link rel="canonical" href="https://jrracoes.com.br" />

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://jrracoes.com.br" />
        <meta property="og:title"       content="JR Rações — Petshop em Aldeia | Camaragibe, PE" />
        <meta property="og:description" content="Veterinário, rações, banho & tosa, farmácia pet e delivery — tudo em um só lugar no coração de Aldeia, Camaragibe. Há mais de 20 anos cuidando dos pets da região." />
        <meta property="og:image"       content="https://jrracoes.com.br/og-image.jpg" />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale"      content="pt_BR" />
        <meta property="og:site_name"   content="JR Rações" />

        {/* Twitter / X */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="JR Rações — Petshop em Aldeia | Camaragibe, PE" />
        <meta name="twitter:description" content="Veterinário, rações, banho & tosa, farmácia pet e delivery — tudo em um só lugar no coração de Aldeia, Camaragibe." />
        <meta name="twitter:image"       content="https://jrracoes.com.br/og-image.jpg" />
      </Helmet>

      <Navbar />
      <main style={{ width: '100%' }}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <TestimonialsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
