export const adminSessionCookie = "asco_admin_session";
export const adminSessionValue = process.env.ADMIN_SESSION_SECRET || "asco-jaecoo-admin-v1";

export const adminCredentials = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123"
};
