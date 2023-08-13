"use server";
import { cookies } from "next/headers";

export async function saveCookie(key: string, value: unknown, maxAge: number) {
  const stringValue = JSON.stringify(value);
  cookies().set({
    name: key,
    value: stringValue,
    maxAge: maxAge,
    httpOnly: true,
    path: "/",
  });
}
export async function findCookie(key: string) {
  const cookie = cookies().get(key);
  return cookie;
}
