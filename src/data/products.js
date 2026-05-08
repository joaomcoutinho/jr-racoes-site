import product1Img from '../assets/images/image-removebg-preview (3).png'
import product2Img from '../assets/images/image-removebg-preview (4).png'
import product3Img from '../assets/images/image-removebg-preview (5).png'
import product4Img from '../assets/images/image-removebg-preview (6).png'
import logoOrgannact from '../assets/images/logo-organnact-nova.webp'
import Biofresh from '../assets/images/svg_4.png'
import RoyalCanin from '../assets/images/logo_royal_cinza-removebg-preview.png'
import PremierPet from '../assets/images/Logo-Premierpet (1).png'

export const products = [
  {
    id: 1,
    name: 'Royal Canin Adulto',
    brand: 'Royal Canin',
    category: 'Ração Premium',
    image: product1Img,
    mlUrl: 'https://www.mercadolivre.com.br',
  },
  {
    id: 2,
    name: 'Golden Special Adulto',
    brand: 'Golden',
    category: 'Ração Premium',
    image: product2Img,
    mlUrl: 'https://www.mercadolivre.com.br',
  },
  {
    id: 3,
    name: 'Premier Gourmet Gatos',
    brand: 'Premier Pet',
    category: 'Ração para Gatos',
    image: product3Img,
    mlUrl: 'https://www.mercadolivre.com.br',
  },
  {
    id: 4,
    name: 'Promun Dog Tabs',
    brand: 'Organnact',
    category: 'Medicamento Veterinário',
    image: product4Img,
    mlUrl: 'https://www.mercadolivre.com.br',
  },
]

export const brands = [
  'Royal Canin', 'Pedigree', 'Whiskas', 'Golden', 'Purina',
  'Premier Pet', 'Biofresh', 'Organnact'
]

export const logos = [
  logoOrgannact, Biofresh, RoyalCanin, PremierPet
]
