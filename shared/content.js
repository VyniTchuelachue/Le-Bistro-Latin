// Single source of truth for the restaurant's content.
// Imported by the React client (for rendering) and by the Express API (for
// validation and the /api endpoints). Edit this file to update the website.

const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// ---------------------------------------------------------------------------
// Restaurant information (sources: Google Maps, TripAdvisor, Facebook page)
// ---------------------------------------------------------------------------
export const restaurant = {
  name: 'Le Bistro Latin',
  tagline: 'Restaurant & Lounge',
  address: {
    street: 'Rue Batibois',
    district: 'Bonapriso',
    city: 'Douala',
    country: 'Cameroun',
    postalBox: 'BP 434',
    plusCode: '2PG2+52 Douala',
  },
  geo: { lat: 4.0254719, lng: 9.7000317 },
  phone: '+237 6 99 69 59 69',
  phoneHref: 'tel:+237699695969',
  whatsapp: '+237 6 92 04 18 17',
  whatsappNumber: '237692041817',
  email: null, // Ajoutez l'adresse e-mail officielle ici si elle existe.
  mapsUrl: 'https://maps.app.goo.gl/jLgSFauqJzv7aXwCA',
  mapsEmbed: 'https://www.google.com/maps?q=4.0254719,9.7000317&z=17&output=embed',
  socials: {
    instagram: 'https://www.instagram.com/bistro.latin_douala/',
    facebook: 'https://www.facebook.com/BistroLatin/',
    tripadvisor:
      'https://www.tripadvisor.com/Restaurant_Review-g297392-d1907386-Reviews-Le_Bistro_Latin-Douala_Littoral_Region.html',
  },
  ratings: {
    google: { score: 4.2 },
    tripadvisor: { score: 4.2, reviews: 104, rank: '#13 sur 120 restaurants à Douala' },
  },
  // 0 = dimanche … 6 = samedi. null = fermé.
  hours: [
    { day: 'Dimanche', open: null, close: null },
    { day: 'Lundi', open: '11:00', close: '23:00' },
    { day: 'Mardi', open: '11:00', close: '23:00' },
    { day: 'Mercredi', open: '11:00', close: '23:00' },
    { day: 'Jeudi', open: '11:00', close: '23:00' },
    { day: 'Vendredi', open: '11:00', close: '23:00' },
    { day: 'Samedi', open: '11:00', close: '23:00' },
  ],
  hoursSummary: 'Lundi – Samedi · 11h00 – 23h00',
  closedSummary: 'Fermé le dimanche',
  amenities: [
    'Cour intérieure arborée',
    'Ambiance lounge le soir',
    'Végétariens bienvenus',
    'Parking sur place',
    'Cartes bancaires & paiements mobiles',
    'Réservations & privatisation',
  ],
};

// Reservation slots: every 30 minutes, last seating 1h before closing.
export const reservationRules = {
  firstSeating: '11:30',
  lastSeating: '22:00',
  intervalMinutes: 30,
  maxGuests: 20,
  maxDaysAhead: 90,
};

export const images = {
  hero: unsplash('1558030006-450675393462', 2000),
  heroPlate: unsplash('1414235077428-338989a2e8c0', 1400),
  interiorDark: unsplash('1517248135467-4c7edcad34c4', 1800),
  courtyard: unsplash('1600093463592-8e36ae95ef56', 1800),
  greenhouse: unsplash('1508424757105-b6d5ad9329d0', 1600),
  lounge: unsplash('1514933651103-005eec06c04b', 1600),
  interiorWarm: unsplash('1590846406792-0adc7f938f1d', 1600),
  chef: unsplash('1577219491135-ce391730fb2c', 1200),
  kitchen: unsplash('1600565193348-f74bd3c7ccdf', 1200),
  toast: unsplash('1519671482749-fd09be7ccebf', 1800),
  wine: unsplash('1510812431401-41d2bd2722f3', 1400),
  cocktail: unsplash('1514362545857-3bc16c4c7d1b', 1200),
  banquet: unsplash('1519225421980-715cb0215aed', 1400),
  friends: unsplash('1592861956120-e524fc739696', 1400),
};

