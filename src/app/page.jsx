import Link from 'next/link';
import {
  FaTriangleExclamation,
  FaArrowRight,
  FaBookOpen
} from 'react-icons/fa6';
import OrientadorFormulario from '@/components/OrientadorFormulario';

export default function HomePage() {
  return (
    <div className="space-y-5">
      {/* INTRODUCCIÓN COMUNITARIA CONCISA */}
      <section className="bg-gradient-to-br from-white via-sky-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-700 dark:text-sky-300 bg-brand-100 dark:bg-sky-950 px-3 py-0.5 rounded-full border border-brand-200 dark:border-sky-800">
            Iniciativa Comunal UTN · ADI Venecia
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Orientación Migratoria para la Región Huetar Norte
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Información clara y paso a paso para personas y familias migrantes en Venecia, Aguas Zarcas, Ciudad Quesada, Upala y Los Chiles sobre trámites oficiales, acceso a la salud pública y prevención de estafas, <strong>sin pagar tramitadores ni intermediarios</strong>.
        </p>
      </section>

      {/* AVISO DE SEGURIDAD CONTRA FRAUDES */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
        <FaTriangleExclamation className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Prevención contra Estafas y Cobros Indebidos:</p>
          <p className="mt-0.5">
            Las citas de Migración son <strong>completamente gratuitas</strong>. Todos los aranceles oficiales se pagan únicamente en la cuenta <strong>242480-0 del Banco de Costa Rica (BCR)</strong> a nombre del solicitante. Nunca pague en efectivo a terceros por apartar turnos.
          </p>
        </div>
      </div>

      {/* FORMULARIO INTERACTIVO DE DIAGNÓSTICO */}
      <section>
        <OrientadorFormulario />
      </section>

      {/* ACCESO DIRECTO AL CATÁLOGO DE GUÍAS */}
      <Link
        href="/guias/"
        className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-all flex items-center justify-between group shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-sky-950 text-brand-600 dark:text-sky-400">
            <FaBookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
              ¿Ya conoce qué trámite necesita realizar?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consulte directamente el catálogo con las 5 guías paso a paso y sus aranceles
            </p>
          </div>
        </div>
        <FaArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all shrink-0" />
      </Link>
    </div>
  );
}
