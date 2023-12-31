"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/functions/check-is-publick-route";
import { AuthenticationGuard } from "@/guard/authentication.guard";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const isPublicPage = checkIsPublicRoute(pathName);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {isPublicPage ? (
            children
          ) : (
            <AuthenticationGuard>{children}</AuthenticationGuard>
          )}
        </Providers>
      </body>
    </html>
  );
}
