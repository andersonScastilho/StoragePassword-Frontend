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
    sameSite: "strict",
    secure: true,
  });
}

export async function findCookie(key: string) {
  const cookie = cookies().get(key);
  if (!cookie) {
    return;
  }

  const parsedCookie = await JSON.parse(cookie.value);

  return parsedCookie;
}

export async function deleteCookie(key: string) {
  cookies().delete(key);
}
