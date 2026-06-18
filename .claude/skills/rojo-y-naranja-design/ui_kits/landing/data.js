// Rojo y Naranja — shared content for the landing UI kit.
// Real data sourced from the property's public listing.

window.RYN = window.RYN || {};

window.RYN.apartamentos = [
  {
    slug: 'rojo', nombre: 'Apartamento Rojo', tone: 'rojo',
    capacidadMax: 4, capacidad: 'Hasta 4 personas', habitaciones: 2, banos: 2,
    aceptaNinos: true, precio: 95,
    grad: ['#3a1a10', '#AF2C0E'],
    resumen: 'Dos dormitorios y dos baños completos, uno con bañera y ducha termostática, otro con hidromasaje. El más amplio, ideal para familias.',
    amenities: ['2 baños', 'Hidromasaje', 'Bañera', 'Cocina completa', 'Lavavajillas', 'Wifi', 'TV'],
  },
  {
    slug: 'naranja', nombre: 'Apartamento Naranja', tone: 'naranja',
    capacidadMax: 4, capacidad: 'Hasta 4 personas', habitaciones: 2, banos: 1,
    aceptaNinos: true, precio: 90,
    grad: ['#3a2114', '#C25437'],
    resumen: 'Dos dormitorios con TV, baño con ducha de hidromasaje y cocina totalmente equipada. Luminoso y acogedor en pleno casco antiguo.',
    amenities: ['Hidromasaje', 'Cocina completa', 'Lavadora', 'Secadora', 'Wifi', 'TV'],
  },
  {
    slug: 'plata', nombre: 'Apartamento Plata', tone: 'plata',
    capacidadMax: 2, capacidad: '2 personas', habitaciones: 1, banos: 1,
    aceptaNinos: false, precio: 110,
    grad: ['#3a3128', '#CB9E78'],
    resumen: 'Cama extragrande, jacuzzi para dos con cromoterapia y mantenedor de calor, y chimenea eléctrica de compañía. Una escapada para dos.',
    amenities: ['Jacuzzi 2 pax', 'Cromoterapia', 'Chimenea', 'Cama 160×200', 'Nespresso', 'Wifi'],
  },
  {
    slug: 'oro', nombre: 'Ático Oro', tone: 'oro',
    capacidadMax: 2, capacidad: '2 personas', habitaciones: 1, banos: 1,
    aceptaNinos: false, precio: 130,
    grad: ['#3a342a', '#D5C4B0'],
    resumen: 'Nuestro ático de lujo: ducha de hidromasaje con cascada, amplio jacuzzi y una terraza privada de 16 m² con vistas y total discreción.',
    amenities: ['Terraza 16 m²', 'Jacuzzi', 'Ducha cascada', 'Chimenea', 'Vistas', 'Wifi'],
  },
];

window.RYN.amenityIcons = {
  '2 baños': 'bath', 'Hidromasaje': 'shower-head', 'Bañera': 'bath',
  'Cocina completa': 'cooking-pot', 'Lavavajillas': 'utensils', 'Wifi': 'wifi',
  'TV': 'tv', 'Lavadora': 'washing-machine', 'Secadora': 'wind',
  'Jacuzzi 2 pax': 'waves', 'Jacuzzi': 'waves', 'Cromoterapia': 'palette',
  'Chimenea': 'flame', 'Cama 160×200': 'bed-double', 'Nespresso': 'coffee',
  'Terraza 16 m²': 'sun', 'Ducha cascada': 'shower-head', 'Vistas': 'mountain',
};

window.RYN.reviews = [
  { nombre: 'Inés', apt: 'Ático Oro', texto: 'Nuestra escapada estuvo genial. Apartamento muy bonito con todas las comodidades, el jacuzzi enorme muy relajante.', valoracion: 10 },
  { nombre: 'Mayte', apt: 'Apartamento Plata', texto: 'Impecable: limpieza, equipamiento y estado. Se ajusta totalmente a las fotos. La ubicación dentro del pueblo es ideal y el propietario muy atento.', valoracion: 10 },
  { nombre: 'Álvaro Méndez', apt: 'Apartamento Naranja', texto: 'Muy confortable y bien climatizado pese al frío. Muy bien ubicado, en el centro de Morella. Para repetir.', valoracion: 9 },
  { nombre: 'Amparo Poveda', apt: 'Apartamento Rojo', texto: 'Anfitrión perfecto, resolviendo todo tipo de dudas. Por encima de nuestras expectativas. Fiel a la descripción.', valoracion: 10 },
];

window.RYN.experiencias = [
  { icon: 'castle', titulo: 'Castillo y murallas', texto: 'A pocos minutos a pie del recinto amurallado medieval.' },
  { icon: 'utensils-crossed', titulo: 'Gastronomía', texto: 'Restaurantes de cocina morellana a un minuto de la puerta.' },
  { icon: 'footprints', titulo: 'Senderismo', texto: 'Rutas por Els Ports, observación de fauna y flora.' },
  { icon: 'telescope', titulo: 'Astroturismo', texto: 'Observatorio astronómico y cielos limpios del Maestrazgo.' },
];

window.RYN.info = {
  direccion: 'C/ San Nicolás, 11 · Morella (Castellón)',
  telefono: '+34 600 000 000',
  email: 'reservas@rojoynaranja.com',
  registros: '23750-CS · 23751-CS · 27852-CS · 27853-CS',
  valoracionMedia: 10,
  numOpiniones: 10,
};
