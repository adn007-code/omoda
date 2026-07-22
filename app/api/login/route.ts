import { NextResponse } from "next/server";
import { adminCredentials, adminSessionCookie, adminSessionValue } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { username?: string; password?: string } | null;

  if (body?.username !== adminCredentials.username || body?.password !== adminCredentials.password) {
    return NextResponse.json({ message: "Username atau password salah." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminSessionCookie, adminSessionValue, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}
