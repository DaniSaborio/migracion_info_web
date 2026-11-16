'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Storage } from '@/lib/storage';
import { FaShieldHalved, FaWifi, FaFont, FaEye } from 'react-icons/fa6';
import { MdWifiOff } from 'react-icons/md';

export default function Header() {
  const [isOnline, setIsOnline] = useState(true);
  const [fontLarge, setFontLarge] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const prefs = Storage.getPreferences();
    if (prefs.fontLarge) {
      setFontLarge(true);
      document.body.classList.add('font-large');
    }
    if (prefs.highContrast) {
      setHighContrast(true);
      document.body.classList.add('high-contrast');
    }

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleFont = () => {
    const next = !fontLarge;
    setFontLarge(next);
    document.body.classList.toggle('font-large', next);
    Storage.setPreferences({ fontLarge: next, highContrast });
  };

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    document.body.classList.toggle('high-contrast', next);
    Storage.setPreferences({ fontLarge, highContrast: next });
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-brand-700 via-brand-600 to-sky-700 text-white shadow-md">
      {/* Barra superior compacta de conectividad y accesibilidad */}
      <div className={`px-4 py-1.5 text-[11px] font-semibold ${isOnline ? 'bg-sky-900/60 text-sky-100' : 'bg-amber-600 text-white'}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            {isOnline ? <FaWifi className="w-3 h-3 text-emerald-300 shrink-0" /> : <MdWifiOff className="w-3.5 h-3.5 shrink-0" />}
            <span className="truncate">Región Huetar Norte <span className="hidden sm:inline">· ADI Venecia</span></span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-sky-200 mr-1">
              <FaShieldHalved className="w-3 h-3 text-emerald-300 shrink-0" />
              <span>100% Gratuito y Confidencial</span>
            </span>
            <button
              onClick={toggleFont}
              className={`px-2 py-0.5 rounded border text-[10px] flex items-center gap-1 transition-colors ${
                fontLarge
                  ? 'bg-white text-brand-800 border-white font-bold'
                  : 'bg-brand-800/60 hover:bg-brand-800 text-white border-sky-400/40'
              }`}
              title="Ajustar tamaño de letra"
              aria-label="Ajustar tamaño de letra"
            >
              <FaFont className="w-2.5 h-2.5 shrink-0" />
              <span>{fontLarge ? 'A-' : 'A+'}</span>
            </button>
            <button
              onClick={toggleContrast}
              className={`px-2 py-0.5 rounded border text-[10px] flex items-center gap-1 transition-colors ${
                highContrast
                  ? 'bg-amber-400 text-slate-900 border-amber-300 font-bold'
                  : 'bg-brand-800/60 hover:bg-brand-800 text-white border-sky-400/40'
              }`}
              title="Alternar alto contraste"
              aria-label="Alternar alto contraste"
            >
              <FaEye className="w-2.5 h-2.5 shrink-0" />
              <span>Contraste</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal del Header */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
            Portal Información Migrante
          </h1>
          <p className="text-xs text-sky-100/90 font-medium">
            Guías oficiales, requisitos y contactos sin intermediarios
          </p>
        </Link>
      </div>
    </header>
  );
}
