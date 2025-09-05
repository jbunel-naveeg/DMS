import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lato } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato'
});

export const metadata: Metadata = {
  title: "Naveeg Dashboard",
  description: "AI website generation and management for SMEs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sansation:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${lato.variable} font-lato antialiased`}>
        <nav className="border-b bg-surface">
          <div className="container-custom h-16 flex items-center justify-between">
            <a href="/" className="font-sansation text-xl font-bold text-ink">Naveeg</a>
            <div className="flex items-center gap-6 text-sm">
              <a href="/pricing" className="text-muted hover:text-ink transition-colors">Pricing</a>
              <a href="/login" className="text-muted hover:text-ink transition-colors">Login</a>
              <a href="/onboarding" className="btn-primary">Get started</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
