import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "E² Core Framework";
const description = "A public, mobile-friendly reader for the E² Semantic Substrate, paired with raw ORMD for AI systems.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost";
  const origin = `${protocol}://${host}`;
  const image = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: { default: title, template: `%s · ${title}` },
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    robots: { index: true, follow: true },
    openGraph: { title, description, type: "website", images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
