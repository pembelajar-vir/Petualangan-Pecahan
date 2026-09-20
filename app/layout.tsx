import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Petualangan Pecahan Kelas 6 - Mengubah Bentuk Pecahan',
  description: 'Media pembelajaran interaktif matematika kelas 6 SD untuk mengidentifikasi dan merubah berbagai bentuk pecahan dengan 100 soal leveling, gamifikasi, dan audio Web Audio API.',
  openGraph: {
    title: 'Petualangan Pecahan Kelas 6 - Mengubah Bentuk Pecahan',
    description: 'Media pembelajaran interaktif matematika kelas 6 SD untuk mengidentifikasi dan merubah berbagai bentuk pecahan.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petualangan Pecahan Kelas 6',
    description: 'Media pembelajaran interaktif matematika kelas 6 SD.',
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
