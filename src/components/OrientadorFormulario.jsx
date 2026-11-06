'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  MapPin,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import guiasData from '@/data/guias_tramites.json';

export default function OrientadorFormulario() {
  const [paso, setPaso] = useState(1);
  const [motivoPrincipal, setMotivoPrincipal] = useState(null);
  const [detalleSecundario, setDetalleSecundario] = useState(null);
  const [guiaRecomendadaId, setGuiaRecomendadaId] = useState(null);

  // Opciones del Paso 1
  const opcionesPaso1 = [
    {
      id: 'peligro',
      titulo: 'Salí de mi país por peligro o persecución',
      descripcion: 'Mi vida o libertad corren riesgo y requiero protección internacional en Costa Rica.',
      icono: '🛡️'
    },
    {
      id: 'regularizacion',
      titulo: 'Quiero regularizarme para trabajar legalmente',
      descripcion: 'Tengo tiempo viviendo en Costa Rica y deseo obtener un permiso legal de permanencia y empleo.',
      icono: '📋'
    },
    {
      id: 'familia',
      titulo: 'Tengo hijos o cónyuge costarricense',
      descripcion: 'Tengo hijas/hijos nacidos en Costa Rica o matrimonio civil registrado con persona costarricense.',
      icono: '👨‍👩‍👧'
    },
    {
      id: 'dimex',
      titulo: 'Necesito sacar o renovar mi carné DIMEX',
      descripcion: 'Ya tengo mi trámite aprobado o mi cédula de residencia está próxima a vencer.',
      icono: '💳'
    },
    {
      id: 'salud',
      titulo: 'Necesito atención médica o seguro de la CCSS',
      descripcion: 'Quiero inscribirme en el EBAIS, asegurar a mi familia o consultar sobre citas y recetas.',
      icono: '🏥'
    }
  ];

  // Opciones de detalle según Paso 1
  const opcionesSecundarias = {
    peligro: {
      pregunta: '¿Tiene actualmente alguna cita o trámite iniciado ante la DGME?',
      opciones: [
        { id: 'sin_tramite', texto: 'Aún no he solicitado cita ni entregado papeles oficiales.', guia: 'refugio' },
        { id: 'con_tramite', texto: 'Ya tengo carné provisional de solicitante y busco dar seguimiento.', guia: 'refugio' }
      ]
    },
    regularizacion: {
      pregunta: '¿Cuál es su país de origen y situación previa?',
      opciones: [
        { id: 'cat_especial', texto: 'Soy de Nicaragua, Venezuela, Cuba o Colombia (con refugio denegado/pendiente o arraigo).', guia: 'categoria_especial_2026' },
        { id: 'otra_nac', texto: 'Soy de otra nacionalidad o ingresé por primera vez recientemente.', guia: 'refugio' }
      ]
    },
    familia: {
      pregunta: '¿Cuál es el parentesco de primer grado con la persona costarricense?',
      opciones: [
        { id: 'hijo_cr', texto: 'Soy madre o padre de una persona menor de edad nacida en Costa Rica.', guia: 'residencia_vinculo' },
        { id: 'conyuge_cr', texto: 'Estoy legalmente casado/a con una persona ciudadana costarricense.', guia: 'residencia_vinculo' }
      ]
    },
    dimex: {
      pregunta: '¿Cuál es el estado de su documento de identidad migratoria?',
      opciones: [
        { id: 'renovacion', texto: 'Tengo DIMEX pero está vencido o por vencerse en los próximos meses.', guia: 'dimex_renovacion' },
        { id: 'primera_vez', texto: 'Recibí la resolución de aprobación y debo solicitar el carné plástico por primera vez.', guia: 'dimex_renovacion' }
      ]
    },
    salud: {
      pregunta: '¿Cuál es su prioridad en este momento con respecto al seguro?',
      opciones: [
        { id: 'adscripcion', texto: 'Adscribirme al EBAIS de mi comunidad para consultas médicas y recetas.', guia: 'seguro_ccss' },
        { id: 'urgencia_parto', texto: 'Atención de embarazo, parto o emergencia médica vital (atención garantizada).', guia: 'seguro_ccss' }
      ]
    }
  };

  const handleSeleccionarPaso1 = (motivoId) => {
    setMotivoPrincipal(motivoId);
    // Verificar si tiene sub-opciones
    const sub = opcionesSecundarias[motivoId];
    if (sub) {
      setPaso(2);
    } else {
      // Direct recommendation
      finalizarDiagnostico('refugio');
    }
  };

  const handleSeleccionarPaso2 = (opcion) => {
    setDetalleSecundario(opcion.id);
    finalizarDiagnostico(opcion.guia);
  };

  const finalizarDiagnostico = (guiaId) => {
    setGuiaRecomendadaId(guiaId);
    setPaso(3);
  };

  const handleReiniciar = () => {
    setPaso(1);
    setMotivoPrincipal(null);
    setDetalleSecundario(null);
    setGuiaRecomendadaId(null);
  };

  const guiaRecomendada = guiasData.find(g => g.id === guiaRecomendadaId);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-7 border-2 border-brand-500/40 dark:border-brand-600/40 shadow-sm space-y-5">
      {/* Encabezado del Formulario */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-50 dark:bg-sky-950 text-brand-600 dark:text-sky-400 rounded-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
              Asistente de Diagnóstico Migratorio
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Responda 2 preguntas para indicarle el trámite exacto y evitar gastos innecesarios
            </p>
          </div>
        </div>

        {paso > 1 && (
          <button
            onClick={handleReiniciar}
            className="text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        )}
      </div>

      {/* Indicador de pasos */}
      <div className="flex items-center gap-2">
        <div className={`flex-1 h-1.5 rounded-full ${paso >= 1 ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
        <div className={`flex-1 h-1.5 rounded-full ${paso >= 2 ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
        <div className={`flex-1 h-1.5 rounded-full ${paso >= 3 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
      </div>

      {/* PASO 1: MOTIVO PRINCIPAL */}
      {paso === 1 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-sky-400">
              Paso 1 de 2: Su Situación Principal
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              ¿Cuál es la razón principal por la que busca orientación?
            </h4>
          </div>

          <div className="grid gap-2.5">
            {opcionesPaso1.map((opcion) => (
              <button
                key={opcion.id}
                onClick={() => handleSeleccionarPaso1(opcion.id)}
                className="w-full text-left p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-sky-50/50 dark:hover:bg-slate-800/50 transition-all flex items-start gap-3.5 group"
              >
                <span className="text-2xl shrink-0 mt-0.5">{opcion.icono}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-sky-400 transition-colors">
                    {opcion.titulo}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {opcion.descripcion}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASO 2: PREGUNTA SECUNDARIA */}
      {paso === 2 && motivoPrincipal && opcionesSecundarias[motivoPrincipal] && (
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-sky-400">
              Paso 2 de 2: Detalle de su caso
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {opcionesSecundarias[motivoPrincipal].pregunta}
            </h4>
          </div>

          <div className="grid gap-2.5">
            {opcionesSecundarias[motivoPrincipal].opciones.map((subOp) => (
              <button
                key={subOp.id}
                onClick={() => handleSeleccionarPaso2(subOp)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:bg-sky-50/50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-500 group-hover:scale-125 transition-transform" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                    {subOp.texto}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASO 3: RESULTADO Y RECOMENDACIÓN */}
      {paso === 3 && guiaRecomendada && (
        <div className="space-y-4 pt-1 animate-fadeIn">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Resultado de su Diagnóstico</span>
          </div>

          <div className="bg-gradient-to-br from-brand-50 to-sky-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl border-2 border-brand-400 dark:border-brand-600 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-brand-700 dark:text-sky-300 bg-brand-100 dark:bg-sky-950 px-2.5 py-0.5 rounded-full">
                Guía Recomendada
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                {guiaRecomendada.aranceles.usd > 0
                  ? `Arancel: US$${guiaRecomendada.aranceles.usd} (~₡${guiaRecomendada.aranceles.crc.toLocaleString()})`
                  : 'Trámite 100% Gratuito'}
              </span>
            </div>

            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {guiaRecomendada.titulo}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {guiaRecomendada.descripcion}
            </p>

            <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-brand-100 dark:border-slate-700">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span><strong>Dónde acudir:</strong> {guiaRecomendada.lugar}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Requisitos:</strong> {guiaRecomendada.requisitos.length} documentos obligatorios</span>
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <Link
                href={`/guias/${guiaRecomendada.id}/`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all hover:shadow-lg"
              >
                <span>Abrir Guía y Comenzar mi Lista de Requisitos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleReiniciar}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Probar otro caso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
