import { cookies } from "next/headers";
import { adminSessionCookie, adminSessionValue } from "@/lib/auth";

export async function hasAdminSession() {
  const cookieStore = await cookies();
  return cookieStore.get(adminSessionCookie)?.value === adminSessionValue;
}
