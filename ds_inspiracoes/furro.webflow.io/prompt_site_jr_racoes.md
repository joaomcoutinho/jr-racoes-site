# PROMPT: Site Institucional JR Rações — Briefing Completo para IA Construtora de Sites

---

## CONTEXTO DO PROJETO

Você é um engenheiro de software sênior com especialidade profunda em UX/UI, design de interações e desenvolvimento web de alto nível. Sua tarefa é construir um site institucional **one-page** (âncoras internas) para a **JR Rações — Produtos Veterinários**, uma rede de petshops com duas unidades físicas no Recife/PE. O site **não tem e-commerce nem checkout próprio** — os produtos redirecionam para o Mercado Livre.

O projeto deve ser desenvolvido em **React** (Vite + React 18). Estilização com **Tailwind CSS** combinado com CSS Modules para os componentes mais complexos. Animações com **GSAP 3 + ScrollTrigger** e **Framer Motion** para transições de componentes. O site precisa ser **totalmente responsivo** (mobile-first), performático e com animações de alta qualidade.

---

## IDENTIDADE DA MARCA

| Campo | Valor |
|---|---|
| Nome comercial | JR Rações |
| Slogan | "A loja mais completa da região" |
| Subtítulo | Produtos Veterinários |
| Categoria | Petshop & Veterinária |
| Instagram | @jr.racooes |
| WhatsApp Aldeia | (81) 9 9651-2589 |
| Telefone Camaragibe | (81) 3458-1275 |
| Unidade Aldeia | Estrada de Aldeia, 10km após a Lombada Eletrônica |
| Unidade Camaragibe | Av. Gen. Newton Cavalcante, 128 — Vila da Inabi |
| Horário | Segunda a Sábado a partir das 7h |

---

## DESIGN SYSTEM — BASE VISUAL (Adaptado de furro.webflow.io)

O Design System de referência é o Furro (furro.webflow.io). A proposta é **adaptar os padrões estruturais e de interação do Furro para a paleta e tipografia da JR Rações**, mantendo o mesmo nível de sofisticação visual. Abaixo estão os tokens extraídos e as adaptações:

### 1. PALETA DE CORES (CSS Custom Properties)

```css
:root {
  /* Primárias */
  --color--navy:        #1A2370;   /* Fundo principal, navbar, footer */
  --color--electric:    #2E5BFF;   /* CTAs primários, destaques */
  --color--sky:         #4DA8DA;   /* Gradientes, fundos claros, badges */

  /* Secundárias */
  --color--gold:        #F5A623;   /* Acento em títulos, hover states, ícones */
  --color--white:       #FFFFFF;   /* Texto sobre azul, fundos claros */
  --color--off-white:   #F4F5F7;   /* Seções alternadas (equivalente ao --color--linen do Furro) */

  /* Neutros */
  --color--dark-text:   #1A2370;   /* Texto principal escuro */
  --color--mid-gray:    #555F6E;   /* Texto secundário */
  --color--light-bg:    #F4F5F7;   /* Backgrounds sutis */
}
```

