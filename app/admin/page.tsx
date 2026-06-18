"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { ArrowLeft, Eye, ImagePlus, LogOut, RotateCcw, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  defaultContent,
  editableContentStorageKey,
  iconMap,
  mergeContent,
  type EditableContent,
  type EditableFeature,
  type EditableUnit
} from "@/lib/siteContent";

type SectionKey = "hero" | "showcase" | "features" | "pricing" | "interior" | "cta" | "gallery";

const tabs: { key: SectionKey; label: string }[] = [
  { key: "hero", label: "Halaman Depan" },
  { key: "showcase", label: "Showcase" },
  { key: "features", label: "Fitur" },
  { key: "pricing", label: "Unit & Harga" },
  { key: "interior", label: "Interior" },
  { key: "gallery", label: "Gallery" },
  { key: "cta", label: "Kontak" }
];

const iconOptions = Object.keys(iconMap) as EditableFeature["icon"][];

function AdminField({
  label,
  value,
  onChange,
  multiline = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/56">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
          className="min-h-32 rounded-[8px] border border-white/12 bg-white/8 px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-[#c9a75d]/70"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 rounded-[8px] border border-white/12 bg-white/8 px-4 text-sm text-white outline-none transition focus:border-[#c9a75d]/70"
        />
      )}
    </label>
  );
}

function compressImage(file: File, maxWidth = 1600, quality = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Gagal membaca gambar."));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas tidak didukung."));
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Gagal memproses gambar."))),
          "image/jpeg",
          quality
        );
      };
      img.src = typeof reader.result === "string" ? reader.result : "";
    };
    reader.readAsDataURL(file);
  });
}

