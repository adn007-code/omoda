import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/adminSession";
import { readStoredContent, writeStoredContent } from "@/lib/contentStore";
import { defaultContent, type EditableContent } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await readStoredContent();
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store, max-age=0" }
    });
  } catch (error) {
    console.error("Gagal membaca konten:", error);
    return NextResponse.json(
      { content: defaultContent, source: "default", message: "Konten tersimpan tidak dapat dibaca." },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Sesi admin tidak valid." }, { status: 401 });
  }

  try {
    const content = (await request.json()) as EditableContent;
    const saved = await writeStoredContent(content);
    return NextResponse.json({ content: saved, source: "stored" });
  } catch (error) {
    console.error("Gagal menyimpan konten:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Gagal menyimpan konten." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Sesi admin tidak valid." }, { status: 401 });
  }

  try {
    const saved = await writeStoredContent(defaultContent);
    return NextResponse.json({ content: saved, source: "stored" });
  } catch (error) {
    console.error("Gagal mereset konten:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Gagal mereset konten." },
      { status: 500 }
    );
  }
}
