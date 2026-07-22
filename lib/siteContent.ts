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

export type EditableColorOption = {
  name: string;
  image: string;
};

export type EditableUnit = {
  name: string;
  price: string;
  description: string;
  highlights: string[];
  colors?: EditableColorOption[];
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
    subheadline: "SUV premium yang dirancang untuk keluarga modern dan petualangan.",
    primaryButton: "Jelajahi Sekarang",
    secondaryButton: "Booking Test Drive",
    image: "/J5_1_2e7da5b171.jpegw3840q75.webp"
  },
  showcase: {
    eyebrow: "Showcase Kendaraan Mewah",
    headline: "Desain Berani & Modern",
    body:
      "JAECOO J5 memadukan proporsi SUV yang gagah dengan kesan mewah yang elegan. Permukaan bodi yang bersih, tampilan yang tegas, dan detail yang presisi menghadirkan kendaraan yang tetap serasi baik di pintu masuk hotel bintang lima maupun di pinggiran kota.",
    image: "/Halotomotif-Interior-Jaecoo-J5-EV.jpg.webp",
    pillars: ["Presisi Perkotaan", "Ketenangan Berpetualang", "Kenyamanan Keluarga"]
  },
  features: {
    eyebrow: "Fitur Unggulan",
    headline: "Kecerdasan dengan Kehadiran",
    body:
      "Enam sistem premium yang dirancang untuk kemudahan sehari-hari, ketenangan perjalanan jauh, dan kesan istimewa yang diharapkan dari SUV mewah modern.",
    cards: [
      {
        title: "Bantuan Berkendara Cerdas",
        description: "Dukungan penuh percaya diri untuk perjalanan jauh di jalan tol maupun rute perkotaan yang padat.",
        icon: "MapPinned"
      },
      {
        title: "Sunroof Panoramik",
        description: "Kabin yang lebih terang dengan pemandangan langit yang luas di setiap baris kursi.",
        icon: "Sun"
      },
      {
        title: "Kabin Interior Premium",
        description: "Permukaan lembut, penyimpanan yang cerdas, dan kesan mewah yang senyap di setiap sudut.",
        icon: "Sparkles"
      },
      {
        title: "Daya Tahan Baterai hingga 461 km",
        description: "Jarak tempuh yang lega dalam sekali pengisian daya, siap diandalkan untuk perjalanan harian maupun luar kota.",
        icon: "BatteryCharging"
      },
      {
        title: "Teknologi Keselamatan Canggih",
        description: "Perlindungan berlapis yang dirancang untuk perjalanan keluarga dan ketenangan pikiran setiap hari.",
        icon: "ShieldCheck"
      },
      {
        title: "Mesin Turbo Berperforma Tinggi",
        description: "Tenaga yang responsif dan siap diandalkan untuk menyalip dengan percaya diri dan melaju di jalan terbuka.",
        icon: "Zap"
      }
    ]
  },
  pricing: {
    eyebrow: "Unit & Harga",
    headline: "Pilih JAECOO J5 yang paling cocok untuk Anda",
    body:
      "Konsultasikan pilihan unit, warna, promo, simulasi kredit, dan ketersediaan kendaraan bersama OMODA-JAECOO.",
    units: [
      {
        name: "JAECOO J5",
        price: "Hubungi Sales",
        description: "SUV premium untuk keluarga modern dengan desain gagah dan kabin nyaman.",
        highlights: ["SUV Premium", "Kabin Modern", "Kenyamanan Keluarga", "Garansi 8 Tahun"]
      },
      {
        name: "JAECOO J5 EV",
        price: "Hubungi Sales",
        description: "Pilihan elektrifikasi untuk pengalaman berkendara yang halus, tenang, dan futuristik.",
        highlights: [
          "Teknologi EV",
          "Berkendara Senyap",
          "Mobilitas Efisien",
          "Daya Tahan Baterai hingga 461 km",
          "Garansi 8 Tahun"
        ],
        colors: [
          { name: "Ivory Grey", image: "/colors/ivory-grey.jpeg" },
          { name: "Forest Green", image: "/colors/forest-green.jpeg" },
          { name: "Pristine White", image: "/colors/pristine-white.jpeg" },
          { name: "Jet Black", image: "/colors/jet-black.jpeg" }
        ]
      },
      {
        name: "JAECOO J7",
        price: "Hubungi Sales",
        description: "Paket lengkap untuk pengguna yang mengutamakan fitur, kenyamanan, dan tampilan premium.",
        highlights: ["Fitur Premium", "Keselamatan Canggih", "Pengalaman Panoramik", "Garansi 8 Tahun"],
        colors: [
          { name: "Forest Green", image: "/colors/j7-green.webp" },
          { name: "Titanium Silver", image: "/colors/j7-silver.webp" },
          { name: "Jet Black", image: "/colors/j7-black.webp" },
          { name: "Pearl White", image: "/colors/j7-white.webp" }
        ]
      },
      {
        name: "JAECOO J8",
        price: "Hubungi Sales",
        description: "SUV flagship dengan tampilan gagah, kabin luas, dan kenyamanan kelas atas untuk keluarga besar.",
        highlights: ["SUV Flagship", "Kabin Luas", "Fitur Kelas Atas", "Garansi 8 Tahun"],
        colors: [
          { name: "Titanium Silver", image: "/colors/j8-silver.webp" },
          { name: "Jet Black", image: "/colors/j8-black.webp" },
          { name: "Pearl White", image: "/colors/j8-white.webp" },
          { name: "Ocean Blue", image: "/colors/j8-blue.webp" }
        ]
      }
    ]
  },
  interior: {
    eyebrow: "Pengalaman Interior",
    headline: "Kabin elegan untuk setiap jenis perjalanan",
    body:
      "Di dalam JAECOO J5, material premium, teknologi yang cerdas, dan ruang yang lapang menciptakan lingkungan yang tenang dan tangguh bagi keluarga yang bergerak dari ritme perkotaan hingga petualangan di jalan terbuka.",
    image: "/03_OL_97070cda8e.jpegw3840q75.webp",
    bullets: [
      "Kokpit berorientasi pengemudi dengan arsitektur horizontal yang bersih",
      "Peredaman kabin yang senyap untuk perjalanan keluarga yang tenang",
      "Penyimpanan dan pengaturan kursi yang fleksibel untuk hari kerja maupun akhir pekan",
      "Titik sentuh premium dengan pencahayaan ambient yang elegan"
    ]
  },
  cta: {
    eyebrow: "Booking Test Drive",
    headline: "Rasakan Masa Depan Berkendara",
    body: "Hubungi Sucia untuk ketersediaan unit, konsultasi kendaraan, dan jadwal test drive privat OMODA JAECOO.",
    button: "Hubungi Sucia",
    whatsapp: "https://wa.me/628958560157"
  },
  gallery: [
    "/J5_1_2e7da5b171.jpegw3840q75.webp",
    "/Halotomotif-Interior-Jaecoo-J5-EV.jpg.webp",
    "/03_OL_97070cda8e.jpegw3840q75.webp",
    "/1.webp",
    "/2.webp",
    "/3.webp",
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