> ⚠️ **Regra de uso do amarelo ouro:** O `--color--gold` (#F5A623) funciona EXCLUSIVAMENTE como cor de texto de destaque sobre fundo azul marinho ou como cor de acento/hover. NUNCA usar como cor de fundo de seção.

### 2. TIPOGRAFIA

```css
/* Google Fonts — importar no <head> */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --font-display:   'Montserrat', sans-serif;  /* Títulos — equivale ao Staatliches do Furro */
  --font-body:      'Inter', sans-serif;        /* Corpo, labels, UI */
}
```

**Escala tipográfica (desktop):**

| Elemento | Fonte | Tamanho | Peso | Line-height |
|---|---|---|---|---|
| H1 | Montserrat | 72–80px | 800 | 1.1 |
| H2 | Montserrat | 56–64px | 700 | 1.15 |
| H3 | Montserrat | 40–48px | 600 | 1.2 |
| H4 | Montserrat | 28–32px | 600 | 1.25 |
| Body large | Inter | 18–20px | 400 | 1.6 |
| Body | Inter | 16px | 400 | 1.6 |
| Label/Button | Montserrat | 14–16px | 700 | — |
| Footer/Caption | Inter | 13px | 400 | — |

> H1 e H2 em branco (#FFFFFF) sobre fundos escuros. H2 de seção em azul marinho (#1A2370) sobre fundos claros. Destaque de palavra em amarelo ouro dentro de títulos: use `<span style="color: var(--color--gold)">`.

### 3. COMPONENTES UI — PADRÕES DO FURRO ADAPTADOS

#### 3.1 Botão Primário
Botão pill com duplo-texto animado no hover (texto desliza para cima) e círculo de ícone interno — **exatamente o padrão `.main-button` do Furro**, mas com cores da JR:

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background-color: var(--color--electric);   /* Azul elétrico */
  border: 2px solid var(--color--navy);
  border-radius: 100px;                        /* Pill total */
  box-shadow: 4px 4px 0 0 var(--color--navy); /* Sombra offset sólida — padrão Furro */
  text-decoration: none;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  box-shadow: 0 0 0 0 var(--color--navy);
  transform: translateY(2px);
}

/* Elemento interno de texto com scroll duplo */
.btn-text-wrap {
  height: 20px;
  overflow: hidden;
}
.btn-text {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color--white);
  display: block;
  transition: transform 0.3s ease;
}
.btn-primary:hover .btn-text { transform: translateY(-100%); }

