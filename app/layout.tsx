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
  title: 'Study Arcade · Securitization Fundamentals',
  description: 'Learn core securitization concepts through a connected 30-day journey using auto loans as a practical case study.',
  openGraph: {
    title: 'Study Arcade · Securitization Fundamentals',
    description: 'Learn core concepts through an auto-loan case study.',
    images: [{ url: '/og.png', width: 1536, height: 864 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Arcade · Securitization Fundamentals',
    description: 'Learn core concepts through an auto-loan case study.',
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
