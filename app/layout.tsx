import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const SITE_URL = "https://ramabhattarai.com.np";
const SITE_NAME = "Rama Bhattarai — Full Stack Developer";
const SITE_DESCRIPTION =
  "Portfolio of Rama Bhattarai, a full stack developer building end-to-end web apps with React, TypeScript, Next.js and Node.js, backed by expressive, performant motion (GSAP, Framer Motion).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — Rama Bhattarai`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Rama Bhattarai",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Frontend Engineer",
    "Web Developer Nepal",
    "GSAP",
    "Framer Motion",
  ],
  authors: [{ name: "Rama Bhattarai", url: SITE_URL }],
  creator: "Rama Bhattarai",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rama Bhattarai",
  url: SITE_URL,
  jobTitle: "Full Stack Developer",
  email: "mailto:bhattarairama234@gmail.com",
  sameAs: ["https://github.com/ramaBhattarai", "https://www.linkedin.com/in/ramabhattarai/"],
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "GSAP", "Framer Motion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
