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

export const games = [
  "EA FC / FIFA",
  "Mortal Kombat",
  "Call of Duty",
  "NBA 2K",
  "Tekken",
  "PES Classics",
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

export type GalleryItem = {
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  poster?: string;
};

export const leaderboard = [
  { player: "Shadow7", game: "EA FC", points: 92 },
  { player: "AkureAce", game: "Mortal Kombat", points: 84 },
  { player: "GoldPad", game: "NBA 2K", points: 80 },
  { player: "SniperNG", game: "Call of Duty", points: 76 },
];

// Bank details for manual transfer, used by both competition entry and
// website order checkout — same FFSET Limited account either way.
export const bankTransferDetails = {
  bankName: "Fidelity Bank",
  accountNumber: "5080217970",
  accountName: "FF SET LIMITED",
};

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
