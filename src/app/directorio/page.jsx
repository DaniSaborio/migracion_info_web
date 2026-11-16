'use client';

import { useState } from 'react';
import {
  FaBuilding,
  FaLocationDot,
  FaPhone,
  FaClock,
  FaFileLines,
  FaEnvelope,
  FaCircleExclamation,
  FaMagnifyingGlass,
  FaMapLocationDot
} from 'react-icons/fa6';
import directorioData from '@/data/directorio.json';

export default function DirectorioPage() {
  const [cantonFiltro, setCantonFiltro] = useState('Todos');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const cantones = [
    'Todos',
    'San Carlos',
    'Venecia',
    'Pital',
    'Aguas Zarcas',
    'Ciudad Quesada',
    'Río Cuarto',
    'Upala',
    'Los Chiles'
  ];

  const categorias = ['Todos', 'Migración', 'Trámites', 'Salud', 'Organización', 'Seguridad'];

  const filtrados = directorioData.filter((sede) => {
    const matchCanton =
      cantonFiltro === 'Todos' ||
      sede.canton === cantonFiltro ||
      sede.distrito === cantonFiltro;
    const matchCat =
      categoriaFiltro === 'Todos' || sede.categoria === categoriaFiltro;
    const q = busqueda.trim().toLowerCase();
    const matchQuery =
      !q ||
      sede.nombre.toLowerCase().includes(q) ||
      sede.tramites.toLowerCase().includes(q) ||
      sede.direccion.toLowerCase().includes(q) ||
      (sede.distrito && sede.distrito.toLowerCase().includes(q)) ||
      sede.canton.toLowerCase().includes(q);
    return matchCanton && matchCat && matchQuery;
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
          Horarios de atención presencial, teléfonos de llamada directa, correos oficiales y ubicación en Venecia, Pital, Aguas Zarcas, Ciudad Quesada, Upala y Los Chiles.
        </p>
      </div>

      {/* Buscador y Filtros */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="relative">
          <FaMagnifyingGlass className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar sede, trámite o localidad (ej. BCR Pital, DGME, EBAIS Venecia, ACNUR)..."
            aria-label="Buscar institución en el directorio"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Pestañas de filtro por cantón / distrito */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {cantones.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setCantonFiltro(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                cantonFiltro === c
                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {c === 'Todos' ? 'Cantón: Todos' : c}
            </button>
          ))}
        </div>

        {/* Filtro secundario por tipo de trámite */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categorias.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setCategoriaFiltro(cat)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border ${
                categoriaFiltro === cat
                  ? 'bg-slate-900 dark:bg-sky-500 text-white border-slate-900 dark:border-sky-500'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
              }`}
            >
              {cat === 'Todos' ? 'Trámite: Todos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tarjetas de sedes (P6, P7, P8) */}
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
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {sede.categoria}
              </span>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-start gap-2">
                <FaLocationDot className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Dirección exacta:</strong> {sede.direccion}{' '}
                  {sede.mapa_url && (
                    <a
                      href={sede.mapa_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 ml-1 transition-colors"
                    >
                      <FaMapLocationDot className="w-3 h-3" />
                      <span>Ver mapa oficial</span>
                    </a>
                  )}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <FaClock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Horario:</strong> {sede.horario}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <FaFileLines className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Trámites:</strong> {sede.tramites}
                </span>
              </p>
              {sede.correo && (
                <p className="flex items-start gap-2">
                  <FaEnvelope className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Correo oficial:</strong> {sede.correo}
                  </span>
                </p>
              )}
              {sede.requisito_previo && (
                <p className="flex items-start gap-2 text-amber-800 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200/70 dark:border-amber-900/40">
                  <FaCircleExclamation className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Requisito:</strong> {sede.requisito_previo}
                  </span>
                </p>
              )}
            </div>

            {/* Botones de acción P6 y P7 */}
            <div className="grid sm:grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`tel:${sede.telefono.replace(/-/g, '')}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <FaPhone className="w-3.5 h-3.5" />
                <span>Llamar ({sede.telefono})</span>
              </a>
              {sede.mapa_url && (
                <a
                  href={sede.mapa_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                >
                  <FaMapLocationDot className="w-3.5 h-3.5" />
                  <span>Ver ubicación en el mapa</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
