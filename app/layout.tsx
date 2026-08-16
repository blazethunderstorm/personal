import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anirudh Narang | Software Engineer",
  description:
    "Anirudh Narang — Software Engineer building scalable backend systems and full-stack products. SDE Intern at Docstribe, ex-Rimo LLC. Go, TypeScript, Python, React & Next.js.",
  keywords: [
    "Anirudh Narang",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "Go Developer",
    "React Developer",
  ],
  authors: [{ name: "Anirudh Narang" }],
  openGraph: {
    title: "Anirudh Narang | Software Engineer",
    description:
      "Building scalable backend systems and full-stack products. SDE Intern at Docstribe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
