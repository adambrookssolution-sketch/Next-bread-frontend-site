export const BRAND = {
  name: "Nestarez",
  fullName: "Panadería y Pastelería Nestarez",
  legalName: "Panificadora Nestarez",
  domain: "panaderianestarez.com",
  tagline: "Tradición artesanal en cada bocado",
  description:
    "Elaboramos productos de panadería de calidad con pasión artesanal, seleccionando los mejores insumos para llevar tradición y sabor a tu mesa.",
  email: "admin@panaderianestarez.com",
  whatsapp: "956660316",
  whatsappLink: "https://wa.me/51956660316",
  facebook: "https://www.facebook.com/PanaderiaNestarez",
  instagram: "", // Pendiente de confirmar
} as const;

export const COLORS = {
  primary: "#A92829",
  primaryLight: "#FBD6C6",
  secondary: "#503220",
  neutral: "#B3A69E",
  dark: "#2C2929",
  white: "#FFFFFF",
} as const;

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string[];
  mapsUrl: string;
  mapsShareUrl: string;
  embedQuery: string;
  coords?: { lat: number; lng: number };
}

export const LOCATIONS: Location[] = [
  {
    id: "grocio-prado",
    name: "Panadería Nestarez",
    address: "Av Grocio Prado Nº608, Pueblo Nuevo 11701",
    phone: "956660316",
    hours: [
      "Lunes a Sábado: 5:30 - 21:30",
      "Domingos: 5:30 - 12:00 y 17:30 - 21:00",
    ],
    mapsUrl: "https://maps.app.goo.gl/k8Kooa3FmiKbPWP86",
    mapsShareUrl: "https://share.google/9rigFnIBkHhXGXSyx",
    embedQuery: "Panadería+Nestarez+Av+Grocio+Prado+608+Pueblo+Nuevo+Chincha",
    coords: { lat: -13.4054193, lng: -76.1264098 },
  },
  {
    id: "sucre",
    name: "Panadería y Pastelería Nestarez",
    address: "C. Sucre 351, Chincha Alta 11701",
    phone: "976456905",
    hours: [
      "Lunes a Sábado: 6:00 - 20:00",
      "Domingos: 6:00 - 19:00",
    ],
    mapsUrl: "https://maps.app.goo.gl/7eGT3Gqyd9JY81hp9",
    mapsShareUrl: "https://share.google/3w6q0gzVtrxEa4TQY",
    embedQuery: "Panadería+y+Pastelería+Nestarez+Sucre+351+Chincha+Alta",
  },
  {
    id: "italia-378",
    name: "Panadería y Pastelería Nestarez",
    address: "Jirón Italia 378, Chincha Alta 11701",
    phone: "902599497",
    hours: ["Lunes a Domingo: 5:30 - 21:30"],
    mapsUrl: "https://maps.app.goo.gl/4hiqud7EWUpPVYtj9",
    mapsShareUrl: "https://share.google/NYtWIWXTwXOswevKF",
    embedQuery: "Panadería+y+Pastelería+Nestarez+Jirón+Italia+378+Chincha+Alta",
  },
  {
    id: "italia-268",
    name: "Panadería y Pastelería Nestarez",
    address: "Jirón Italia 268, Chincha Alta 11701",
    phone: "959059749",
    hours: [
      "Lunes a Sábado: 7:00 - 20:00",
      "Domingos: 7:00 - 14:00",
    ],
    mapsUrl: "https://maps.app.goo.gl/r1BEgbaGvdzAKZwU6",
    mapsShareUrl: "https://share.google/KTEsJHR4zILwgbS61",
    embedQuery: "Panadería+y+Pastelería+Nestarez+Jirón+Italia+268+Chincha+Alta",
  },
];

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  bestSeller?: boolean;
}

export const PRODUCT_CATEGORIES = [
  "Todos",
  "Panes Clásicos",
  "Panes de Molde",
  "Panes Especiales",
  "Panes Embolsados",
  "Pastelería",
] as const;

