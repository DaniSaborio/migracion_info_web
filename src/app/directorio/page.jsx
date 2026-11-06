'use client';

import { useState } from 'react';
import {
  FaBuilding,
  FaLocationDot,
  FaPhone,
  FaClock,
  FaFileLines,
  FaArrowUpRightFromSquare
} from 'react-icons/fa6';
import directorioData from '@/data/directorio.json';

export default function DirectorioPage() {
  const [cantonFiltro, setCantonFiltro] = useState('Todos');

  const cantones = ['Todos', 'San Carlos', 'Venecia', 'Aguas Zarcas', 'Ciudad Quesada', 'Upala', 'Los Chiles'];

  const filtrados = directorioData.filter(sede => {
    if (cantonFiltro === 'Todos') return true;
    return sede.canton === cantonFiltro || sede.distrito === cantonFiltro;
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-2 text-brand-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
          <FaBuilding className="w-4 h-4" />
          <span>Sedes Confirmadas y Puntos de Apoyo</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Directorio Regional Huetar Norte
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          Horarios de atención presencial, teléfonos de llamada directa y direcciones exactas en Venecia, San Carlos, Upala y Los Chiles.
        </p>
      </div>

      {/* Pestañas de filtro por cantón */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {cantones.map((c) => (
          <button
            key={c}
            onClick={() => setCantonFiltro(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              cantonFiltro === c
                ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Tarjetas de sedes */}
      <div className="grid gap-4">
        {filtrados.map((sede) => (
          <div
            key={sede.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="text-[11px] font-bold text-brand-700 dark:text-sky-300 bg-brand-50 dark:bg-sky-950 px-2.5 py-0.5 rounded-full border border-brand-200 dark:border-sky-900">
                  {sede.distrito ? `${sede.distrito}, ${sede.canton}` : sede.canton}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {sede.nombre}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {sede.categoria}
              </span>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-start gap-2">
                <FaLocationDot className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span><strong>Dirección:</strong> {sede.direccion}</span>
              </p>
              <p className="flex items-start gap-2">
                <FaClock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span><strong>Horario:</strong> {sede.horario}</span>
              </p>
              <p className="flex items-start gap-2">
                <FaFileLines className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span><strong>Trámites:</strong> {sede.tramites}</span>
              </p>
            </div>

            {/* Botones de acción */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`tel:${sede.telefono.replace(/-/g, '')}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <FaPhone className="w-3.5 h-3.5" />
                <span>Llamar ({sede.telefono})</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${sede.coordenadas.lat},${sede.coordenadas.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
              >
                <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
                <span>Ver en Mapa</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
