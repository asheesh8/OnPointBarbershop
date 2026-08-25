/**
 * Single source of truth for every business fact on the site.
 *
 * Sources, in order of authority:
 *   1. The shop's live Vagaro profiles — vagaro.com/onpointbarbershop and
 *      /onpointbarbershop2 — including the staff pages, where each barber
 *      wrote their own bio. This is the booking system of record.
 *   2. The previous marketing site, onpointbarbershopvt.com.
 *
 * Where the two disagree, Vagaro wins and the conflict is written up in
 * docs/content-audit.md. Nothing in this file is invented.
 */

export type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

/** Minutes from midnight, 24h. `null` = closed that day. */
export type DayHours = { open: number; close: number } | null;

const h = (hour: number, minute = 0) => hour * 60 + minute;

export type Location = {
  slug: 'williston' | 'colchester';
  name: string;
  shortName: string;
  tagline: string;
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneHref: string;
  bookingUrl: string;
  staffUrl: string;
  directionsUrl: string;
  mapEmbedUrl: string;
  /** Verified on the shop's Vagaro profile. */
  rating: string;
  reviewCount: number;
  hours: Record<DayKey, DayHours>;
  /** Human-readable hours, grouped the way the shop states them. */
  hoursSummary: { label: string; value: string }[];
  specialties: string[];
  amenities: string[];
};

export const locations: Location[] = [
  {
    slug: 'williston',
    name: 'On Point Barbershop',
    shortName: 'Williston',
    tagline: 'The original shop',
    street: '777 Zephyr Road',
    city: 'Williston',
    state: 'VT',
    zip: '05495',
    phone: '(802) 857-5041',
    phoneHref: 'tel:+18028575041',
    bookingUrl: 'https://www.vagaro.com/onpointbarbershop',
    staffUrl: 'https://www.vagaro.com/onpointbarbershop/staff',
    directionsUrl: 'https://share.google/VIgfhL4pVwgc4KtjF',
    mapEmbedUrl:
      'https://www.google.com/maps?q=777+Zephyr+Road+Williston+VT+05495&output=embed',
    rating: '5.0',
    reviewCount: 146,
    hours: {
      sun: null,
      mon: { open: h(8), close: h(17) },
      tue: { open: h(8), close: h(17) },
      wed: { open: h(8), close: h(17) },
      thu: { open: h(9), close: h(19) },
      fri: { open: h(8), close: h(17) },
      sat: { open: h(9), close: h(14) },
    },
    hoursSummary: [
      { label: 'Mon – Wed', value: '8:00 AM – 5:00 PM' },
      { label: 'Thursday', value: '9:00 AM – 7:00 PM' },
      { label: 'Friday', value: '8:00 AM – 5:00 PM' },
      { label: 'Saturday', value: '9:00 AM – 2:00 PM' },
      { label: 'Sunday', value: 'Closed' },
    ],
    specialties: ['Classic Cut', 'Skin Fade', 'Beard Trim', 'Hot Towel Shave'],
    amenities: ['Walk-ins welcome', 'Free parking'],
  },
  {
    slug: 'colchester',
    name: 'On Point Barbershop 2',
    shortName: 'Colchester',
    tagline: 'Barbering + cosmetology',
    street: '97 Blakely Rd',
    unit: 'Unit 7',
    city: 'Colchester',
    state: 'VT',
    zip: '05446',
    phone: '(802) 448-3781',
    phoneHref: 'tel:+18024483781',
    bookingUrl: 'https://www.vagaro.com/onpointbarbershop2',
    staffUrl: 'https://www.vagaro.com/onpointbarbershop2/staff',
    directionsUrl: 'https://share.google/cv8prh0vBdGwDWHx8',
    mapEmbedUrl:
      'https://www.google.com/maps?q=97+Blakely+Rd+Unit+7+Colchester+VT+05446&output=embed',
    rating: '4.8',
    reviewCount: 16,
    // NOTE: these are Vagaro's hours and they differ from the old site, which
    // advertised Thu 8–7 and Sat 9–2. See docs/content-audit.md.
    hours: {
      sun: null,
      mon: { open: h(8), close: h(19) },
      tue: { open: h(8), close: h(17) },
      wed: { open: h(8), close: h(17) },
      thu: { open: h(9), close: h(19) },
      fri: { open: h(8), close: h(17) },
      sat: null,
    },
    hoursSummary: [
      { label: 'Monday', value: '8:00 AM – 7:00 PM' },
      { label: 'Tue & Wed', value: '8:00 AM – 5:00 PM' },
      { label: 'Thursday', value: '9:00 AM – 7:00 PM' },
      { label: 'Friday', value: '8:00 AM – 5:00 PM' },
      { label: 'Sat & Sun', value: 'Closed' },
    ],
    specialties: ['Classic Cut', 'Skin Fade', "Women's Colour", 'Cosmetology'],
    amenities: ['Walk-ins welcome', 'Free parking', 'WiFi', 'Accessible'],
  },
];

