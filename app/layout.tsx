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
  description: 'Explore a complete 32-level securitization learning journey with connected lessons, applied scenarios, flashcards, quizzes, feedback, and presentations.',
  openGraph: {
    title: 'Study Arcade · Securitization Fundamentals',
    description: 'A complete 30-day core journey plus two advanced bonus levels, using auto loans as a practical case study.',
    images: [{ url: '/og.png', width: 1536, height: 864 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Arcade · Securitization Fundamentals',
    description: 'A complete 30-day core journey plus two advanced bonus levels, using auto loans as a practical case study.',
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
