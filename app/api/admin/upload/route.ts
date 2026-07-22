import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/adminSession";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Sesi admin tidak valid." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json({ message: "File gambar tidak valid." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    if (process.env.VERCEL) {
      return NextResponse.json(
        { message: "Vercel Blob belum terhubung. Tambahkan Blob Store pada project Vercel." },
        { status: 503 }
      );
    }

    const data = Buffer.from(await file.arrayBuffer()).toString("base64");
    return NextResponse.json({ url: `data:${file.type};base64,${data}` });
  }

  const extension = file.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
  const blob = await put(`cms/images/${crypto.randomUUID()}.${extension}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
    cacheControlMaxAge: 60 * 60 * 24 * 365
  });

  return NextResponse.json({ url: blob.url });
}
