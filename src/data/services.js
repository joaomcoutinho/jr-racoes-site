import deliveryImg from '../assets/images/delivery.jpg'
import banhoTosaImg from '../assets/images/banho_tosa.avif'
import vetImg from '../assets/images/67bf0cb6bd02a1792ef5a5c3_servi_8f9ffb0bd63b.webp'
import racaoImg from '../assets/images/racao.jpg'
import farmaciaImg from '../assets/images/farmacia.avif'

export const services = [
  {
    id: 1,
    icon: 'Truck',
    title: 'Delivery',
    description: 'Peça do sofá e receba em casa. Entregamos rações e produtos para toda a região de Aldeia e Camaragibe, com agilidade e sem complicação.',
    whatsappMsg: 'Olá! Vim pelo site e gostaria de solicitar uma entrega em Aldeia.',
    image: deliveryImg,
  },
  {
    id: 2,
    icon: 'Scissors',
    title: 'Banho & Tosa',
    description: 'Seu pet sai perfumado, feliz e com visual impecável. Usamos produtos de qualidade e cuidamos de cada detalhe com atenção.',
    whatsappMsg: 'Olá! Gostaria de agendar um banho e tosa.',
    image: banhoTosaImg,
  },
  {
    id: 3,
    icon: 'Stethoscope',
    title: 'Veterinário',
    description: 'Consultas, vacinas e acompanhamento preventivo com profissional experiente. Porque saúde do pet começa com confiança em quem cuida.',
    whatsappMsg: 'Olá! Gostaria de agendar uma consulta veterinária.',
    image: vetImg,
  },
  {
    id: 4,
    icon: 'ShoppingBag',
    title: 'Rações',
    description: 'Royal Canin, Golden, Premier Pet e muito mais. As melhores marcas com o melhor preço, sempre em estoque aqui em Aldeia.',
    whatsappMsg: 'Olá! Vim pelo site e gostaria de saber quais rações estão disponíveis em Aldeia.',
    image: racaoImg,
  },
  {
    id: 5,
    icon: 'Pill',
    title: 'Farmácia Pet',
    description: 'Antiparasitários, suplementos e medicamentos veterinários. Tudo que seu pet precisa para se manter saudável, disponível aqui em Aldeia.',
    whatsappMsg: 'Olá! Preciso de informações sobre produtos farmacêuticos.',
    image: farmaciaImg,
  },
]
