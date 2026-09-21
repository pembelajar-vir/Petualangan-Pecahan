import type {Metadata, Viewport} from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1d4ed8',
};

export const metadata: Metadata = {
  title: 'Petualangan Pecahan Kelas 6 - Mengubah Bentuk Pecahan',
  description: 'Media pembelajaran interaktif matematika kelas 6 SD untuk mengidentifikasi dan merubah berbagai bentuk pecahan dengan 100 soal leveling, mode duel tanding teman/bot, adaptasi multi-device, gamifikasi, dan audio Web Audio API.',
  openGraph: {
    title: 'Petualangan Pecahan Kelas 6 - Mengubah Bentuk Pecahan',
    description: 'Media pembelajaran interaktif matematika kelas 6 SD untuk mengidentifikasi dan merubah berbagai bentuk pecahan dengan 100 soal leveling, mode duel tanding teman/bot, dan adaptasi multi-device.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petualangan Pecahan Kelas 6',
    description: 'Media pembelajaran interaktif matematika kelas 6 SD dengan mode petualangan, duel teman/bot, dan 100 soal tantangan.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Fredoka:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-amber-200 selection:text-amber-900 bg-slate-50 text-slate-800" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