export const byslug = (slug: Location['slug']) =>
  locations.find((l) => l.slug === slug)!;

/** Combined across both Vagaro profiles: 146 × 5.0 + 16 × 4.8 = 4.98 over 162. */
export const combinedReviews = {
  rating: '4.9',
  count: locations.reduce((n, l) => n + l.reviewCount, 0),
};

export const site = {
  name: 'On Point Barbershop',
  legalName: 'On Point Barbershop',
  url: 'https://onpointbarbershopvt.com',
  email: 'jake@onpointbarbershopvt.com',
  emailHref: 'mailto:jake@onpointbarbershopvt.com',
  instagram: 'https://www.instagram.com/onpointbarbershopvt',
  instagramHandle: '@onpointbarbershopvt',
  facebook: 'https://www.facebook.com/OnPointBarbershopVT/',
  serviceArea: [
    'Williston',
    'Colchester',
    'Burlington',
    'South Burlington',
    'Essex',
    'Winooski',
    'Shelburne',
    'Milton',
  ],
} as const;

export type Service = {
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  /** Which shops perform it. */
  at: Array<Location['slug']>;
};

export const services: Service[] = [
  {
    name: 'Hair Cut',
    description:
      'Every haircut from kids through age 64, finished to a top-shelf standard.',
    price: '$30',
    priceNote: 'ages 0–64',
    at: ['williston', 'colchester'],
  },
  {
    name: 'Cut & Beard Combo',
    description: 'Top-shelf cut, line up, beard trim and a straight-razor edge.',
    price: '$40',
    at: ['williston', 'colchester'],
  },
  {
    name: 'Hair & Face Shave Combo',
    description:
      'Top-shelf cut with a full hot-towel straight-razor face shave.',
    price: '$50',
    at: ['williston', 'colchester'],
  },
  {
    name: 'Beard Trim & Edge',
    description: 'Trim, shape, warm towel, lather and straight-razor edging.',
    price: '$15',
    at: ['williston', 'colchester'],
  },
  {
    name: 'Buzz Cut',
    description: 'One-length clipper cut, cleaned up and edged.',
    price: '$22',
    priceNote: 'starting at',
    at: ['williston', 'colchester'],
  },
  {
    name: 'Military, Veterans & Seniors',
    description:
      'Standing rate for active military, EMS, police, first responders and anyone 65 or over.',
    price: '$26',
    at: ['williston', 'colchester'],
  },
  {
    name: 'Hair Colour & Highlights',
    description:
      'Full colour, balayage and vivid work with our licensed colour specialist.',
    price: '$80',
    priceNote: 'from — Colchester only',
    at: ['colchester'],
  },
];

export type TeamMember = {
  name: string;
  slug: string;
  role: string;
  /** One-line summary for the card face. */
  specialty: string;
  /** The barber's own words, from their Vagaro staff profile. */
  bio: string;
  photo: string;
  rating: string;
  reviewCount: number;
  at: Array<Location['slug']>;
  /** Free-text when someone splits the week between shops. */
  schedule?: string;
};

