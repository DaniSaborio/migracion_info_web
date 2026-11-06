'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCompass, FaBookOpen, FaListCheck, FaBuilding, FaPhoneVolume } from 'react-icons/fa6';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Orientador', href: '/', icon: FaCompass, match: (p) => p === '/' },
    { label: 'Guías', href: '/guias/', icon: FaBookOpen, match: (p) => p.startsWith('/guias') },
    { label: 'Requisitos', href: '/requisitos/', icon: FaListCheck, match: (p) => p.startsWith('/requisitos') },
    { label: 'Directorio', href: '/directorio/', icon: FaBuilding, match: (p) => p.startsWith('/directorio') },
    { label: 'Emergencias', href: '/emergencias/', icon: FaPhoneVolume, match: (p) => p.startsWith('/emergencias') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg sm:max-w-lg sm:mx-auto sm:rounded-t-2xl sm:bottom-0">
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'text-brand-600 dark:text-sky-400 scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-sky-100 dark:bg-sky-950/60' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
