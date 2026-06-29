export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/competitions", label: "Competitions" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const experienceNavigation = [
  { href: "/services", label: "Services" },
  { href: "/gaming", label: "Gaming" },
  { href: "/wines", label: "Wines" },
  { href: "/booking", label: "Booking" },
];

export const mobilePrimaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/competitions", label: "Competitions" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export type ServiceItem = {
  title: string;
  description: string;
  accent: string;
  category: string;
  imageUrl: string;
  imagePosition?: string;
  href: string;
  cta: string;
  icon: "wine" | "snooker" | "controller" | "calendar" | "trophy" | "briefcase";
};

export const services: ServiceItem[] = [
  {
    title: "Premium Wine Lounge",
    description:
      "Rare bottles, prestige pours, and a warm evening atmosphere designed for slow conversations and standout entrances.",
    accent: "Cellar experience",
    category: "What We Offer",
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    href: "/wines",
    cta: "Explore the wine list",
    icon: "wine",
  },
  {
    title: "Snooker Sessions",
    description:
      "Sharp tables, controlled lighting, and a refined room built for both relaxed rounds and serious matchups.",
    accent: "Table-side service",
    category: "What We Offer",
    imageUrl: "/snooker.jpg",
    imagePosition: "center 58%",
    href: "/gaming",
    cta: "See gaming spaces",
    icon: "snooker",
  },
  {
    title: "PlayStation Gaming",
    description:
      "Console battles with lounge comfort, cinematic screens, and premium energy that keeps every session social.",
    accent: "Big-screen gaming",
    category: "What We Offer",
    imageUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    href: "/gaming",
    cta: "View gaming packages",
    icon: "controller",
  },
  {
    title: "Events & Hangouts",
    description:
      "Curated nights, birthday linkups, and elevated lounge moments with music, lighting, and elegant seating.",
    accent: "Tailored hosting",
    category: "What We Offer",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
    href: "/events",
    cta: "Discover event nights",
    icon: "calendar",
  },
  {
    title: "Gaming Competitions",
    description:
      "Structured tournaments, crowd energy, and prize-driven formats that make every challenge feel like a main event.",
    accent: "Prize-driven events",
    category: "What We Offer",
    imageUrl:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80",
    href: "/competitions",
    cta: "Enter competitions",
    icon: "trophy",
  },
  {
    title: "Corporate Lounge Moments",
    description:
      "A polished setting for client meetups, after-hours conversations, and premium business-social connection.",
    accent: "Business-social blend",
    category: "What We Offer",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    href: "/booking",
    cta: "Book a private setup",
    icon: "briefcase",
  },
];

export const serviceHighlights = [
  {
    title: "Premium Experience",
    description: "Quality in every detail.",
    icon: "spark" as const,
  },
  {
    title: "Secure Environment",
    description: "Comfort and safety guaranteed.",
    icon: "shield" as const,
  },
  {
    title: "Luxury Atmosphere",
    description: "Designed for unforgettable nights.",
    icon: "lounge" as const,
  },
  {
    title: "Located in Akure",
    description: "Lagos branch coming soon.",
    icon: "pin" as const,
  },
];

export const wines = [
  {
    name: "Dom Perignon Vintage",
    category: "Champagne",
    description: "A prestige celebration bottle with bright citrus depth and creamy finish.",
    size: "750ml",
    availability: "Available",
    imageUrl:
      "https://images.vivino.com/thumbs/s5aXYaQiTu-V_xEYI3KXRg_pb_x600.png",
  },
  {
    name: "Hennessy XO",
    category: "Cognac",
    description: "Layered oak spice and velvet warmth for premium late-night sipping.",
    size: "700ml",
    availability: "Limited Stock",
    imageUrl:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Moet & Chandon Nectar",
    category: "Sparkling",
    description: "Lush fruit notes with a glamorous party profile and smooth sweetness.",
    size: "750ml",
    availability: "Available",
    imageUrl:
      "https://unwindbottleshop.com/cdn/shop/products/MOET_NECTAR_IMPERIAL.png?v=1710057823&width=1445",
  },
  {
    name: "Don Julio 1942",
    category: "Tequila",
    description: "Elegant agave character with a polished, collector-worthy finish.",
    size: "750ml",
    availability: "Reserve Only",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Don_Julio_2014.jpg/250px-Don_Julio_2014.jpg",
  },
  {
    name: "Chateau Margaux Reserve",
    category: "Red Wine",
    description: "Full-bodied structure for guests who want heritage and statement pours.",
    size: "750ml",
    availability: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Veuve Clicquot Brut",
    category: "Champagne",
    description: "Crisp luxury bubbles suited for brunch, birthdays, and bold entrances.",
    size: "750ml",
    availability: "Available",
    imageUrl:
      "https://static1.aporvino.com/4268-thickbox_default/veuve-clicquot-brut-yellow-label.jpg",
  },
];

