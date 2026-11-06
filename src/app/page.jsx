import Link from 'next/link';
import { Compass, AlertTriangle, ArrowRight, ShieldCheck, HeartHandshake, FileCheck2, Users2, Landmark } from 'lucide-react';
import guiasData from '@/data/guias_tramites.json';

export default function HomePage() {
  const situaciones = [
    {
      id: "refugio",
      situacion: "Salió de su país por peligro y no tiene papeles al día",
      guiaTitulo: "Guía 1: Solicitud de Refugio",
      badge: "Trámite Gratuito",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: ShieldCheck,
      iconColor: "text-emerald-600 bg-emerald-50",
      tiempo: "Cita inicial gratis",
      resumen: "Para personas cuya vida o libertad peligra en su país de origen. Incluye carné provisional y posterior permiso de trabajo."
    },
    {
      id: "categoria_especial_2026",
      situacion: "Es de Nicaragua, Venezuela, Cuba o Colombia con refugio pendiente o denegado",
      guiaTitulo: "Guía 2: Categoría Especial Temporal (2026)",
      badge: "Resolución DGME 2026",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
      icon: FileCheck2,
      iconColor: "text-sky-600 bg-sky-50",
      tiempo: "Arancel oficial en BCR",
      resumen: "Vía expedita de regularización con derecho a laborar legalmente si demuestra arraigo en Costa Rica."
    },
    {
      id: "residencia_vinculo",
      situacion: "Tiene hijas o hijos costarricenses, o cónyuge costarricense",
      guiaTitulo: "Guía 3: Residencia por Vínculo de 1.er Grado",
      badge: "Derecho por Vínculo",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      icon: Users2,
      iconColor: "text-purple-600 bg-purple-50",
      tiempo: "Cédula de residencia",
      resumen: "Opción permanente para padres de menores costarricenses nacidos en el país o cónyuges legalmente casados."
    },
    {
      id: "dimex_renovacion",
      situacion: "Ya tiene DIMEX y se le va a vencer, o se lo acaban de aprobar",
      guiaTitulo: "Guía 4: Emisión y Renovación de DIMEX",
      badge: "Documentación Oficial",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: Landmark,
      iconColor: "text-amber-600 bg-amber-50",
      tiempo: "Cita en Correos / BCR",
      resumen: "Pasos para sacar el carné plástico oficial en ventanillas VES de Correos de Costa Rica o sucursales bancarias autorizadas."
    },
    {
      id: "seguro_ccss",
      situacion: "Necesita atención médica, citas en el EBAIS o seguro para trámites",
      guiaTitulo: "Guía 5: Seguro de Salud de la CCSS y EBAIS",
      badge: "Salud y Seguridad Social",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      icon: HeartHandshake,
      iconColor: "text-rose-600 bg-rose-50",
      tiempo: "Adscripción en su comunidad",
      resumen: "Cómo afiliarse al seguro por cuenta propia o convenios humanitarios. Atención de emergencias y partos garantizada."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner de bienvenida y propósito */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-50 dark:bg-sky-950 text-brand-600 dark:text-sky-400 rounded-xl hidden sm:block">
            <Compass className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Información Oficial y Actualizada (2026)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              ¿Cuál es su situación migratoria actual?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Seleccione la opción que mejor describe su caso para ver los requisitos exactos, costos oficiales y pasos a seguir sin pagar intermediarios.
            </p>
          </div>
        </div>
      </section>

      {/* Alerta de prevención de estafas */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Aviso Comunitario de Seguridad:</p>
          <p className="mt-0.5">
            Las citas de Migración son <strong>100% gratuitas</strong>. Todos los pagos oficiales se realizan únicamente en la cuenta <strong>242480-0 del Banco de Costa Rica (BCR)</strong> a nombre de la persona solicitante. Nunca pague por citas ni entregue documentos originales a particulares.
          </p>
        </div>
      </div>

      {/* Lista de tarjetas del orientador */}
      <div className="grid gap-4">
        {situaciones.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={`/guias/${item.id}/`}
              className="group block bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-md transition-all duration-200 relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${item.iconColor} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-400">· {item.tiempo}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                    {item.situacion}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.resumen}
                  </p>
                  <div className="mt-3 flex items-center text-xs sm:text-sm font-semibold text-brand-600 dark:text-sky-400">
                    <span>Ver {item.guiaTitulo}</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Enlaces de acceso rápido */}
      <section className="grid sm:grid-cols-2 gap-4 pt-2">
        <Link
          href="/directorio/"
          className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 transition-colors flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Directorio de Sedes</h4>
            <p className="text-xs text-slate-500">EBAIS, Hospitales y Migración en San Carlos y Frontera</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
        <Link
          href="/emergencias/"
          className="bg-rose-50/60 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 hover:border-rose-300 transition-colors flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-sm text-rose-900 dark:text-rose-200">Líneas de Emergencia</h4>
            <p className="text-xs text-rose-700 dark:text-rose-300">9-1-1, 1311, ACNUR y protección inmediata</p>
          </div>
          <ArrowRight className="w-4 h-4 text-rose-500" />
        </Link>
      </section>
    </div>
  );
}
