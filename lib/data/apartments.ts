export type ApartmentTone = 'rojo' | 'naranja' | 'plata' | 'oro'

export interface Apartment {
  slug: string
  nombre: string
  tone: ApartmentTone
  capacidadMax: number
  habitaciones: number
  banos: number
  aceptaNinos: boolean
  precio: number
  fotos: string[]   // Cloudinary public_ids (use cldUrl() to get the full URL)
  gradFrom: string  // fallback gradient while photo loads
  gradTo: string
  resumen: string
  amenities: string[]
}

export const apartamentos: Apartment[] = [
  {
    slug: 'rojo',
    nombre: 'Apartamento Rojo',
    tone: 'rojo',
    capacidadMax: 4,
    habitaciones: 2,
    banos: 2,
    aceptaNinos: true,
    precio: 95,
    fotos: [
      '60a54435cf19a_qb71bd',
      '5f4c2c12bf109_txzwfm',
      '5d682e5249809_em9wus',
      '5d682e614e272_qxlo1c',
      '5d682d105645a_wd9psj',
      '5d682d13a35b4_a09bbe',
      '5d682d12eda1e_upa46h',
      '5d682d11b767e_n3dbvn',
      '5d682d10af02d_swpnzz',
      '5d682d0fc330b_ta3peq',
    ],
    gradFrom: '#3a1a10',
    gradTo:   '#AF2C0E',
    resumen: 'Dos dormitorios y dos baños completos, uno con bañera y ducha termostática, otro con hidromasaje. El más amplio, ideal para familias.',
    amenities: ['2 baños', 'Hidromasaje', 'Bañera', 'Cocina completa', 'Lavavajillas', 'Wifi', 'TV'],
  },
  {
    slug: 'naranja',
    nombre: 'Apartamento Naranja',
    tone: 'naranja',
    capacidadMax: 4,
    habitaciones: 2,
    banos: 1,
    aceptaNinos: true,
    precio: 90,
    fotos: [
      '530899d541be5_va2iha',
      '5d682f25816d7_akxhmn',
      '5d682f3039e6c_eapuco',
      '5d682f260f5d1_cnawvr',
      '5d682f24e8ab9_dk76hu',
      '5d682f2e0ed9b_izw08s',
      '5d682f2d4c5e8_nyehsz',
      '5d682f2cb0d7e_amkm8y',
    ],
    gradFrom: '#3a2114',
    gradTo:   '#C25437',
    resumen: 'Dos dormitorios con TV, baño con ducha de hidromasaje y cocina totalmente equipada. Luminoso y acogedor en pleno casco antiguo.',
    amenities: ['Hidromasaje', 'Cocina completa', 'Lavadora', 'Secadora', 'Wifi', 'TV'],
  },
  {
    slug: 'plata',
    nombre: 'Apartamento Plata',
    tone: 'plata',
    capacidadMax: 2,
    habitaciones: 1,
    banos: 1,
    aceptaNinos: false,
    precio: 110,
    fotos: [
      '53089a1e5845d_aquji0',
      '53089a1e5845d_1_sradh8',
      '5d682c56208fb_lcchf5',
      '5d682c53008c9_l2bve2',
      '5d682c1665c89_pqkz3s',
      '5d682bc77087e_jh1d5u',
      '5d682bc8c1311_olg3s4',
      '5d682bc6c8949_tm396h',
    ],
    gradFrom: '#3a3128',
    gradTo:   '#CB9E78',
    resumen: 'Cama extragrande, jacuzzi para dos con cromoterapia y mantenedor de calor, y chimenea eléctrica. Una escapada íntima para dos.',
    amenities: ['Jacuzzi 2 pax', 'Cromoterapia', 'Chimenea', 'Cama 160×200', 'Nespresso', 'Wifi'],
  },
  {
    slug: 'oro',
    nombre: 'Ático Oro',
    tone: 'oro',
    capacidadMax: 2,
    habitaciones: 1,
    banos: 1,
    aceptaNinos: false,
    precio: 130,
    fotos: [
      '53089ab83c023_v5rjfc',
      '53089a0521eca_uts00f',
      '53089a48c1688_b8jeun',
      '5f4c2bf29f359_fouyli',
      '5d68344983ea2_z2px8h',
      '5d68343441713_ch8wjv',
      '5d6831763e107_zxffjy',
      '5d683167a595c_nkd94y',
      '5d68336fb3721_pdhnv6',
      '5d68318c5e065_r4udtj',
      '5d68317d6a6d9_uykut9',
      '5d68308d2e7db_qeiemw',
      '5d68308c2fc08_dcxxut',
    ],
    gradFrom: '#3a342a',
    gradTo:   '#D5C4B0',
    resumen: 'Nuestro ático de lujo: ducha de hidromasaje con cascada, amplio jacuzzi y una terraza privada de 16 m² con vistas y total discreción.',
    amenities: ['Terraza 16 m²', 'Jacuzzi', 'Ducha cascada', 'Chimenea', 'Vistas', 'Wifi'],
  },
]

// Cloudinary public_ids for Morella town photos
export const morellaPhoots = [
  '5f4c2c4626fa8_zpv2q4',
  '5f4c2c2fe1935_ws5j5v',
]

export const reviews = [
  { nombre: 'Inés', apt: 'Ático Oro', texto: 'Nuestra escapada estuvo genial. Apartamento muy bonito con todas las comodidades, el jacuzzi enorme muy relajante.', valoracion: 10 },
  { nombre: 'Mayte', apt: 'Apartamento Plata', texto: 'Impecable: limpieza, equipamiento y estado. Se ajusta totalmente a las fotos. La ubicación dentro del pueblo es ideal y el propietario muy atento.', valoracion: 10 },
  { nombre: 'Álvaro Méndez', apt: 'Apartamento Naranja', texto: 'Muy confortable y bien climatizado pese al frío. Muy bien ubicado, en el centro de Morella. Para repetir.', valoracion: 9 },
  { nombre: 'Amparo Poveda', apt: 'Apartamento Rojo', texto: 'Anfitrión perfecto, resolviendo todo tipo de dudas. Por encima de nuestras expectativas. Fiel a la descripción.', valoracion: 10 },
]

export const experiencias = [
  { icon: 'Castle', titulo: 'Castillo y murallas', texto: 'A pocos minutos a pie del recinto amurallado medieval.' },
  { icon: 'UtensilsCrossed', titulo: 'Gastronomía', texto: 'Restaurantes de cocina morellana a un minuto de la puerta.' },
  { icon: 'Footprints', titulo: 'Senderismo', texto: 'Rutas por Els Ports, observación de fauna y flora.' },
  { icon: 'Telescope', titulo: 'Astroturismo', texto: 'Observatorio astronómico y cielos limpios del Maestrazgo.' },
]

export const info = {
  direccion: 'C/ San Nicolás, 11 · Morella (Castellón)',
  telefono: '+34 600 000 000',
  email: 'reservas@rojoynaranja.com',
  registros: '23750-CS · 23751-CS · 27852-CS · 27853-CS',
  valoracionMedia: 10,
  numOpiniones: 10,
}

export const toneColor: Record<ApartmentTone, string> = {
  rojo:    '#AF2C0E',
  naranja: '#C25437',
  plata:   '#CB9E78',
  oro:     '#BBA582',
}