// ---------------------------------------------------------------------------
// Menu — dishes reflect the house's French, Italian, Spanish & Japanese
// influences. Prices are indicative (FCFA) and should be confirmed.
// ---------------------------------------------------------------------------
export const menuCategories = [
  {
    id: 'entrees',
    name: 'Entrées',
    subtitle: 'Fraîcheur et raffinement',
    image: unsplash('1625938145744-e380515399bf', 800),
    items: [
      { name: 'Foie gras maison', description: "Sur pain d'épices, chutney de figues", price: 12000, tags: ['signature'] },
      { name: 'Bresaola & roquette', description: 'Copeaux de parmesan, huile d’olive vierge, citron', price: 10000 },
      { name: 'Carpaccio de bœuf', description: 'Parmesan, câpres, roquette et pignons', price: 9500 },
      { name: 'Burrata crémeuse', description: 'Tomates confites, pesto au basilic', price: 11000, tags: ['vegetarien'] },
      { name: 'Salade César', description: 'Poulet grillé, croûtons, sauce César maison', price: 8500 },
      { name: 'Tataki de thon', description: 'Sésame torréfié, sauce ponzu, jeunes pousses', price: 11500 },
    ],
  },
  {
    id: 'plats',
    name: 'Plats principaux',
    subtitle: 'Saveurs authentiques',
    image: unsplash('1600891964092-4316c288032e', 800),
    items: [
      { name: 'Filet de bœuf', description: 'Sauce au poivre, frites maison', price: 22000, tags: ['signature'] },
      { name: 'Entrecôte grillée 300 g', description: 'Sauce béarnaise, légumes de saison', price: 21000 },
      { name: 'Magret de canard', description: 'Sauce miel & épices, gratin dauphinois', price: 20000 },
      { name: 'Rougets poêlés', description: 'Légumes du marché, beurre citronné', price: 18000 },
      { name: 'Pavé de saumon', description: 'Beurre blanc, riz parfumé', price: 19000 },
      { name: 'Burger du Bistro', description: 'Bœuf, cheddar affiné, oignons confits, frites', price: 12000 },
    ],
  },
  {
    id: 'latin',
    name: 'Spécialités latines',
    subtitle: 'Un voyage culinaire',
    image: unsplash('1515443961218-a51367888e4b', 800),
    items: [
      { name: 'Paella Royale', description: 'Fruits de mer, poulet, chorizo, safran', price: 24000, tags: ['signature'] },
      { name: 'Gambas a la plancha', description: 'Ail, persil, piment d’Espelette', price: 18000, tags: ['epice'] },
      { name: 'Churrasco', description: 'Bœuf grillé, chimichurri maison, patates douces', price: 21000 },
      { name: 'Ceviche de poisson', description: 'Citron vert, coriandre, oignon rouge', price: 12000 },
      { name: 'Tapas à partager', description: 'Sélection du chef pour 2 personnes', price: 14000 },
    ],
  },
  {
    id: 'pates',
    name: 'Pâtes & Pizzas',
    subtitle: 'Tradition italienne',
    image: unsplash('1551183053-bf91a1d81141', 800),
    items: [
      { name: 'Tagliatelles aux fruits de mer', description: 'Crevettes, moules, calamars, sauce tomate', price: 18000, tags: ['signature'] },
      { name: 'Risotto aux champignons', description: 'Parmesan affiné, huile de truffe', price: 14000, tags: ['vegetarien'] },
      { name: 'Penne all’arrabbiata', description: 'Tomate, ail, piment', price: 9000, tags: ['vegetarien', 'epice'] },
      { name: 'Pizza Margherita', description: 'Tomate, mozzarella, basilic frais', price: 8000, tags: ['vegetarien'] },
      { name: 'Pizza du Bistro', description: 'Jambon de Parme, roquette, parmesan', price: 12000 },
    ],
  },
  {
    id: 'japon',
    name: 'Touche japonaise',
    subtitle: 'Précision et finesse',
    image: unsplash('1579871494447-9811cf80d66c', 800),
    items: [
      { name: 'Plateau sushis & makis', description: '16 pièces, gingembre, wasabi', price: 16000 },
      { name: 'California rolls', description: 'Saumon, avocat, sésame', price: 9000 },
      { name: 'Gyozas au poulet', description: 'Sauce soja & gingembre', price: 7500 },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    subtitle: 'Douceur et gourmandise',
    image: unsplash('1571877227200-a0d98ea607e9', 800),
    items: [
      { name: 'Tiramisu maison', description: 'Mascarpone, café, cacao', price: 5500, tags: ['vegetarien'] },
      { name: 'Fondant au chocolat', description: 'Cœur coulant, glace vanille', price: 6000, tags: ['vegetarien'] },
      { name: 'Crème brûlée', description: 'À la vanille de Madagascar', price: 5000, tags: ['vegetarien'] },
      { name: 'Panna cotta', description: 'Coulis de fruits rouges', price: 5000, tags: ['vegetarien'] },
      { name: 'Sélection de la pâtisserie', description: 'Les créations du jour de notre vitrine', price: 7000 },
    ],
  },
  {
    id: 'bar',
    name: 'Bar & Cave',
    subtitle: 'Cocktails, vins et jus',
    image: unsplash('1536935338788-846bb9981813', 800),
    items: [
      { name: 'Cocktail signature', description: 'Création du barman, selon l’humeur du soir', price: 7000 },
      { name: 'Mojito / Caipirinha', description: 'Classiques latinos', price: 6500 },
      { name: 'Verre de vin', description: 'Rouge, blanc ou rosé — sélection du moment', price: 5000 },
      { name: 'Bouteille de vin', description: 'Voir la carte des vins auprès de nos équipes', price: null },
      { name: 'Jus de fruits naturels', description: 'Ananas, gingembre, bissap, passion', price: 3000 },
      { name: 'Espresso / Cappuccino', description: 'Café, thés et infusions aromatiques', price: 2000 },
    ],
  },
];

export const specialties = [
  {
    name: 'Filet de bœuf',
    description: 'Cuit à la perfection, sauce au poivre et frites maison.',
    price: 22000,
    image: unsplash('1600891964092-4316c288032e', 800),
  },
  {
    name: 'Paella Royale',
    description: 'Un voyage aux saveurs d’Espagne : fruits de mer, safran et chorizo.',
    price: 24000,
    image: unsplash('1515443961218-a51367888e4b', 800),
  },
  {
    name: 'Pâtes aux fruits de mer',
    description: 'Tagliatelles fraîches, une touche méditerranéenne irrésistible.',
    price: 18000,
    image: unsplash('1551183053-bf91a1d81141', 800),
  },
  {
    name: 'Pavé de saumon',
    description: 'Beurre blanc citronné, légumes croquants de saison.',
    price: 19000,
    image: unsplash('1467003909585-2f8a72700288', 800),
  },
];

// ---------------------------------------------------------------------------
// Testimonials — SAMPLE CONTENT. Replace with real guest reviews (with their
// permission) before going live.
// ---------------------------------------------------------------------------
export const testimonials = [
  {
    name: 'Marie L.',
    role: 'Cliente fidèle',
    text: 'Une expérience culinaire incroyable ! Les plats sont délicieux et le cadre de la cour intérieure est magique.',
    rating: 5,
  },
  {
    name: 'Paul K.',
    role: 'Déjeuner d’affaires',
    text: 'Le meilleur restaurant de Bonapriso pour recevoir des clients. Service impeccable et plats généreux.',
    rating: 5,
  },
  {
    name: 'Sophie M.',
    role: 'Cliente',
    text: 'Un vrai voyage entre la France et l’Amérique latine. Le foie gras maison est un must !',
    rating: 5,
  },
  {
    name: 'Jean-Marc T.',
    role: 'Anniversaire',
    text: 'Nous avons privatisé une partie du restaurant pour un anniversaire : tout était parfait, de l’accueil au dessert.',
    rating: 5,
  },
  {
    name: 'Aïcha N.',
    role: 'Cliente',
    text: 'Ambiance chic et chaleureuse le soir, cocktails excellents. Je recommande vivement !',
    rating: 4,
  },
];

// ---------------------------------------------------------------------------
// Events & private hire
// ---------------------------------------------------------------------------
export const eventTypes = [
  {
    id: 'prive',
    title: 'Dîners privés & anniversaires',
    description:
      'Célébrez vos moments précieux dans un cadre intime. Menu sur mesure, décoration et gâteau de notre pâtisserie.',
    image: unsplash('1519671482749-fd09be7ccebf', 1000),
  },
  {
    id: 'affaires',
    title: 'Repas d’affaires & séminaires',
    description:
      'Un espace calme et élégant à Bonapriso pour vos déjeuners professionnels, réunions et séminaires.',
    image: unsplash('1592861956120-e524fc739696', 1000),
  },
  {
    id: 'buffet',
    title: 'Buffets & traiteur',
    description:
      'Cocktails dînatoires, buffets et service traiteur pour vos réceptions, au restaurant ou chez vous.',
    image: unsplash('1519225421980-715cb0215aed', 1000),
  },
  {
    id: 'lounge',
    title: 'Soirées lounge',
    description:
      'Le soir, le Bistro se transforme en lounge chic : cocktails signature, musique et ambiance feutrée.',
    image: unsplash('1514362545857-3bc16c4c7d1b', 1000),
  },
];

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------
export const gallery = [
  { src: unsplash('1600093463592-8e36ae95ef56', 1400), alt: 'Salle verdoyante', category: 'cadre', tall: true },
  { src: unsplash('1414235077428-338989a2e8c0', 1200), alt: 'Assiette gastronomique', category: 'cuisine' },
  { src: unsplash('1515443961218-a51367888e4b', 1200), alt: 'Paella Royale', category: 'cuisine' },
  { src: unsplash('1514933651103-005eec06c04b', 1400), alt: 'Le bar lounge', category: 'cadre', tall: true },
  { src: unsplash('1536935338788-846bb9981813', 1200), alt: 'Cocktail signature', category: 'bar' },
  { src: unsplash('1577219491135-ce391730fb2c', 1200), alt: 'Le chef en cuisine', category: 'cuisine', tall: true },
  { src: unsplash('1517248135467-4c7edcad34c4', 1400), alt: 'Salle du restaurant', category: 'cadre' },
  { src: unsplash('1571877227200-a0d98ea607e9', 1200), alt: 'Tiramisu maison', category: 'cuisine' },
  { src: unsplash('1510812431401-41d2bd2722f3', 1200), alt: 'Moment de partage', category: 'evenements' },
  { src: unsplash('1508424757105-b6d5ad9329d0', 1400), alt: 'Cour intérieure', category: 'cadre', tall: true },
  { src: unsplash('1579871494447-9811cf80d66c', 1200), alt: 'Sushis & makis', category: 'cuisine' },
  { src: unsplash('1514362545857-3bc16c4c7d1b', 1200), alt: 'Cocktail de la maison', category: 'bar' },
  { src: unsplash('1519225421980-715cb0215aed', 1400), alt: 'Table de réception', category: 'evenements' },
  { src: unsplash('1600891964092-4316c288032e', 1200), alt: 'Filet de bœuf & frites', category: 'cuisine' },
  { src: unsplash('1590846406792-0adc7f938f1d', 1400), alt: 'Ambiance du soir', category: 'cadre' },
  { src: unsplash('1600565193348-f74bd3c7ccdf', 1200), alt: 'La cuisine en action', category: 'cuisine', tall: true },
];

export const galleryCategories = [
  { id: 'all', label: 'Tout' },
  { id: 'cuisine', label: 'Cuisine' },
  { id: 'cadre', label: 'Le cadre' },
  { id: 'bar', label: 'Bar & Lounge' },
  { id: 'evenements', label: 'Événements' },
];

export const formatPrice = (value) =>
  value == null ? 'Selon la carte' : `${value.toLocaleString('fr-FR').replace(/ | /g, ' ')} FCFA`;
