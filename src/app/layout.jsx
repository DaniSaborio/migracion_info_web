import './globals.css';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'Portal Informativo para Personas Migrantes — Región Huetar Norte',
  description: 'Información oficial de trámites migratorios, requisitos, directorios locales y emergencias para San Carlos, Venecia, Upala y Los Chiles. 100% gratuito y desconectado.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192.svg',
    apple: '/icons/icon-192.svg',
  }
};

export const viewport = {
  themeColor: '#0284C7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-5 min-h-[calc(100vh-12rem)]">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