/**
 * Bios are the barbers' own text from their Vagaro staff pages, edited only for
 * punctuation, spelling of school names, and sentence breaks. The substance and
 * voice are theirs. Ratings are their real per-barber Vagaro scores.
 */
export const team: TeamMember[] = [
  {
    name: 'Jake Sleeper',
    slug: 'jake-sleeper',
    role: 'Owner & Master Barber',
    specialty: 'Precision cuts and barber mentorship',
    bio: "Gave my first hair cut in 2002 and it got my interest. As years passed I learned techniques, styles, professionalism and the barbering culture from different people in different states all through New England and the east coast. September of 2010 I enrolled in O'Brien Aveda Institute's barbering program, graduating top of the class, and have been featured as a successful barber role model for the school. After graduating: two years at Associates in Haircutting, two years at Burlington Barbershop — manager for one of them — four years at Old Soul Barbershop, and now my own spot, On Point Barbershop. I've travelled all over Vermont and have given hair cuts in homes, rehabs, gyms, schools, youth services, workshops, beaches and back yards.",
    photo: '/team/jake-sleeper.webp',
    rating: '5.0',
    reviewCount: 90,
    at: ['williston', 'colchester'],
    schedule: 'Williston Mon–Wed · Colchester Thu–Sat',
  },
  {
    name: 'Thaw Say',
    slug: 'thaw-say',
    role: 'Manager & Licensed Barber',
    specialty: 'Fades, line-ups and shop management',
    bio: "Graduate of O'Brien's Aveda Institute barbering program. Licensed barber for nine years. Previously at Clip for Men and O'Brien's BAR-ber Shop, then two years with On Point Barbershop. Now manager at On Point Barbershop 2.",
    photo: '/team/thaw-say.webp',
    rating: '5.0',
    reviewCount: 16,
    at: ['colchester'],
  },
  {
    name: 'James Lightholder',
    slug: 'james-lightholder',
    role: 'Master Barber',
    specialty: 'Classic scissor cuts and beard sculpting',
    bio: 'Graduate of the New England School of Barbering, and a master barber. Previously at Old Soul Barbershop and Bugattis.',
    photo: '/team/james-lightholder.webp',
    rating: '5.0',
    reviewCount: 11,
    at: ['williston'],
  },
  {
    name: 'Jeremy Jennings',
    slug: 'jeremy-jennings',
    role: 'Master Barber',
    specialty: 'Skin fades, modern styles and taper cuts',
    bio: "Graduated from O'Brien Aveda Institute of Barbering in 2012, then worked at Star Barbershop in Rutland for three years before joining On Point. Living that Vermont life is my bio.",
    photo: '/team/jeremy-jennings.webp',
    rating: '5.0',
    reviewCount: 6,
    at: ['williston'],
  },
  {
    name: 'Eric Edson',
    slug: 'eric-edson',
    role: 'Barber',
    specialty: 'Precision fades and modern texture',
    bio: "Hello, I'm Eric, a 28-year-old barber from beautiful Burlington, Vermont. With a passion for cutting hair and making people smile, I'm dedicated to providing top-notch service and unparalleled attention to detail. As a friendly, kind and talented barber, I'm committed to continually honing my craft and exceeding my clients' expectations. When you sit in my chair, you can expect a warm welcome, a listening ear, and a fresh new look that leaves you feeling confident and revitalised. I'm a proud graduate of O'Brien's Aveda Institute barbering program.",
    photo: '/team/eric-edson.webp',
    rating: '5.0',
    reviewCount: 8,
    at: ['williston'],
  },
  {
    name: 'Kong Say',
    slug: 'kong-say',
    role: 'Barber',
    specialty: 'Artistic fades and clean line-ups',
    bio: "Hello! My name is Kong, and I'm excited to start my new chapter at On Point Barbershop. I'm looking forward to meeting new people and providing the services you need. I started cutting hair my junior year, but it wasn't that serious; as I went into my senior year I took it seriously and started cutting a lot of people's hair, and that's when I saw myself becoming a barber. Watching barber YouTubers like 360 Jeezy and Vic Blends got me into barbering. It's also like doing art, and I love art work.",
    photo: '/team/kong-say.webp',
    rating: '5.0',
    reviewCount: 7,
    at: ['williston'],
  },
  {
    name: 'Heidi Larocque',
    slug: 'heidi-larocque',
    role: 'Senior Stylist & Colour Specialist',
    specialty: "Balayage, vivid colour and custom cuts",
    bio: "Heidi combines artistry and empathy to create hairstyles that feel like you. A graduate of the Aveda Institute, she's known for her intuitive approach, vibrant colour work and freehand creativity. Her signature services include balayage, vivid colours and custom cuts that complement each client's natural texture and lifestyle. Clients love the calm, judgement-free environment she creates, where every appointment feels personal, empowering and confidence-boosting.",
    photo: '/team/heidi-larocque.webp',
    rating: '5.0',
    reviewCount: 4,
    at: ['colchester'],
  },
];

