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
      "Rare bottles and prestige pours in a warm room built for slow conversations.",
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
      "Sharp tables and controlled lighting, for casual games or serious matchups.",
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
      "Console battles on big screens, built for a social, competitive crowd.",
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
      "Birthday linkups and themed nights, styled with music, lighting, and group seating.",
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
      "Structured tournaments and prize-driven formats that turn every match into a main event.",
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
      "A polished setting for client meetups and after-hours business conversations.",
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
    title: "Six Experiences, One Roof",
    description: "Wine, snooker, gaming, events, competitions, and private hosting.",
    icon: "spark" as const,
  },
  {
    title: "Managed & Secure",
    description: "Attentive staff and controlled access throughout your visit.",
    icon: "shield" as const,
  },
  {
    title: "Built for Groups",
    description: "Flexible seating for pairs, crews, and full-lounge bookings.",
    icon: "lounge" as const,
  },
  {
    title: "Book on WhatsApp",
    description: "Reserve a table, wine, or event slot in one message.",
    icon: "chat" as const,
  },
];

export const wines = [
  {
    name: "Dom Perignon Vintage",
    category: "Champagne",
    description: "A prestige celebration bottle with bright citrus depth and creamy finish.",
    size: "750ml",
    availability: "Available",
    imageUrl: "/dom-perignon.jpg",
  },
  {
    name: "Hennessy XO",
    category: "Cognac",
    description: "Layered oak spice and velvet warmth for premium late-night sipping.",
    size: "700ml",
    availability: "Limited Stock",
    imageUrl: "/hennessy-xo.jpg",
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
    imageUrl: "/don-julio-1942.jpg",
  },
  {
    name: "Chateau Margaux Reserve",
    category: "Red Wine",
    description: "Full-bodied structure for guests who want heritage and statement pours.",
    size: "750ml",
    availability: "Available",
    imageUrl: "/red-wine-reserve.jpg",
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

export type LoungeEvent = {
  title: string;
  date: string;
  frequency: "Weekly" | "Monthly" | "On Request" | "Seasonal";
  description: string;
  icon: "music" | "controller" | "wine" | "cake" | "trophy";
  imageUrl: string;
  imagePosition?: string;
};

export const events: LoungeEvent[] = [
  {
    title: "DJ Night",
    date: "Every Friday",
    frequency: "Weekly",
    description: "Deep lounge energy with a curated sound palette and late-night momentum.",
    icon: "music",
    imageUrl:
      "https://images.unsplash.com/photo-1750700383190-85b2a6626916?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Game Night",
    date: "Every Saturday",
    frequency: "Weekly",
    description: "Competitive console rotations, bragging rights, and a packed crowd vibe.",
    icon: "controller",
    imageUrl: "/game-night.jpg",
  },
  {
    title: "Wine Tasting",
    date: "First Sunday Monthly",
    frequency: "Monthly",
    description: "Guided premium selections with pairing notes and exclusive reserve previews.",
    icon: "wine",
    imageUrl:
      "https://images.unsplash.com/photo-1685461936207-f4b86fe7fcf4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Birthday Hangout",
    date: "On Request",
    frequency: "On Request",
    description: "Custom setup for intimate celebrations with premium service options.",
    icon: "cake",
    imageUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Football Viewing Night",
    date: "Match Days",
    frequency: "Seasonal",
    description: "Big-screen football, sharp sound, and a social atmosphere built for drama.",
    icon: "trophy",
    imageUrl:
      "https://images.unsplash.com/photo-1671368913134-c211bc02487f?auto=format&fit=crop&w=1200&q=80",
  },
];

export type GalleryItem = {
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  poster?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    title: "Snooker Lounge",
    category: "Interior",
    type: "image",
    src: "/snooker.jpg",
  },
  {
    title: "Wine Display",
    category: "Wines",
    type: "video",
    src: "/wine.mp4",
    poster: "/poster-wine.jpg",
  },
  {
    title: "Bottle Package Showcase",
    category: "Premium Packages",
    type: "video",
    src: "/wine packages.mp4",
    poster: "/poster-packages.jpg",
  },
  {
    title: "Lyta at FFSET Lounge",
    category: "Celebrity Visit",
    type: "video",
    src: "/lyta nigeria celebrity in FFset.mp4",
    poster: "/poster-lyta.jpg",
  },
  {
    title: "Meet the Founder",
    category: "Leadership",
    type: "image",
    src: "/ceo.jpeg",
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
