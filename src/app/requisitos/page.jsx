'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Storage, ChecklistManager } from '@/lib/storage';
import {
  FaListCheck,
  FaArrowRight,
  FaPrint,
  FaTrashCan,
  FaShieldHalved,
  FaCircleCheck,
  FaRegCircle
} from 'react-icons/fa6';
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

  guiasData.forEach((g) => {
    totalRequisitos += g.requisitos.length;
    if (mounted) {
      const listos = checklists[g.id] || [];
      totalCompletados += listos.length;
    }
  });

  const porcentajeGlobal =
    totalRequisitos > 0 ? Math.round((totalCompletados / totalRequisitos) * 100) : 0;

  const handleToggleItem = (guiaId, reqId) => {
    Storage.toggleItem(guiaId, reqId);
    setChecklists({ ...Storage.getChecklists() });
  };

  const handleClearAll = () => {
    ChecklistManager.reiniciarChecklist(null);
    setChecklists({});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <div className="flex items-center gap-2 text-brand-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider mb-1">
          <FaListCheck className="w-4 h-4" />
          <span>Control Personal de Documentos</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Requisitos para mi Cita
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          Seguimiento interactivo de los documentos reunidos en este teléfono para sus citas institucionales.
        </p>
      </div>

      {/* Resumen de avance global */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">
              Progreso de Preparación
            </p>
            <h3 className="text-2xl font-extrabold mt-0.5">
              Progreso: {totalCompletados} de {totalRequisitos} documentos listos ({porcentajeGlobal}%)
            </h3>
          </div>
          <div className="text-3xl font-black">{porcentajeGlobal}%</div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-300"
            style={{ width: `${porcentajeGlobal}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-100 pt-1">
          <FaShieldHalved className="w-4 h-4" />
          <span>
            Sus datos se guardan únicamente en este teléfono y no se envían a ningún servidor.
          </span>
        </div>
      </div>

      {/* Botones de acción P5: Limpiar mi lista e Imprimir / PDF */}
      <div className="flex flex-wrap justify-end gap-2.5 no-print">
        <button
          type="button"
          onClick={handleClearAll}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <FaTrashCan className="w-3.5 h-3.5 text-rose-600" />
          <span>Limpiar mi lista</span>
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <FaPrint className="w-4 h-4" />
          <span>Imprimir / PDF</span>
        </button>
      </div>

      {/* Desglose interactivo por guía */}
      <div className="space-y-4">
        {guiasData.map((guia) => {
          const listos = mounted ? checklists[guia.id] || [] : [];
          const pctGuia =
            guia.requisitos.length > 0
              ? Math.round((listos.length / guia.requisitos.length) * 100)
              : 0;
          return (
            <div
              key={guia.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex justify-between items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {guia.titulo}
                </h4>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                  {listos.length} de {guia.requisitos.length} requisitos listos ({pctGuia}%)
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                {guia.requisitos.map((req) => {
                  const isChecked = listos.includes(req.id);
                  return (
                    <button
                      type="button"
                      key={req.id}
                      onClick={() => handleToggleItem(guia.id, req.id)}
                      className={`w-full text-left text-xs p-3 rounded-lg flex items-start gap-2.5 border transition-colors ${
                        isChecked
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-slate-900 dark:text-slate-100'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-400'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isChecked ? (
                          <FaCircleCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <FaRegCircle className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className={isChecked ? 'line-through opacity-80 font-medium' : 'font-medium'}>
                        {req.texto}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-between items-center no-print">
                <button
                  type="button"
                  onClick={() => {
                    Storage.resetGuideChecklist(guia.id);
                    setChecklists({ ...Storage.getChecklists() });
                  }}
                  className="text-xs text-slate-500 hover:text-rose-600 font-semibold transition-colors"
                >
                  Reiniciar esta guía
                </button>
                <Link
                  href={`/guias/${guia.id}/`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-sky-400 hover:underline"
                >
                  <span>Abrir guía paso a paso</span>
                  <FaArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
