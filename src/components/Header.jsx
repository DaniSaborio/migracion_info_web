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
      {/* Barra de conectividad y privacidad */}
      <div className={`px-4 py-1 text-xs font-semibold flex items-center justify-between ${isOnline ? 'bg-sky-900/60 text-sky-100' : 'bg-amber-600 text-white animate-pulse'}`}>
        <div className="flex items-center gap-1.5">
          {isOnline ? <FaWifi className="w-3.5 h-3.5" /> : <MdWifiOff className="w-3.5 h-3.5" />}
          <span>{isOnline ? 'Conectado a Internet' : 'Modo Offline: Funciona sin conexión'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] opacity-90">
          <FaShieldHalved className="w-3.5 h-3.5 text-emerald-300" />
          <span>Privacidad Local-First</span>
        </div>
      </div>

      {/* Contenido principal del Header */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Link href="/" className="hover:opacity-95 transition-opacity">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Portal Información Migrante
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 font-medium mt-0.5">
              Región Huetar Norte · Guías oficiales, requisitos y contactos sin intermediarios
            </p>
          </Link>
        </div>

        {/* Botones de accesibilidad */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={toggleFont}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border flex items-center gap-1.5 transition-colors ${fontLarge ? 'bg-white text-brand-800 border-white' : 'bg-brand-800/50 hover:bg-brand-800 text-white border-sky-400/40'}`}
            title="Ajustar tamaño de letra"
            aria-label="Ajustar tamaño de letra"
          >
            <FaFont className="w-3.5 h-3.5" />
            <span>{fontLarge ? 'Texto Normal' : 'Texto Grande'}</span>
          </button>
          <button
            onClick={toggleContrast}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border flex items-center gap-1.5 transition-colors ${highContrast ? 'bg-amber-400 text-slate-900 border-amber-300 font-bold' : 'bg-brand-800/50 hover:bg-brand-800 text-white border-sky-400/40'}`}
            title="Alternar alto contraste"
            aria-label="Alternar alto contraste"
          >
            <FaEye className="w-3.5 h-3.5" />
            <span>{highContrast ? 'Contraste Normal' : 'Alto Contraste'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
