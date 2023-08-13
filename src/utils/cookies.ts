"use server";
import { cookies } from "next/headers";

export async function saveCookie(key: string, value: unknown, expires: number) {
  cookies().set(key, JSON.stringify(value), {
    expires: expires,
    httpOnly: true,
    path: "/",
  });
}
export async function findCookie(key: string) {
  const cookie = cookies().get(key);

  return cookie;
}
