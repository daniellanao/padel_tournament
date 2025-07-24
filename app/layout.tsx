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
        <nav className="w-full fixed top-0 left-0 z-50">
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
            <Link href="/finals" className="flex-1 text-center font-semibold text-white px-2 py-2 rounded-lg hover:bg-[#0f7b7b] transition-colors">Finals</Link>
          </div>
        </nav>
        <div className="pt-[120px] sm:pt-[120px] min-h-[calc(100vh-120px)] flex flex-col">
          {children}
          <footer className="w-full mt-auto bg-[#0f7b7b] text-white text-center py-3 text-sm font-semibold shadow-inner">
            App sponsored by <a href="https://sportchain.itzimi.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#159f9f] transition-colors">Sportchain 2025</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
