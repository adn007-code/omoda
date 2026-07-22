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

export const navItems = ["Home", "Features", "Performance", "Interior", "Gallery", "Contact"];

export const images = {
  hero: "/J5_1_2e7da5b171.jpegw3840q75.webp",
  exterior: "/Halotomotif-Interior-Jaecoo-J5-EV.jpg.webp",
  side: "https://images.carexpert.com.au/resize/960/-/app/uploads/2026/02/2026-Jaecoo-J7-SHS-Track-2WD_Jaecoo-J7-PHEV-Stills-25.jpg",
  cabin: "/03_OL_97070cda8e.jpegw3840q75.webp",
  gallery: [
    "/J5_1_2e7da5b171.jpegw3840q75.webp",
    "/Halotomotif-Interior-Jaecoo-J5-EV.jpg.webp",
    "/03_OL_97070cda8e.jpegw3840q75.webp",
    "/1.webp",
    "/2.webp",
    "/3.webp",

  ]
};

export const features = [
  {
    title: "Intelligent Driving Assistance",
    description: "Confidence-led support for long highway journeys and crowded urban routes.",
    icon: MapPinned
  },
  {
    title: "Panoramic Sunroof",
    description: "A brighter cabin experience with expansive skyward views for every row.",
    icon: Sun
  },
  {
    title: "Premium Interior Cabin",
    description: "Soft-touch surfaces, thoughtful storage, and quiet sophistication throughout.",
    icon: Sparkles
  },
  {
    title: "Wireless Charging",
    description: "A cleaner console and effortless charging for compatible devices.",
    icon: BatteryCharging
  },
  {
    title: "Advanced Safety Technology",
    description: "Layered protection engineered around family journeys and daily peace of mind.",
    icon: ShieldCheck
  },
  {
    title: "Turbo Performance Engine",
    description: "Responsive power delivery tuned for confident overtakes and open-road pace.",
    icon: Zap
  }
];

export const performanceStats = [
  { label: "Tenaga", value: 235, suffix: " PS", icon: Gauge },
  { label: "Torsi", value: 367, suffix: " Nm", icon: Car },
  { label: "Mesin Turbo", value: 1, suffix: "", custom: "Turbo", icon: Zap },
  { label: "Teknologi Hybrid", value: 1, suffix: "", custom: "Hybrid", icon: BatteryCharging }
];

export const interiorBullets = [
  "Driver-focused cockpit with clean horizontal architecture",
  "Quiet cabin tuning for calm family travel",
  "Flexible storage and seating for weekdays or weekends",
  "Premium touchpoints with refined ambient lighting"
];