/* Círculo ícone interno */
.btn-icon-circle {
  width: 32px;
  height: 32px;
  background-color: var(--color--navy);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
```

**Variante secundária (ghost):** `border: 2px solid var(--color--white)`, fundo transparente, texto branco. Sem box-shadow offset.

**Variante WhatsApp:** Mesmo padrão pill, mas com ícone do WhatsApp no círculo interno. Fundo `--color--electric`, hover muda para `--color--gold` com texto `--color--navy`.

#### 3.2 Cards de Serviço
Padrão direto do Furro (`.service-card`), adaptado:

```css
.service-card {
  border: 3px solid var(--color--navy);
  background-color: var(--color--white);
  box-shadow: 3px 3px 0 0 var(--color--navy);  /* Sombra offset sólida */
  border-radius: 50px;                           /* Pill arredondado */
  padding: 50px 40px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}
.service-card:hover {
  box-shadow: 0 0 0 0 var(--color--navy);
  transform: translateY(3px);
  background-color: var(--color--sky);
}

/* Botão de seta no canto */
.service-card-arrow {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  border: 3px solid var(--color--navy);
  background-color: var(--color--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  opacity: 0;
  transition: all 0.3s ease;
}
.service-card:hover .service-card-arrow {
  transform: scale(1);
  opacity: 1;
}
```

#### 3.3 Navbar
Pill flutuante com borda e sombra offset — padrão `.nav-wrapper` do Furro:

```css
.navbar {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: calc(100% - 48px);
  max-width: 1200px;
  background-color: var(--color--navy);
  border: 2px solid rgba(255,255,255,0.15);
  border-radius: 100px;
  padding: 16px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(26,35,112,0.3);
}
```

Links do nav em branco, uppercase, `font-family: var(--font-display)`, `font-weight: 600`, `font-size: 14px`, `letter-spacing: 1px`. Hover: cor `var(--color--gold)` com transição suave.

#### 3.4 Footer
Fundo azul marinho com cantos superiores arredondados — padrão `.footer` do Furro:

```css
.footer {
  background-color: var(--color--navy);
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  padding: 80px 0 40px;
}
```

#### 3.5 Ticker / Marquee Horizontal
Para o carrossel de marcas parceiras — padrão `.top-slider-div` do Furro:

```css
.ticker-wrapper { overflow: hidden; }
.ticker-track {
  display: flex;
  gap: 32px;
  align-items: center;
  animation: ticker-scroll 30s linear infinite;
  width: max-content;
}
.ticker-track:hover { animation-play-state: paused; }
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
/* Fade nas bordas */
.ticker-wrapper::before,
.ticker-wrapper::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 120px;
  z-index: 2;
}
.ticker-wrapper::before { left: 0;  background: linear-gradient(to right, var(--color--white), transparent); }
.ticker-wrapper::after  { right: 0; background: linear-gradient(to left,  var(--color--white), transparent); }
```

#### 3.6 Badge / Pill de seção
```css
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid var(--color--navy);
  border-radius: 100px;
  padding: 8px 20px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color--navy);
  background-color: transparent;
  margin-bottom: 20px;
}
```

---

## ANIMAÇÕES — ESPECIFICAÇÃO TÉCNICA

As animações devem ser implementadas com **GSAP + ScrollTrigger** (ou Webflow Interactions se for Webflow). As referências visuais de cada animação são indicadas abaixo:

### A. Fade-in + Slide-up no Scroll (padrão Furro)
Todo card de serviço, card de produto e bloco de texto que entra em viewport deve animar com:
```js
gsap.from('.animate-in', {
  opacity: 0,
  y: 60,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.animate-in', start: 'top 85%' }
});
```

### B. Cards Orbitais / Flutuantes (inspiração furro.webflow.io — seção "Every Pet, Every Need")
Na seção de Serviços, os cards devem se posicionar em torno de um elemento central (texto ou ícone de patinha) e **se mover com parallax suave** enquanto o usuário faz scroll. Implementação:
- Container central com `position: relative`
- Cards posicionados com `position: absolute` em ângulos distintos (0°, 72°, 144°, 216°, 288°)
- GSAP ScrollTrigger: `scrub: 1` no eixo Y com valores distintos por card (+30px a -50px)
- Hover em cada card: `scale: 1.05`, elevação da sombra

### C. Hero Image Slideshow Automático (inspiração az-hulio-care.webflow.io)
Coluna direita do Hero com troca automática de imagens:
```js
// Stack de imagens com z-index
// A cada 3s: opacity 0 → 1 com cross-fade de 0.8s
gsap.to(currentSlide, { opacity: 0, duration: 0.8, ease: 'power2.inOut' });
gsap.to(nextSlide,    { opacity: 1, duration: 0.8, ease: 'power2.inOut' });
```
Imagens com `border-radius: 50px` e `border: 3px solid var(--color--navy)` e sombra offset `6px 6px 0 0 var(--color--navy)`.

### D. Vídeo/Background Parallax com Textos Emergentes (inspiração aupalevodka.com)
Na seção "Sobre Nós" ou em uma seção intermediária: imagem de fundo em parallax (`background-attachment: fixed` ou GSAP), com blocos de texto aparecendo nos lados esquerdo e direito conforme o scroll avança. Cada bloco deve ter `opacity: 0` → `1` e `x: ±80px` → `0` com `ScrollTrigger scrub: true`.

### E. Cards com Hover de Expansão Horizontal (inspiração nextsense.io)
Na seção de Produtos em Destaque: cards em linha horizontal com scroll. Ao hover, o card ativo cresce (`flex: 2` → transição CSS `0.4s ease`) e os demais encolhem ligeiramente. Implementação com CSS `flex` e `transition: flex 0.4s ease`.

### F. Cards com Efeito Vidro Fosco (inspiração yucca.co.za)
Variante para cards de depoimentos ou cards especiais de destaque:
```css
.glass-card {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 24px;
  transition: background 0.4s ease, transform 0.3s ease;
}
.glass-card:hover {
  background: rgba(255,255,255,0.15);
  transform: translateY(-4px);
}
```
Usar sobre fundo azul escuro (`--color--navy`) para efeito máximo.

### G. Scroll Horizontal de Cards com Expansão (inspiração nextsense.io + furro.webflow.io)
Na seção de Serviços, alternativa à grade: container com `overflow-x: auto; scroll-snap-type: x mandatory;`. Cada card: `scroll-snap-align: start`. No hover o card aumenta com `scale(1.04)` e todos os outros ficam `opacity: 0.6`.

### H. Entrada do Hero com Split de Texto (padrão premium)
Título H1 do Hero com animação de entrada por palavra:
```js
// Dividir título em <span> por palavra com SplitText do GSAP ou manualmente
gsap.from('.hero-title .word', {
  opacity: 0,
  y: 80,
  rotateX: -90,
  transformOrigin: '0% 50% -50',
  duration: 1,
  stagger: 0.08,
  ease: 'back.out(1.7)',
  delay: 0.3
});
```

---

## ESTRUTURA DO SITE — SEÇÃO A SEÇÃO

### SEÇÃO 0 — NAVBAR (Fixa)
- Logo JR Rações à esquerda (SVG branco sobre fundo navy)
- Links centralizados: Início · Sobre · Serviços · Produtos · Contato
- Botão "Fale no WhatsApp" à direita (variante WhatsApp do `.btn-primary`)
- **Comportamento mobile:** Menu hamburger com overlay fullscreen, links centralizados, animação slide-down

---

### SEÇÃO 1 — HERO
**Layout:** Grid de 2 colunas (60/40) — inspiração az-hulio-care.webflow.io

**Coluna esquerda (fixa):**
- Badge pill: `🐾 A loja mais completa da região`
- H1: "Tudo que seu **[pet]** precisa, perto de **você**" — palavras em destaque em `--color--gold`
- Subtítulo Inter 20px: "Rações, veterinário, banho & tosa, farmácia pet e muito mais. Duas unidades para atender você."
- Div de botões: `[Fale no WhatsApp ↗]` (primário) + `[Nossos Serviços]` (ghost)
- Abaixo dos botões: linha de números de impacto: `2 unidades · 10+ anos · 3.000+ clientes`

**Coluna direita (animada):**
- Stack de 3–4 imagens com cross-fade automático a cada 3 segundos
- Imagens com `border-radius: 50px`, borda navy 3px, sombra offset 6px sólida
- Imagem principal ligeiramente rotacionada (-3deg) para dinamismo visual

**Fundo:** Gradiente sutil `linear-gradient(135deg, #F4F5F7 0%, #FFFFFF 100%)` ou branco puro. Elementos decorativos: ícones de patinha SVG espalhados no background com `opacity: 0.04` e rotações aleatórias.

**Animação de entrada:** Coluna esquerda: texto entra com split-text (item H). Coluna direita: imagem surge com `scale: 0.9 → 1` + `opacity: 0 → 1`, delay 0.4s.

---

### SEÇÃO 2 — SOBRE NÓS
**Layout:** Grid 50/50 — texto à esquerda, imagem à direita. Fundo `--color--navy`.

**Conteúdo esquerdo:**
- Badge pill branco: `Quem somos`
- H2 branco: "Paixão por pets desde o primeiro dia"
- Parágrafo Inter branco/80%: história da marca, missão e diferenciais
- Linha de números em destaque (Montserrat 800 + label Inter):
  - `2` / Unidades
  - `10+` / Anos de mercado
  - `3.000+` / Clientes satisfeitos
  - `5` / Serviços completos
- CTA: `[Conheça nossos serviços]` (ghost branco)

**Conteúdo direito:**
- Foto da equipe ou da loja com `border-radius: 50px` e borda 3px dourada + sombra offset dourada `6px 6px 0 0 var(--color--gold)`
- Pequeno card flutuante sobre a imagem (posicionado no canto inferior esquerdo): badge com ícone de patinha + "Cuidado especializado"

**Animação:** Textos da esquerda com parallax leve (inspiração vodka — emerge da esquerda). Imagem da direita com scroll-trigger fade-in.

---

### SEÇÃO 3 — SERVIÇOS
**Layout principal:** Texto central + cards orbitais animados (inspiração furro.webflow.io — seção "Every Pet, Every Need"). Fundo `--color--off-white`.

**Elemento central:**
- Ícone grande de patinha SVG azul marinho
- H2: "Serviços completos para o seu pet"
- Subtítulo Inter

**Cards orbitais (5 cards — um por serviço):**
Cada card usa o padrão `.service-card` do Furro adaptado. Posicionados ao redor do centro em ângulos distintos.

| Serviço | Ícone sugerido | Mensagem WhatsApp pré-preenchida |
|---|---|---|
| 🚚 Delivery | caminhão | "Olá! Gostaria de solicitar uma entrega." |
| ✂️ Banho & Tosa | tesoura | "Olá! Gostaria de agendar um banho e tosa." |
| 🩺 Veterinário | estetoscópio | "Olá! Gostaria de agendar uma consulta veterinária." |
| 🥣 Rações | tigela | "Olá! Gostaria de saber mais sobre rações disponíveis." |
| 💊 Farmácia Pet | cápsula | "Olá! Preciso de informações sobre produtos farmacêuticos." |

**Cada card contém:** Ícone SVG no topo, título H4 Montserrat, descrição curta (2 linhas Inter), botão "Falar no WhatsApp ↗" que abre `https://wa.me/5581996512589?text=MENSAGEM_PRE_PREENCHIDA`.

**Variante mobile:** Grade 1 coluna, cards com scroll-snap.

**Seção alternativa de layout (inspiração billynick.com.br):** Opcional — se o layout orbital for muito complexo para a plataforma, usar alternância ziguezague: card de texto (esquerda) + imagem (direita) no item 1, imagem (esquerda) + texto (direita) no item 2, e assim por diante. Bordas e sombras do padrão Furro.

---

### SEÇÃO 4 — PRODUTOS EM DESTAQUE
**Layout:** Grid de 4 cards por linha (desktop) / 2 (tablet) / 1 (mobile). Fundo branco.

**Header da seção:**
- Badge: `Produtos em destaque`
- H2: "As melhores marcas para o seu pet"
- Subtítulo sutil: "Compra realizada pelo Mercado Livre"

**Card de produto:**
```
[ Foto do produto — border-radius: 20px, border: 2px solid navy ]
[ Badge de categoria: pill pequeno — ex: "Ração Premium" ]
[ Nome do produto — H4 Montserrat ]
[ Marca — Inter gray ]
[ Botão "Ver no Mercado Livre ↗" — btn-primary variante outline ]
```
Cards com hover de expansão (item E das animações) — `scale(1.04)` + elevação de sombra.

**Carrossel de marcas parceiras (abaixo dos cards):**
Ticker infinito horizontal (item 3.5 do DS) com logos das marcas: Royal Canin, Pedigree, Whiskas, Golden, Purina, Premier Pet, Hill's, Biofresh. Logos em escala de cinza que colorem no hover.

---

### SEÇÃO 5 — DEPOIMENTOS
**Layout:** Cards de depoimento no padrão de vidro fosco (item F das animações) sobre fundo navy. Inspiração: furro.webflow.io (seção de feedbacks autênticos).

**Header:**
- H2 branco: "O que nossos clientes dizem"
- Subtítulo em `--color--sky`

**Card de depoimento:**
```
[ Avatar circular — borda dourada 2px ]
[ Nome — Montserrat 600 branco ]
[ Localidade — Inter --color--sky ]
[ "★★★★★" — amarelo dourado ]
[ Texto do depoimento — Inter 16px branco/80% ]
```
Animação: cards entram com stagger fade-up. Slider horizontal com scroll-snap no mobile.

---

### SEÇÃO 6 — GALERIA / INSTAGRAM
**Layout:** Grid de 6–9 fotos (3×3) com hover overlay azul + ícone do Instagram. Fundo `--color--off-white`.

**Opção A (preferencial):** Widget EmbedSocial/Elfsight puxando @jr.racooes automaticamente.
**Opção B:** Grid manual com fotos selecionadas.

CTA: botão `[Seguir no Instagram ↗]` apontando para instagram.com/jr.racooes.

---

### SEÇÃO 7 — CONTATO E LOCALIZAÇÃO
**Layout:** Grid de 2 colunas. Fundo branco.

**Coluna esquerda — Card CTA de alta conversão** (inspiração prontodogpvh.com.br):
Fundo `--color--navy`, `border-radius: 30px`, padding 50px. Conteúdo:
- H3 branco: "Agende hoje mesmo a sua visita"
- Parágrafo: "Atendemos Segunda a Sábado a partir das 7h"
- 2 botões lado a lado:
  - `[WhatsApp Aldeia ↗]` — btn-primary
  - `[Ligar para Camaragibe]` — btn ghost branco

**Coluna direita — Endereços:**
Para cada unidade, um card com:
- Nome da unidade em H4
- Endereço completo
- Telefone
- WhatsApp (se aplicável)
- Botão "Ver no Google Maps ↗"

**Mapa:** Iframe do Google Maps com as duas unidades. `border-radius: 20px`, `border: 2px solid var(--color--navy)`.

---

### SEÇÃO 8 — FOOTER
```
[ Logo JR Rações (branco SVG)        ][ Links rápidos ][ Endereços ]
[ Slogan                             ][ Início        ][ Unidade Aldeia ]
[ Ícones sociais: Instagram WhatsApp ][ Sobre         ][ Unidade Camaragibe ]
                                      [ Serviços      ][ Horário ]
                                      [ Produtos      ]
                                      [ Contato       ]

[linha divisória sutil]
[ © 2025 JR Rações. Todos os direitos reservados. ]
```
Fundo `--color--navy`. Cantos superiores: `border-radius: 50px 50px 0 0`. Texto branco.

---

## ELEMENTOS GLOBAIS

### Botão WhatsApp Flutuante
```css
.whatsapp-fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9999;
  width: 60px;
  height: 60px;
  background-color: #25D366;
  border-radius: 50%;
  border: 3px solid var(--color--navy);
  box-shadow: 4px 4px 0 0 var(--color--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.whatsapp-fab:hover {
  box-shadow: 0 0 0 0 var(--color--navy);
  transform: translateY(2px) scale(1.05);
}
```
Link: `https://wa.me/5581996512589`

### Elementos Decorativos Globais
- Ícone SVG de patinha (paw print) espalhado como watermark em seções escuras: `opacity: 0.06`, tamanhos variados (40px a 120px), rotações aleatórias
- Padrão de pontos em seções de transição: `radial-gradient` ou SVG de dots pattern com `opacity: 0.05`

---

## RESPONSIVIDADE — BREAKPOINTS

```css
/* Mobile first */
/* sm: 640px | md: 768px | lg: 1024px | xl: 1280px */
```

- **Mobile (< 768px):** Navbar vira hamburger. Hero vira 1 coluna (texto em cima, imagem embaixo). Cards em coluna única com scroll-snap. Footer em coluna única.
- **Tablet (768–1024px):** Hero 2 colunas reduzido. Cards em grid 2×2. Footer 2 colunas.
- **Desktop (> 1024px):** Layout completo conforme especificado.

---

## TECNOLOGIA E PERFORMANCE

### Stack obrigatória

| Camada | Tecnologia |
|---|---|
| Framework | **React 18** com **Vite** (bundler) |
| Estilização | **Tailwind CSS** + CSS custom properties para tokens de cor/tipografia |
| CSS Modules | Para componentes complexos com estado visual (ex: Navbar, ServiceCard) |
| Animações scroll | **GSAP 3 + ScrollTrigger** (`npm install gsap`) |
| Animações de componente | **Framer Motion** (`npm install framer-motion`) |
| Roteamento | Nenhum — site one-page com `react-scroll` para âncoras suaves |
| Ícones | **Lucide React** (`npm install lucide-react`) |
| Meta/SEO | **React Helmet Async** (`npm install react-helmet-async`) |

### Estrutura de pastas sugerida

```
src/
├── components/
│   ├── ui/              # Botões, badges, cards primitivos
│   ├── sections/        # HeroSection, AboutSection, ServicesSection, etc.
│   └── layout/          # Navbar, Footer, WhatsAppFAB
├── hooks/               # useScrollAnimation, useAutoSlider
├── data/                # services.js, products.js, testimonials.js
├── styles/
│   ├── globals.css      # CSS custom properties + reset
│   └── *.module.css     # CSS modules por componente complexo
├── assets/              # Imagens, SVGs, fontes locais
└── App.jsx
```

### Diretrizes React

- **Componentes funcionais** com hooks — sem class components
- **Custom hooks** para lógica de animação reutilizável: `useGsapFadeIn(ref)`, `useAutoSlider(intervalMs)`
- **`useRef` + `useEffect`** para inicializar instâncias do GSAP (cleanup obrigatório no `return` do `useEffect`)
- **`useLayoutEffect`** para animações que dependem do layout já pintado
- Dados de serviços, produtos e depoimentos em arquivos `.js` separados em `/src/data/` — nunca hardcoded dentro dos componentes
- Framer Motion para: transições de entrada de cards (`AnimatePresence` + `motion.div`), hover states de cards, animação do menu mobile
- GSAP ScrollTrigger para: animações de scroll mais complexas (orbital, parallax, split-text do hero)

### Carrossel de marcas (Ticker)
Implementar com CSS puro via `@keyframes` em um CSS Module — sem biblioteca de carrossel:
```css
/* BrandTicker.module.css */
.track {
  display: flex;
  gap: 2rem;
  animation: ticker 30s linear infinite;
  width: max-content;
}
.track:hover { animation-play-state: paused; }
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

### Outros pontos técnicos

- **Imagens:** formato `.webp`, `loading="lazy"` em tudo exceto Hero. Usar `import` estático no Vite para assets críticos
- **Performance:** LCP < 2.5s — fontes Google com `display=swap`, imagem hero com `fetchpriority="high"`
- **WhatsApp links:** `https://wa.me/5581996512589?text=${encodeURIComponent(mensagem)}`
- **Instagram feed:** EmbedSocial ou Elfsight — carregar script via `useEffect` após mount para não bloquear render
- **Google Maps:** `<iframe>` com `loading="lazy"` dentro de componente `MapEmbed`
- **CSS Custom Properties:** declaradas no `:root` dentro de `globals.css` e consumidas tanto pelo Tailwind (via `extend` no `tailwind.config.js`) quanto pelos CSS Modules
- **SEO:** `<Helmet>` com `og:title`, `og:description`, `og:image`, `canonical`, `robots: index,follow`

---

## NOTAS FINAIS DE QUALIDADE

1. **Consistência visual acima de tudo:** Toda interação deve usar os mesmos 3 valores de `border-radius` do DS: `100px` (pill completo), `50px` (card arredondado), `20px` (imagens e iframes). Toda sombra sólida deve usar `var(--color--navy)` como cor.

2. **Hover states em TODOS os elementos interativos:** Links, cards, botões e ícones devem ter hover explícito. O hover padrão dos cards remove a sombra offset e faz `translateY(+3px)` — dando sensação de que o objeto "afundou" ao toque, padrão característico do Furro.

3. **Sem animações decorativas vazias:** Cada animação deve ter propósito funcional (guiar atenção ou indicar interatividade). Timing máximo de 1s. Easing preferencialmente `power3.out` ou `back.out(1.7)` para entradas, `power2.inOut` para transições.

4. **Acessibilidade:** Contraste mínimo WCAG AA. Todo ícone funcional com `aria-label`. Imagens com `alt` descritivo.

5. **Copy padrão de fallback:** Onde não houver conteúdo real fornecido pelo cliente, usar textos coerentes com a identidade da marca (tom próximo, direto, focado no tutor do pet) — nunca lorem ipsum.

---

*Briefing elaborado a partir da análise do Design System furro.webflow.io e das inspirações visuais selecionadas (az-hulio-care.webflow.io, prontodogpvh.com.br, billynick.com.br, aupalevodka.com, yucca.co.za, nextsense.io, thefarmersdog.com). Adaptar combinando o melhor de cada referência dentro da identidade visual da JR Rações.*
