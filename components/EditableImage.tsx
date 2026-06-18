"use client";

import Image from "next/image";

type EditableImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function EditableImage({ src, alt, className, priority, sizes = "100vw" }: EditableImageProps) {
  const isLocalAsset = src.startsWith("/");

  if (!isLocalAsset) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} loading={priority ? "eager" : "lazy"} />;
  }

  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />;
}
