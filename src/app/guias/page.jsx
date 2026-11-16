'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaBookOpen,
  FaMagnifyingGlass,
  FaArrowRight,
  FaCoins,
  FaLocationDot,
  FaCircleCheck
} from 'react-icons/fa6';
import guiasData from '@/data/guias_tramites.json';

export default function GuiasPage() {
  const [busqueda, setBusqueda] = useState('');

  const filtradas = guiasData.filter(g => {
    const q = busqueda.toLowerCase();
    return g.titulo.toLowerCase().includes(q) ||
           g.descripcion.toLowerCase().includes(q) ||
           g.lugar.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-2 text-brand-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
          <FaBookOpen className="w-4 h-4 shrink-0" />
          <span>Información de Trámites Oficiales</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
          Catálogo Completo de Guías Paso a Paso
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Cada guía detalla los costos oficiales, cuenta del Banco de Costa Rica, lugar de gestión y lista de chequeo interactiva.
        </p>
      </div>

      {/* Buscador */}
      <div className="relative">
        <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por trámite (ej. refugio, BCR, CCSS)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
        />
      </div>

      {/* Listado de Guías */}
      <div className="space-y-4">
        {filtradas.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500">No se encontraron guías que coincidan con &quot;{busqueda}&quot;.</p>
          </div>
        ) : (
          filtradas.map((guia) => (
            <div
              key={guia.id}
              className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow duration-200 space-y-3 sm:space-y-4 overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-bold text-brand-700 dark:text-sky-300 bg-brand-50 dark:bg-sky-950/70 px-2 sm:px-2.5 py-0.5 rounded-full border border-brand-200 dark:border-sky-900 shrink-0">
                    Trámite Oficial
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 shrink-0">
                    <FaCoins className="w-3.5 h-3.5 shrink-0" />
                    {guia.aranceles.usd > 0
                      ? `US$${guia.aranceles.usd} (~₡${guia.aranceles.crc.toLocaleString()})`
                      : 'Trámite Gratuito'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug break-words">
                  {guia.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {guia.descripcion}
                </p>
              </div>

              {/* Datos rápidos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 min-w-0">
                <div className="flex items-start gap-2 min-w-0">
                  <FaLocationDot className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-snug break-words"><strong>Lugar:</strong> {guia.lugar}</span>
                </div>
                <div className="flex items-start gap-2 min-w-0">
                  <FaCircleCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-snug"><strong>Requisitos:</strong> {guia.requisitos.length} documentos obligatorios</span>
                </div>
              </div>

              {/* Botón de acción */}
              <div className="pt-1">
                <Link
                  href={`/guias/${guia.id}/`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm text-center"
                >
                  <span>Abrir Guía y Marcar Requisitos</span>
                  <FaArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