function ImagePicker({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const isUploadedImage = value.startsWith("data:") || value.includes(".blob.vercel-storage.com/");

  const readFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("file", compressed, `${file.name.replace(/\.[^.]+$/, "") || "image"}.jpg`);

      const response = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const result = (await response.json()) as { url?: string; message?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.message || "Upload gambar gagal.");
      }

      onChange(result.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload gambar gagal.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="grid gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/56">{label}</span>
      <div className="grid gap-4 rounded-[8px] border border-white/12 bg-white/6 p-4 sm:grid-cols-[220px_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] border border-white/10 bg-black/40">
          {value ? <img src={value} alt={label} className="h-full w-full object-cover" /> : null}
        </div>
        <div className="grid content-center gap-3">
          {isUploadedImage ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-12 flex-1 items-center rounded-[8px] border border-white/12 bg-black/20 px-4 text-sm text-white/70">
                Gambar upload dari browser
              </span>
              <button
                type="button"
                onClick={() => onChange("")}
                className="h-12 rounded-full border border-white/18 bg-white/10 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/16"
              >
                Ganti ke Link/Path
              </button>
            </div>
          ) : (
            <input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="/nama-file.webp atau https://..."
              className="h-12 rounded-[8px] border border-white/12 bg-black/20 px-4 text-sm text-white outline-none transition focus:border-[#c9a75d]/70"
            />
          )}
          <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/16 sm:w-fit">
            <ImagePlus className="h-4 w-4" />
            {isUploading ? "Mengunggah..." : "Upload Gambar"}
            <input type="file" accept="image/*" onChange={readFile} disabled={isUploading} className="hidden" />
          </label>
          {uploadError ? <p className="text-xs leading-5 text-red-300">{uploadError}</p> : null}
          <p className="text-xs leading-5 text-white/46">
            Bisa upload gambar dari komputer atau isi path seperti <span className="text-white/70">/nama-file.webp</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [content, setContent] = useState<EditableContent>(defaultContent);
  const [activeTab, setActiveTab] = useState<SectionKey>("hero");
  const [status, setStatus] = useState("Memuat konten tersimpan...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then(async (response) => {
        const result = (await response.json()) as {
          content?: Partial<EditableContent>;
          source?: "stored" | "default";
          message?: string;
        };

        if (!response.ok) {
          throw new Error(result.message || "Konten tidak dapat dimuat.");
        }

        const legacy = window.localStorage.getItem(editableContentStorageKey);
        if (result.source === "default" && legacy) {
          setContent(mergeContent(JSON.parse(legacy)));
          setStatus("Data lama dari browser ditemukan. Klik Simpan untuk menyinkronkannya ke server.");
          return;
        }

        setContent(mergeContent(result.content ?? null));
        setStatus("Konten server berhasil dimuat.");
      })
      .catch((error) => {
        setContent(defaultContent);
        setStatus(error instanceof Error ? error.message : "Konten tidak dapat dimuat.");
      });
  }, []);

  const saveContent = async () => {
    setIsSaving(true);
    setStatus("Menyimpan perubahan...");

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      const result = (await response.json()) as { content?: EditableContent; message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan konten.");
      }

      if (result.content) {
        setContent(result.content);
      }
      window.localStorage.removeItem(editableContentStorageKey);
      setStatus("Perubahan tersimpan di server dan sudah sinkron untuk semua pengunjung.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal menyimpan konten.");
    } finally {
      setIsSaving(false);
    }
  };

  const resetContent = async () => {
    setIsSaving(true);
    setStatus("Mengembalikan konten...");

    try {
      const response = await fetch("/api/content", { method: "DELETE" });
      const result = (await response.json()) as { content?: EditableContent; message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Gagal mereset konten.");
      }

      window.localStorage.removeItem(editableContentStorageKey);
      setContent(result.content ?? defaultContent);
      setStatus("Konten server dikembalikan ke default.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Gagal mereset konten.");
    } finally {
      setIsSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const updateFeature = (index: number, patch: Partial<EditableFeature>) => {
    setContent((current) => ({
      ...current,
      features: {
        ...current.features,
        cards: current.features.cards.map((feature, featureIndex) =>
          featureIndex === index ? { ...feature, ...patch } : feature
        )
      }
    }));
  };

  const updateUnit = (index: number, patch: Partial<EditableUnit>) => {
    setContent((current) => ({
      ...current,
      pricing: {
        ...current.pricing,
        units: current.pricing.units.map((unit, unitIndex) => (unitIndex === index ? { ...unit, ...patch } : unit))
      }
    }));
  };

  const addUnit = () => {
    setContent((current) => ({
      ...current,
      pricing: {
        ...current.pricing,
        units: [
          ...current.pricing.units,
          {
            name: "JAECOO J5",
            price: "Hubungi Sales",
            description: "Tambahkan deskripsi unit di sini.",
            highlights: ["Premium SUV", "Comfort Cabin", "Modern Technology"]
          }
        ]
      }
    }));
  };

  const removeUnit = (index: number) => {
    setContent((current) => ({
      ...current,
      pricing: {
        ...current.pricing,
        units: current.pricing.units.filter((_, unitIndex) => unitIndex !== index)
      }
    }));
  };

  const updateGalleryImage = (index: number, value: string) => {
    setContent((current) => ({
      ...current,
      gallery: current.gallery.map((image, imageIndex) => (imageIndex === index ? value : image))
    }));
  };

  const addGalleryImage = () => {
    setContent((current) => ({
      ...current,
      gallery: [...current.gallery, "/J5_1_2e7da5b171.jpegw3840q75.webp"]
    }));
  };

  const removeGalleryImage = (index: number) => {
    setContent((current) => ({
      ...current,
      gallery: current.gallery.filter((_, imageIndex) => imageIndex !== index)
    }));
  };

  return (
    <main className="min-h-screen bg-[#050505] py-8 text-white">
      <div className="container-lux">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm text-white/62 transition hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Website
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#c9a75d]">ASCO JAECOO Admin</p>
            <h1 className="font-display mt-3 text-5xl font-semibold leading-none">Edit Konten Website</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Link>
            <button
              type="button"
              onClick={resetContent}
              disabled={isSaving}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={saveContent}
              disabled={isSaving}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-950"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Memproses..." : "Simpan"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-red-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="glass h-fit rounded-[8px] p-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`block w-full rounded-[8px] px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === tab.key ? "bg-white text-neutral-950" : "text-white/68 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          <section className="glass rounded-[8px] p-5 sm:p-7">
            <div className="mb-6 rounded-[8px] border border-[#c9a75d]/24 bg-[#c9a75d]/10 px-4 py-3 text-sm text-white/72">
              {status}
            </div>

            {activeTab === "hero" ? (
              <div className="grid gap-5">
                <ImagePicker
                  label="Gambar Halaman Depan"
                  value={content.hero.image}
                  onChange={(image) => setContent({ ...content, hero: { ...content.hero, image } })}
                />
                <AdminField
                  label="Teks Kecil"
                  value={content.hero.eyebrow}
                  onChange={(eyebrow) => setContent({ ...content, hero: { ...content.hero, eyebrow } })}
                />
                <AdminField
                  label="Headline Besar"
                  value={content.hero.headline}
                  onChange={(headline) => setContent({ ...content, hero: { ...content.hero, headline } })}
                />
                <AdminField
                  label="Subheadline"
                  value={content.hero.subheadline}
                  onChange={(subheadline) => setContent({ ...content, hero: { ...content.hero, subheadline } })}
                  multiline
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <AdminField
                    label="Tombol Pertama"
                    value={content.hero.primaryButton}
                    onChange={(primaryButton) => setContent({ ...content, hero: { ...content.hero, primaryButton } })}
                  />
                  <AdminField
                    label="Tombol Kedua"
                    value={content.hero.secondaryButton}
                    onChange={(secondaryButton) => setContent({ ...content, hero: { ...content.hero, secondaryButton } })}
                  />
                </div>
              </div>
            ) : null}

            {activeTab === "showcase" ? (
              <div className="grid gap-5">
                <ImagePicker
                  label="Gambar Showcase"
                  value={content.showcase.image}
                  onChange={(image) => setContent({ ...content, showcase: { ...content.showcase, image } })}
                />
                <AdminField
                  label="Teks Kecil"
                  value={content.showcase.eyebrow}
                  onChange={(eyebrow) => setContent({ ...content, showcase: { ...content.showcase, eyebrow } })}
                />
                <AdminField
                  label="Headline"
                  value={content.showcase.headline}
                  onChange={(headline) => setContent({ ...content, showcase: { ...content.showcase, headline } })}
                />
                <AdminField
                  label="Deskripsi"
                  value={content.showcase.body}
                  onChange={(body) => setContent({ ...content, showcase: { ...content.showcase, body } })}
                  multiline
                />
                <AdminField
                  label="3 Poin Kecil, pisahkan dengan koma"
                  value={content.showcase.pillars.join(", ")}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      showcase: {
                        ...content.showcase,
                        pillars: value.split(",").map((item) => item.trim()).filter(Boolean)
                      }
                    })
                  }
                />
              </div>
            ) : null}

            {activeTab === "features" ? (
              <div className="grid gap-5">
                <AdminField
                  label="Teks Kecil"
                  value={content.features.eyebrow}
                  onChange={(eyebrow) => setContent({ ...content, features: { ...content.features, eyebrow } })}
                />
                <AdminField
                  label="Headline"
                  value={content.features.headline}
                  onChange={(headline) => setContent({ ...content, features: { ...content.features, headline } })}
                />
                <AdminField
                  label="Deskripsi"
                  value={content.features.body}
                  onChange={(body) => setContent({ ...content, features: { ...content.features, body } })}
                  multiline
                />
                <div className="grid gap-4">
                  {content.features.cards.map((feature, index) => (
                    <div key={index} className="grid gap-4 rounded-[8px] border border-white/10 bg-white/6 p-4">
                      <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                        <AdminField label={`Judul Fitur ${index + 1}`} value={feature.title} onChange={(title) => updateFeature(index, { title })} />
                        <label className="grid gap-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/56">Icon</span>
                          <select
                            value={feature.icon}
                            onChange={(event) => updateFeature(index, { icon: event.target.value as EditableFeature["icon"] })}
                            className="h-12 rounded-[8px] border border-white/12 bg-neutral-950 px-4 text-sm text-white outline-none"
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <AdminField
                        label="Deskripsi Fitur"
                        value={feature.description}
                        onChange={(description) => updateFeature(index, { description })}
                        multiline
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === "pricing" ? (
              <div className="grid gap-5">
                <AdminField
                  label="Teks Kecil"
                  value={content.pricing.eyebrow}
                  onChange={(eyebrow) => setContent({ ...content, pricing: { ...content.pricing, eyebrow } })}
                />
                <AdminField
                  label="Headline"
                  value={content.pricing.headline}
                  onChange={(headline) => setContent({ ...content, pricing: { ...content.pricing, headline } })}
                />
                <AdminField
                  label="Deskripsi"
                  value={content.pricing.body}
                  onChange={(body) => setContent({ ...content, pricing: { ...content.pricing, body } })}
                  multiline
                />
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Daftar Unit</h2>
                    <p className="mt-1 text-sm text-white/52">Edit nama unit, harga, dan highlight.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addUnit}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-950"
                  >
                    Tambah Unit
                  </button>
                </div>
                <div className="grid gap-4">
                  {content.pricing.units.map((unit, index) => (
                    <div key={index} className="grid gap-4 rounded-[8px] border border-white/10 bg-white/6 p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <AdminField label={`Nama Unit ${index + 1}`} value={unit.name} onChange={(name) => updateUnit(index, { name })} />
                        <AdminField label="Harga" value={unit.price} onChange={(price) => updateUnit(index, { price })} />
                      </div>
                      <AdminField
                        label="Deskripsi Unit"
                        value={unit.description}
                        onChange={(description) => updateUnit(index, { description })}
                        multiline
                      />
                      <AdminField
                        label="Highlight, satu baris satu poin"
                        value={unit.highlights.join("\n")}
                        onChange={(value) =>
                          updateUnit(index, {
                            highlights: value.split("\n").map((item) => item.trim()).filter(Boolean)
                          })
                        }
                        multiline
                      />
                      <button
                        type="button"
                        onClick={() => removeUnit(index)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-red-100 sm:w-fit"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus Unit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === "interior" ? (
              <div className="grid gap-5">
                <ImagePicker
                  label="Gambar Interior"
                  value={content.interior.image}
                  onChange={(image) => setContent({ ...content, interior: { ...content.interior, image } })}
                />
                <AdminField
                  label="Teks Kecil"
                  value={content.interior.eyebrow}
                  onChange={(eyebrow) => setContent({ ...content, interior: { ...content.interior, eyebrow } })}
                />
                <AdminField
                  label="Headline"
                  value={content.interior.headline}
                  onChange={(headline) => setContent({ ...content, interior: { ...content.interior, headline } })}
                />
                <AdminField
                  label="Deskripsi"
                  value={content.interior.body}
                  onChange={(body) => setContent({ ...content, interior: { ...content.interior, body } })}
                  multiline
                />
                <AdminField
                  label="Bullet, satu baris satu poin"
                  value={content.interior.bullets.join("\n")}
                  onChange={(value) =>
                    setContent({
                      ...content,
                      interior: {
                        ...content.interior,
                        bullets: value.split("\n").map((item) => item.trim()).filter(Boolean)
                      }
                    })
                  }
                  multiline
                />
              </div>
            ) : null}

            {activeTab === "gallery" ? (
              <div className="grid gap-5">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Gambar Gallery</h2>
                    <p className="mt-1 text-sm text-white/52">Tambah, upload, atau hapus gambar gallery.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-950"
                  >
                    <ImagePlus className="h-4 w-4" />
                    Tambah
                  </button>
                </div>
                {content.gallery.map((image, index) => (
                  <div key={index} className="grid gap-3 rounded-[8px] border border-white/10 bg-white/6 p-4">
                    <ImagePicker label={`Gambar ${index + 1}`} value={image} onChange={(value) => updateGalleryImage(index, value)} />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-red-100 sm:w-fit"
                    >
                      <Trash2 className="h-4 w-4" />
                      Hapus Gambar
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            {activeTab === "cta" ? (
              <div className="grid gap-5">
                <AdminField
                  label="Teks Kecil"
                  value={content.cta.eyebrow}
                  onChange={(eyebrow) => setContent({ ...content, cta: { ...content.cta, eyebrow } })}
                />
                <AdminField
                  label="Headline"
                  value={content.cta.headline}
                  onChange={(headline) => setContent({ ...content, cta: { ...content.cta, headline } })}
                />
                <AdminField
                  label="Deskripsi"
                  value={content.cta.body}
                  onChange={(body) => setContent({ ...content, cta: { ...content.cta, body } })}
                  multiline
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <AdminField
                    label="Teks Tombol"
                    value={content.cta.button}
                    onChange={(button) => setContent({ ...content, cta: { ...content.cta, button } })}
                  />
                  <AdminField
                    label="Link WhatsApp"
                    value={content.cta.whatsapp}
                    onChange={(whatsapp) => setContent({ ...content, cta: { ...content.cta, whatsapp } })}
                  />
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
