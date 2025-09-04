import type { Metadata } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Naveeg",
  description: "AI website generation for SMEs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="border-b">
          <div className="container mx-auto px-6 h-12 flex items-center justify-between">
            <a href="/" className="font-semibold">Naveeg</a>
            <div className="flex items-center gap-4 text-sm">
              <a href="/pricing">Pricing</a>
              <a href="/login">Login</a>
              <a href="/onboarding" className="rounded bg-primary px-3 py-1.5 text-white">Get started</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