/**
 * Real client work, taken from the shop's own Vagaro galleries. Four more
 * photos from those galleries are held in docs/pending-release/ because they
 * show identifiable minors and need parental consent before publication.
 */
export const realWork = [
  {
    src: '/work/texture-fade.webp',
    alt: 'A textured curly top over a tight skin fade, seen from above and behind',
    label: 'Textured top · skin fade',
  },
  {
    src: '/work/hard-part.webp',
    alt: 'A side part with a razored hard line and a tapered fade',
    label: 'Hard part · taper',
  },
  {
    src: '/work/classic-fade.webp',
    alt: 'A clean mid fade with a scissor-cut top, shown in profile',
    label: 'Mid fade · scissor top',
  },
  {
    src: '/work/crop-cut.webp',
    alt: 'A short textured crop cut, shown in profile',
    label: 'Textured crop',
  },
] as const;

/**
 * Only reviews we could attribute to a real, dated, public review are kept.
 * The previous site carried five more that could not be sourced anywhere; they
 * were removed rather than reproduced. See docs/content-audit.md.
 */
export const featuredReview = {
  quote: 'Great atmosphere, fantastic haircut and even better people!',
  author: 'Kaden D.',
  meta: 'Google review · Colchester',
};

export const faqs = [
  {
    q: 'Do I need an appointment?',
    a: 'Booking online is the surest way to get the barber and time you want, and it takes under a minute. Walk-ins are welcome at both shops whenever a chair is open, but we cannot promise a wait time.',
  },
  {
    q: 'How long does an appointment take?',
    a: 'A cut runs about 30 minutes. Add a beard trim or a hot-towel shave and you are closer to 45 minutes to an hour. We keep to the schedule without rushing the chair.',
  },
  {
    q: 'Which shop should I book?',
    a: 'Both shops share the same barbers, standards and pricing. Book Colchester for colour, highlights, balayage and full cosmetology services. Note that Colchester is closed Saturdays, while Williston is open until 2:00 PM.',
  },
  {
    q: 'Do you cut women’s hair?',
    a: 'Yes. Our Colchester shop is a full barbering and cosmetology studio with a licensed colour specialist on staff, and handles women’s cuts, colour, balayage and blowouts.',
  },
  {
    q: 'Do you offer a discount for service members?',
    a: 'Yes. Active military, EMS, police, first responders and anyone 65 or over pay a standing lower rate. It is on the menu, so you do not have to ask.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Give us as much notice as you can through Vagaro or by phone so we can offer the slot to someone else. Confirm current specifics with the shop when you book.',
  },
];

export const dayOrder: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const dayNames: Record<DayKey, string> = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
};
