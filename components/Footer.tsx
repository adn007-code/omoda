import { Facebook, Instagram, Linkedin, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-lux flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white">OMODA-JAECOO</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/56">
            Informasi dealer resmi dan dukungan test drive premium untuk JAECOO J5.
          </p>
          <div className="mt-5 grid gap-2 text-sm text-white/64">
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#c9a75d]" aria-hidden="true" />
              OMODA-JAECOO Indonesia
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#c9a75d]" aria-hidden="true" />
              +62 895 8560 157
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {[Instagram, Facebook, Linkedin].map((Icon, index) => (
            <a
              key={index}
              href="#home"
              aria-label="Media sosial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 text-white/72 transition hover:border-white/35 hover:text-white"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <div className="container-lux mt-10 border-t border-white/10 pt-6 text-sm text-white/44">
        Hak Cipta © 2026 OMODA-JAECOO. Seluruh hak dilindungi.
      </div>
    </footer>
  );
}
