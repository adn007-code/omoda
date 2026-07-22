import {
  BatteryCharging,
  Car,
  Gauge,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap
} from "lucide-react";

export const editableContentStorageKey = "asco-jaecoo-j5-content";

export type EditableFeature = {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
};

export type EditableUnit = {
  name: string;
  price: string;
  description: string;
  highlights: string[];
};

export type EditableContent = {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryButton: string;
    secondaryButton: string;
    image: string;
  };
  showcase: {
    eyebrow: string;
    headline: string;
    body: string;
    image: string;
    pillars: string[];
  };
  features: {
    eyebrow: string;
    headline: string;
    body: string;
    cards: EditableFeature[];
  };
  pricing: {
    eyebrow: string;
    headline: string;
    body: string;
    units: EditableUnit[];
  };
  interior: {
    eyebrow: string;
    headline: string;
    body: string;
    image: string;
    bullets: string[];
  };
  cta: {
    eyebrow: string;
    headline: string;
    body: string;
    button: string;
    whatsapp: string;
  };
  gallery: string[];
};

export const iconMap = {
  MapPinned,
  Sun,
  Sparkles,
  BatteryCharging,
  ShieldCheck,
  Zap,
  Gauge,
  Car
};

export const defaultContent: EditableContent = {
  hero: {
    eyebrow: "OMODA-JAECOO",
    headline: "Drive Beyond Limits",
    subheadline: "Premium SUV designed for modern families and adventure.",
    primaryButton: "Explore Now",
    secondaryButton: "Book Test Drive",
    image: "/J5_1_2e7da5b171.jpegw3840q75.webp"
  },
  showcase: {
    eyebrow: "Luxury Vehicle Showcase",
    headline: "Bold & Modern Design",
    body:
      "The JAECOO J5 blends confident SUV proportions with a refined luxury presence. Clean surfacing, a commanding stance, and precise details create a vehicle that feels equally at home at a five-star entrance or on the edge of the city.",
    image: "/Halotomotif-Interior-Jaecoo-J5-EV.jpg.webp",
    pillars: ["Urban Precision", "Adventure Poise", "Family Comfort"]
  },
  features: {
    eyebrow: "Feature Highlights",
    headline: "Intelligence with Presence",
    body:
      "Six premium systems shaped around daily ease, long-distance calm, and the sense of occasion expected from a modern luxury SUV.",
    cards: [
      {
        title: "Intelligent Driving Assistance",
        description: "Confidence-led support for long highway journeys and crowded urban routes.",
        icon: "MapPinned"
      },
      {
        title: "Panoramic Sunroof",
        description: "A brighter cabin experience with expansive skyward views for every row.",
        icon: "Sun"
      },
      {
        title: "Premium Interior Cabin",
        description: "Soft-touch surfaces, thoughtful storage, and quiet sophistication throughout.",
        icon: "Sparkles"
      },
      {
        title: "Wireless Charging",
        description: "A cleaner console and effortless charging for compatible devices.",
        icon: "BatteryCharging"
      },
      {
        title: "Advanced Safety Technology",
        description: "Layered protection engineered around family journeys and daily peace of mind.",
        icon: "ShieldCheck"
      },
      {
        title: "Turbo Performance Engine",
        description: "Responsive power delivery tuned for confident overtakes and open-road pace.",
        icon: "Zap"
      }
    ]
  },
  pricing: {
    eyebrow: "Unit & Harga",
    headline: "Pilih JAECOO J5 yang paling cocok untuk Anda",
    body:
      "Konsultasikan pilihan unit, warna, promo, simulasi kredit, dan ketersediaan kendaraan bersama ASCO JAECOO.",
    units: [
      {
        name: "JAECOO J5",
        price: "Hubungi Sales",
        description: "SUV premium untuk keluarga modern dengan desain gagah dan kabin nyaman.",
        highlights: ["Premium SUV", "Modern Cabin", "Family Comfort"]
      },
      {
        name: "JAECOO J5 EV",
        price: "Hubungi Sales",
        description: "Pilihan elektrifikasi untuk pengalaman berkendara yang halus, tenang, dan futuristik.",
        highlights: ["EV Technology", "Quiet Drive", "Efficient Mobility"]
      },
      {
        name: "JAECOO J7",
        price: "Hubungi Sales",
        description: "Paket lengkap untuk pengguna yang mengutamakan fitur, kenyamanan, dan tampilan premium.",
        highlights: ["Premium Features", "Advanced Safety", "Panoramic Experience"]
      }
    ]
  },
  interior: {
    eyebrow: "Interior Experience",
    headline: "A refined cabin for every kind of journey",
    body:
      "Inside the JAECOO J5, premium materials, thoughtful technology, and spacious comfort create a calm, capable environment for families who move between city rhythm and open-road escape.",
    image: "/03_OL_97070cda8e.jpegw3840q75.webp",
    bullets: [
      "Driver-focused cockpit with clean horizontal architecture",
      "Quiet cabin tuning for calm family travel",
      "Flexible storage and seating for weekdays or weekends",
      "Premium touchpoints with refined ambient lighting"
    ]
  },
  cta: {
    eyebrow: "Book a Test Drive",
    headline: "Experience The Future Of Driving",
    body: "Connect with Sucia for availability, vehicle consultation, and a private ASCO JAECOO test drive appointment.",
    button: "Contact Sucia",
    whatsapp: "https://wa.me/628958560157"
  },
  gallery: [
    "/J5_1_2e7da5b171.jpegw3840q75.webp",
    "/Halotomotif-Interior-Jaecoo-J5-EV.jpg.webp",
    "/03_OL_97070cda8e.jpegw3840q75.webp",
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
  ]
};

export function mergeContent(content: Partial<EditableContent> | null): EditableContent {
  if (!content) {
    return defaultContent;
  }

  return {
    ...defaultContent,
    ...content,
    hero: { ...defaultContent.hero, ...content.hero },
    showcase: { ...defaultContent.showcase, ...content.showcase },
    features: {
      ...defaultContent.features,
      ...content.features,
      cards: content.features?.cards?.length ? content.features.cards : defaultContent.features.cards
    },
    pricing: {
      ...defaultContent.pricing,
      ...content.pricing,
      units: content.pricing?.units?.length ? content.pricing.units : defaultContent.pricing.units
    },
    interior: { ...defaultContent.interior, ...content.interior },
    cta: { ...defaultContent.cta, ...content.cta },
    gallery: content.gallery?.length ? content.gallery : defaultContent.gallery
  };
}
