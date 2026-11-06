'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Storage } from '@/lib/storage';
import { CheckSquare, ArrowRight, Printer, RotateCcw, ShieldCheck } from 'lucide-react';
import guiasData from '@/data/guias_tramites.json';

export default function RequisitosConsolidadosPage() {
  const [checklists, setChecklists] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setChecklists(Storage.getChecklists());
  }, []);

  let totalRequisitos = 0;
  let totalCompletados = 0;

  guiasData.forEach(g => {
    totalRequisitos += g.requisitos.length;
    const marcados = (checklists[g.id] || []).length;
    totalCompletados += marcados;
  });

  const porcentajeGlobal = totalRequisitos > 0 ? Math.round((totalCompletados / totalRequisitos) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-2 text-brand-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
          <CheckSquare className="w-4 h-4" />
          <span>Autoservicio y Control Personal</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Mi Lista Consolidada de Requisitos
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          Seguimiento consolidado de los documentos reunidos en este teléfono para sus citas institucionales.
        </p>
      </div>

      {/* Resumen de avance global */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">Avance de Preparación</p>
            <h3 className="text-2xl font-extrabold mt-0.5">{totalCompletados} de {totalRequisitos} listos</h3>
          </div>
          <div className="text-3xl font-black">{porcentajeGlobal}%</div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-300"
            style={{ width: `${porcentajeGlobal}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-100 pt-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Almacenamiento exclusivo en este dispositivo (cero envío a servidores).</span>
        </div>
      </div>

      {/* Botón de impresión */}
      <div className="flex justify-end no-print">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Resumen para mi Cita</span>
        </button>
      </div>

      {/* Desglose por guía */}
      <div className="space-y-4">
        {guiasData.map(guia => {
          const listos = mounted ? (checklists[guia.id] || []) : [];
          return (
            <div key={guia.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {guia.titulo}
                </h4>
                <span className="text-xs font-semibold text-slate-500">
                  {listos.length} de {guia.requisitos.length} listos
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                {guia.requisitos.map(req => {
                  const isChecked = listos.includes(req.id);
                  return (
                    <div
                      key={req.id}
                      className={`text-xs p-2.5 rounded-lg flex items-start gap-2.5 border ${
                        isChecked
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-slate-900 dark:text-slate-100'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-500'
                      }`}
                    >
                      <span>{isChecked ? '✅' : '⚪'}</span>
                      <span className={isChecked ? 'line-through opacity-80' : ''}>{req.texto}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end no-print">
                <Link
                  href={`/guias/${guia.id}/`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-sky-400 hover:underline"
                >
                  <span>Abrir o modificar lista</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
