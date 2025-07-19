import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Padel Tournament 3.0",
  description: "Follow the matches, teams, and standings of the Padel Tournament!",
  openGraph: {
    title: "Padel Tournament 3.0",
    description: "Follow the matches, teams, and standings of the Padel Tournament!",
    url: "https://yourdomain.com/",
    type: "website",
    images: [
      {
        url: "/favicon.ico",
        width: 64,
        height: 64,
        alt: "Padel Tournament Logo"
      }
    ]
  }
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
        {/* Mobile-first two-row navbar */}
        <nav className="w-full">
          {/* Top row: Home, Teams, Standings */}
          <div className="flex w-full justify-center gap-2 bg-[#0f7b7b] py-2 rounded-t-xl shadow-md">
            <Link href="/" className="flex-1 text-center font-bold text-white px-3 py-2 rounded-lg hover:bg-[#159f9f] transition-colors">Home</Link>
            <Link href="/teams" className="flex-1 text-center font-bold text-white px-3 py-2 rounded-lg hover:bg-[#159f9f] transition-colors">Teams</Link>
            <Link href="/standings" className="flex-1 text-center font-bold text-white px-3 py-2 rounded-lg hover:bg-[#159f9f] transition-colors">Standings</Link>
          </div>
          {/* Second row: Rounds */}
          <div className="flex w-full justify-center gap-2 bg-[#159f9f] py-2 rounded-b-xl shadow-md border-t-2 border-[#0f7b7b]">
            <Link href="/round1" className="flex-1 text-center font-semibold text-white px-2 py-2 rounded-lg hover:bg-[#0f7b7b] transition-colors">Round 1</Link>
            <Link href="/round2" className="flex-1 text-center font-semibold text-white px-2 py-2 rounded-lg hover:bg-[#0f7b7b] transition-colors">Round 2</Link>
            <Link href="/round3" className="flex-1 text-center font-semibold text-white px-2 py-2 rounded-lg hover:bg-[#0f7b7b] transition-colors">Round 3</Link>
            <Link href="/round4" className="flex-1 text-center font-semibold text-white px-2 py-2 rounded-lg hover:bg-[#0f7b7b] transition-colors">Round 4</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
