'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Storage } from '@/lib/storage';
import {
  FaArrowLeft,
  FaCircleCheck,
  FaLandmark,
  FaLocationDot,
  FaRotateLeft,
  FaPrint,
  FaTriangleExclamation,
  FaListOl
} from 'react-icons/fa6';

export default function GuiaDetailClient({ guia }) {
  const [marcados, setMarcados] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMarcados(Storage.getGuideChecklist(guia.id));
  }, [guia.id]);

  const handleToggle = (reqId) => {
    const updated = Storage.toggleItem(guia.id, reqId);
    setMarcados([...updated]);
  };

  const handleReset = () => {
    if (confirm('¿Desea desmarcar todos los documentos de esta guía en este dispositivo?')) {
      const reset = Storage.resetGuideChecklist(guia.id);
      setMarcados([...reset]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalReqs = guia.requisitos.length;
  const totalCompletados = marcados.length;
  const porcentaje = totalReqs > 0 ? Math.round((totalCompletados / totalReqs) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Botón Volver */}
      <div className="no-print">
        <Link
          href="/guias/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-600 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 shrink-0" />
          <span>Volver al Catálogo de Guías</span>
        </Link>
      </div>

      {/* Encabezado de la Guía */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
            Trámite Oficial
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {totalCompletados} de {totalReqs} requisitos listos
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight break-words">
          {guia.titulo}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {guia.descripcion}
        </p>
      </section>

      {/* Aranceles y cuenta bancaria */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <FaLandmark className="w-5 h-5 text-brand-600 shrink-0" />
          <span>Aranceles Oficiales y Lugar de Gestión</span>
        </h3>
        
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm space-y-1">
          <p className="font-semibold text-slate-800 dark:text-slate-200 break-words">{guia.aranceles.detalle}</p>
          <p className="text-slate-500 dark:text-slate-400">
            <strong>Costo Estimado:</strong> {guia.aranceles.usd > 0 ? `US$${guia.aranceles.usd} (~₡${guia.aranceles.crc.toLocaleString()})` : 'Completamente Gratuito'}
          </p>
        </div>

        {/* Cuenta BCR */}
        <div className="bg-sky-50/70 dark:bg-sky-950/30 border-l-4 border-brand-600 p-3.5 rounded-r-xl text-xs sm:text-sm text-brand-950 dark:text-sky-200">
          <p className="font-bold">Cuenta Oficial para Depósitos:</p>
          <p className="mt-0.5 break-words font-mono text-xs sm:text-sm">{guia.cuenta_bancaria}</p>
        </div>

        {/* Advertencia de fraude */}
        <div className="bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 p-3.5 rounded-r-xl text-xs sm:text-sm text-rose-950 dark:text-rose-200">
          <div className="flex items-start gap-2">
            <FaTriangleExclamation className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Advertencia contra cobros indebidos:</p>
              <p className="mt-0.5 break-words">{guia.advertencia_fraude}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-1">
          <FaLocationDot className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <span className="break-words"><strong>Dónde se realiza:</strong> {guia.lugar}</span>
        </div>

        <div className="pt-2 no-print">
          <Link
            href="/directorio/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors text-center"
          >
            <FaLocationDot className="w-3.5 h-3.5 shrink-0" />
            <span>Ver sedes de atención en la Región Huetar Norte</span>
          </Link>
        </div>
      </section>

      {/* MÓDULO CHECKLIST INTERACTIVO (Local-First) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border-2 border-brand-200 dark:border-brand-900 shadow-sm space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaCircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Lista de Chequeo de Documentos</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Marque los documentos que ya tiene listos. Se guardan en su teléfono sin enviar datos por internet.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {porcentaje}%
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${porcentaje}%` }}
          />
        </div>

        {/* Lista de casillas */}
        <div className="space-y-2.5 pt-1">
          {guia.requisitos.map((req) => {
            const isChecked = mounted && marcados.includes(req.id);
            return (
              <label
                key={req.id}
                onClick={() => handleToggle(req.id)}
                className={`flex items-start gap-3 p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="w-5 h-5 mt-0.5 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer shrink-0"
                />
                <span className={`text-xs sm:text-sm leading-relaxed break-words ${isChecked ? 'font-medium' : ''}`}>
                  {req.texto}
                </span>
              </label>
            );
          })}
        </div>

        {/* Botones de acción del checklist */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors text-center"
          >
            <FaPrint className="w-4 h-4 shrink-0" />
            <span>Imprimir / Guardar Resumen</span>
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold transition-colors text-center"
          >
            <FaRotateLeft className="w-4 h-4 shrink-0" />
            <span>Restablecer Lista</span>
          </button>
        </div>
      </section>

      {/* Pasos a seguir */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <FaListOl className="w-5 h-5 text-brand-600 shrink-0" />
          <span>Pasos Oficiales del Proceso</span>
        </h3>
        <ol className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {guia.pasos.map((paso, index) => (
            <li key={index} className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-white text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="leading-relaxed break-words">{paso}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
