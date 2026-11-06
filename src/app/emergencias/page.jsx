'use client';

import { PhoneCall, ShieldAlert, AlertCircle, PhoneForwarded } from 'lucide-react';
import emergenciasData from '@/data/emergencias.json';

export default function EmergenciasPage() {
  return (
    <div className="space-y-6">
      {/* Banner de máxima urgencia */}
      <section className="bg-gradient-to-r from-rose-700 to-red-800 text-white rounded-2xl p-5 sm:p-6 shadow-md space-y-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-rose-200" />
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Líneas de Emergencia y Soporte Inmediato
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
          Acceso garantizado aun en modo desconectado. Todas las llamadas al <strong>9-1-1</strong> son 100% gratuitas desde cualquier teléfono celular, incluso sin saldo ni tarjeta SIM activa.
        </p>
      </section>

      {/* Lista de números */}
      <div className="grid gap-3.5">
        {emergenciasData.map((num, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {num.nombre}
                </span>
                {num.prioridad === 'Alta' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                    24 Horas
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {num.descripcion}
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={`tel:${num.telefono.replace(/-/g, '')}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm transition-colors"
              >
                <PhoneForwarded className="w-4 h-4" />
                <span>Llamar al {num.telefono}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Nota legal de derechos de salud */}
      <div className="bg-sky-50 dark:bg-sky-950/40 border-l-4 border-sky-600 p-4 rounded-r-xl text-xs sm:text-sm text-sky-950 dark:text-sky-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Derecho a la Atención de Urgencias:</p>
          <p className="mt-0.5">
            Por mandato constitucional y reglamentario de la CCSS, los hospitales y clínicas públicas están legalmente obligados a brindar atención de emergencias a mujeres en labor de parto, niños, niñas y personas en riesgo vital inminente, independientemente de su condición migratoria.
          </p>
        </div>
      </div>
    </div>
  );
}