export const games = [
  "EA FC / FIFA",
  "Mortal Kombat",
  "Call of Duty",
  "NBA 2K",
  "Tekken",
  "PES Classics",
];

export const gamingPackages = [
  {
    name: "After Work Rush",
    description: "One console bay, drinks-ready seating, and two hours of peak-hour play.",
    price: "From ₦18,000",
  },
  {
    name: "Squad Night Bundle",
    description: "Multi-player setup for friends with shared platter and bottle upgrade path.",
    price: "From ₦42,000",
  },
  {
    name: "Tournament Bay",
    description: "Bracket-ready screen setup for challenge nights and competition warmups.",
    price: "From ₦55,000",
  },
];

export const events = [
  {
    title: "DJ Night",
    date: "Every Friday",
    description: "Deep lounge energy with a curated sound palette and late-night momentum.",
  },
  {
    title: "Game Night",
    date: "Every Saturday",
    description: "Competitive console rotations, bragging rights, and a packed crowd vibe.",
  },
  {
    title: "Wine Tasting",
    date: "First Sunday Monthly",
    description: "Guided premium selections with pairing notes and exclusive reserve previews.",
  },
  {
    title: "Birthday Hangout",
    date: "On Request",
    description: "Custom setup for intimate celebrations with premium service options.",
  },
  {
    title: "Football Viewing Night",
    date: "Match Days",
    description: "Big-screen football, sharp sound, and a social atmosphere built for drama.",
  },
];

export const galleryItems = [
  {
    title: "Signature Brand Mark",
    category: "Lounge Identity",
    type: "image" as const,
    src: "/logo-crop.jpeg",
  },
  {
    title: "Wine Display Motion",
    category: "Wines",
    type: "video" as const,
    src: "/wine.mp4",
  },
  {
    title: "Bottle Package Showcase",
    category: "Premium Packages",
    type: "video" as const,
    src: "/wine packages.mp4",
  },
  {
    title: "Celebrity Visit Moment",
    category: "Events",
    type: "video" as const,
    src: "/lyta nigeria celebrity in FFset.mp4",
  },
  {
    title: "OBIDEYI OLUWASEYI",
    category: "CEO",
    type: "image" as const,
    src: "/ceo.jpeg",
  },
  {
    title: "OBIDEYI OLUWASEYI Portrait",
    category: "CEO",
    type: "image" as const,
    src: "/ceo2.jpeg",
  },
];

export const leaderboard = [
  { player: "Shadow7", game: "EA FC", points: 92 },
  { player: "AkureAce", game: "Mortal Kombat", points: 84 },
  { player: "GoldPad", game: "NBA 2K", points: 80 },
  { player: "SniperNG", game: "Call of Duty", points: 76 },
];

export const competitionRules = [
  "All players must complete registration before the deadline.",
  "Fixtures are single elimination until the final round.",
  "Late arrival beyond 15 minutes counts as a walkover.",
  "Controller disputes are resolved by the event marshals.",
  "Good sportsmanship is required throughout the tournament.",
];

export const competitionPaymentDetails = {
  bankName: "Fidelity Bank",
  accountNumber: "5080217970",
  accountName: "FF SET LIMITED",
  entryFee: "₦5,000",
  firstPrize: "₦100,000",
  secondPrize: "₦50,000",
  thirdPrize: "₦30,000",
};

export const dashboardStats = [
  { label: "Total Registrations", value: "184" },
  { label: "Total Bookings", value: "67" },
  { label: "Upcoming Events", value: "08" },
  { label: "Available Wines", value: "36" },
  { label: "Recent Messages", value: "21" },
];

export const contactDetails = {
  phonePrimary: "0810 427 3700",
  phoneSecondary: "0903 612 7868",
  whatsappBusinessNumber: "+234 906 770 4282",
  instagram: "@ffsetlounge",
  instagramUrl:
    "https://www.instagram.com/ffsetlounge?igsh=Z2duY2U0eWZnNTAx&utm_source=qr",
  facebook: "FF Set Lounge",
  email: "ffsetlimited@gmail.com",
  whatsapp: "https://wa.me/2349067704282",
  address: "Akure, Ondo State, Nigeria",
};

// TODO: Replace with backend-driven content once the Laravel/API layer is connected.