export const PRODUCTS: Product[] = [
  // === BEST SELLER ===
  {
    id: "galletas-de-agua",
    name: "Galletas de Agua",
    category: "Panes Embolsados",
    image: "/images/products/30.jpg",
    description: "Nuestro producto estrella. Crujientes, ligeras y con el sabor artesanal que nos define. El motivo de nuestro isologo.",
    bestSeller: true,
  },

  // === PANES CLÁSICOS ===
  {
    id: "pan-frances",
    name: "Pan Francés",
    category: "Panes Clásicos",
    image: "/images/products/91.jpg",
    description: "El clásico pan francés de corteza crujiente y miga suave, ideal para acompañar cada comida.",
  },
  {
    id: "pan-ovalado",
    name: "Pan Ovalado",
    category: "Panes Clásicos",
    image: "/images/products/55.jpg",
    description: "Pan artesanal de forma ovalada, corteza dorada y miga tierna.",
  },
  {
    id: "pan-trenzado",
    name: "Pan Trenzado",
    category: "Panes Clásicos",
    image: "/images/products/99.jpg",
    description: "Pan trenzado artesanal con corteza dorada y aroma incomparable.",
  },
  {
    id: "pan-redondo",
    name: "Pan Redondo",
    category: "Panes Clásicos",
    image: "/images/products/109.jpg",
    description: "Pan redondo tradicional con corteza firme y miga esponjosa, perfecto para el día a día.",
  },

  // === PANES DE MOLDE ===
  {
    id: "pan-de-molde-blanco",
    name: "Pan de Molde Blanco",
    category: "Panes de Molde",
    image: "/images/products/pan-molde-blanco.jpg",
    description: "Pan de molde clásico, suave y esponjoso, ideal para sándwiches y tostadas.",
  },
  {
    id: "pan-de-molde-integral",
    name: "Pan de Molde Integral",
    category: "Panes de Molde",
    image: "/images/products/68.jpg",
    description: "Pan de molde integral con la fibra y el sabor de los granos enteros.",
  },

  // === PANES ESPECIALES ===
  {
    id: "pan-de-hamburguesa",
    name: "Pan de Hamburguesa",
    category: "Panes Especiales",
    image: "/images/products/105.jpg",
    description: "Pan suave con sésamo, perfecto para tus hamburguesas favoritas.",
  },
  {
    id: "pan-de-yema",
    name: "Pan de Yema",
    category: "Panes Especiales",
    image: "/images/products/102.jpg",
    description: "Pan dulce de yema con sésamo, suave por dentro y dorado por fuera. Un clásico de la panadería peruana.",
  },
  {
    id: "pan-de-yema-redondo",
    name: "Pan de Yema Redondo",
    category: "Panes Especiales",
    image: "/images/products/117.jpg",
    description: "Versión redonda de nuestro pan de yema, con la misma suavidad y sabor inconfundible.",
  },
  {
    id: "pan-redondo-integral",
    name: "Pan Integral Redondo",
    category: "Panes Especiales",
    image: "/images/products/114.jpg",
    description: "Pan redondo elaborado con harina integral, nutritivo y con sabor auténtico.",
  },

  // === BOLLERÍA ===
  {
    id: "enrollado",
    name: "Enrollado",
    category: "Panes Embolsados",
    image: "/images/products/95.jpg",
    description: "Delicioso enrollado artesanal con masa hojaldrada y suave.",
  },
  {
    id: "galleta-artesanal",
    name: "Galleta Artesanal",
    category: "Panes Embolsados",
    image: "/images/products/80.jpg",
    description: "Galletas horneadas con receta tradicional y sabor único.",
  },

  // === PASTELERÍA ===
  {
    id: "bizcocho",
    name: "Bizcocho",
    category: "Pastelería",
    image: "/images/products/72.jpg",
    description: "Bizcocho casero horneado con dedicación y los mejores ingredientes.",
  },
  {
    id: "queque",
    name: "Queque Casero",
    category: "Pastelería",
    image: "/images/products/75.jpg",
    description: "Queque tradicional con miga húmeda y sabor a hogar, perfecto para la hora del té.",
  },
  {
    id: "muffin",
    name: "Muffin Artesanal",
    category: "Pastelería",
    image: "/images/products/63.jpg",
    description: "Muffin artesanal con textura húmeda y sabor irresistible.",
  },
  {
    id: "muffin-chocolate",
    name: "Muffin de Chocolate",
    category: "Pastelería",
    image: "/images/products/65.jpg",
    description: "Muffin de chocolate intenso con trocitos de cacao, para los amantes del chocolate.",
  },
];

export const ABOUT = {
  mision:
    "Elaborar y ofrecer productos de panadería de calidad a un precio justo, seleccionando adecuadamente nuestros insumos e innovando en tecnología y procesos, para satisfacer a nuestros clientes, y creando lazos de confianza en cada uno de nuestros productos.",
  vision:
    "Ser una panadería reconocida a nivel regional, con presencia física en diferentes puntos de la región. Posicionarnos en las redes sociales y tener comunicación activa con nuestros clientes y mantener nuestro compromiso de ofrecer productos de calidad.",
  valores: [
    {
      title: "Pasión Artesanal",
      description:
        "Nos entregamos con alma a cada receta, cuidando cada etapa del proceso con la calidez y la atención que solo lo hecho a mano puede transmitir.",
    },
    {
      title: "Tradición",
      description:
        "Mantenemos vivo el legado de los sabores que perduran, amasando el presente con la sabiduría de ayer.",
    },
    {
      title: "Calidad",
      description:
        "Seleccionamos cada materia prima con una mirada artesanal, transformando lo simple en algo extraordinario.",
    },
    {
      title: "Compromiso",
      description:
        "Nos comprometemos con cada historia que recibimos, cuidando el proceso con atención, calidez y sensibilidad.",
    },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Locales", href: "#locales" },
  { label: "Contacto", href: "#contacto" },
] as const;
