import Link from 'next/link';
import {
  Compass,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  FileCheck2,
  Users2,
  Landmark,
  WifiOff,
  Scale,
  Sparkles,
  BookOpen
} from 'lucide-react';
import OrientadorFormulario from '@/components/OrientadorFormulario';
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
    <div className="space-y-7">
      {/* SECCIÓN 1: INTRODUCCIÓN GENERAL AL PORTAL */}
      <section className="bg-gradient-to-br from-white via-sky-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-brand-700 dark:text-sky-300 bg-brand-100 dark:bg-sky-950 px-3 py-1 rounded-full border border-brand-200 dark:border-sky-800">
            Iniciativa Comunal UTN &bull; ADI Venecia
          </span>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
            100% Gratuito y Confidencial
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Bienvenido al Portal de Información y Orientación Migrante
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Esta plataforma comunitaria fue desarrollada para brindar a las personas y familias migrantes de la <strong>Región Huetar Norte</strong> (Venecia, Aguas Zarcas, Ciudad Quesada, Upala y Los Chiles) orientación clara, confiable y paso a paso sobre los trámites migratorios oficiales, acceso a la salud pública y prevención de estafas, <strong>sin necesidad de pagar tramitadores ni intermediarios</strong>.
          </p>
        </div>

        {/* Pilares clave de la plataforma */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2 text-brand-700 dark:text-sky-300 font-bold text-xs">
              <Scale className="w-4 h-4 text-brand-600" />
              <span>Marco Legal 2026</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Información basada en la Ley 8764 y resoluciones oficiales vigentes de la DGME y la CCSS.
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacidad Total</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No recopila nombres ni cédulas. Sus listas de chequeo residen solo en este teléfono.
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold text-xs">
              <WifiOff className="w-4 h-4 text-sky-600" />
              <span>Funciona sin Internet</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tecnología PWA que le permite consultar guías y números de auxilio sin datos celulares.
            </p>
          </div>
        </div>
      </section>

      {/* AVISO DE SEGURIDAD CONTRA FRAUDES */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Aviso de Prevención contra Estafas y Cobros Indebidos:</p>
          <p className="mt-0.5">
            Las citas de Migración son <strong>completamente gratuitas</strong>. Todos los aranceles oficiales se pagan exclusivamente en la cuenta <strong>242480-0 del Banco de Costa Rica (BCR)</strong> a nombre del solicitante. Nunca pague en efectivo a personas particulares por apartar turnos ni entregue sus documentos originales.
          </p>
        </div>
      </div>

      {/* SECCIÓN 2: FORMULARIO INTERACTIVO DE DIAGNÓSTICO */}
      <section>
        <OrientadorFormulario />
      </section>

      {/* SECCIÓN 3: EXPLORACIÓN MANUAL DE TODAS LAS GUÍAS */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              O explore directamente las Guías de Trámites
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Seleccione cualquier trámite para conocer aranceles, cuentas bancarias y requisitos:
            </p>
          </div>
          <Link
            href="/guias/"
            className="text-xs font-bold text-brand-600 dark:text-sky-400 hover:underline hidden sm:inline-flex items-center gap-1"
          >
            <span>Ver catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid gap-3.5">
          {situaciones.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={`/guias/${item.id}/`}
                className="group block bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl shrink-0 ${item.iconColor} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-xs text-slate-400">· {item.tiempo}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                      {item.situacion}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.resumen}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECCIÓN 4: ENLACES RÁPIDOS A DIRECTORIO Y EMERGENCIAS */}
      <section className="grid sm:grid-cols-2 gap-4 pt-1">
        <Link
          href="/directorio/"
          className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-all flex items-center justify-between group shadow-xs"
        >
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
              Directorio de Sedes Regionales
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              EBAIS, Hospitales y Delegaciones en San Carlos, Upala y Los Chiles
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/emergencias/"
          className="bg-rose-50/70 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 hover:border-rose-300 transition-all flex items-center justify-between group shadow-xs"
        >
          <div>
            <h4 className="font-bold text-sm text-rose-900 dark:text-rose-200 group-hover:text-rose-600 transition-colors">
              Líneas de Emergencia Inmediata
            </h4>
            <p className="text-xs text-rose-700/80 dark:text-rose-300 mt-0.5">
              9-1-1, 1311, ACNUR, INAMU y PANI con llamada en un toque
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-all" />
        </Link>
      </section>
    </div>
  );
}
