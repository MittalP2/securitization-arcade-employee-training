import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Securitization Arcade',
  description: 'From loans to bonds in 30 days — an interactive Auto ABS learning journey.',
  openGraph: {
    title: 'Securitization Arcade',
    description: 'From Loans to Bonds in 30 Days',
    images: [{ url: '/og.png', width: 1536, height: 864 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Securitization Arcade',
    description: 'From Loans to Bonds in 30 Days',
    images: ['/og.png'],
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
