import { notFound } from 'next/navigation';
import guiasData from '@/data/guias_tramites.json';
import GuiaDetailClient from '@/components/GuiaDetailClient';
import { resolveGuideId } from '@/lib/storage';

// Static export param generator para Cloudflare Pages
// Incluye tanto los IDs canónicos del Modelo de Datos como los slugs cortos del Mapa de Navegación (Sección 11.1)
export async function generateStaticParams() {
  const canonicalIds = guiasData.map((g) => ({ id: g.id }));
  const aliasIds = [
    { id: 'categoria-especial' },
    { id: 'vinculo' },
    { id: 'dimex' },
    { id: 'ccss' }
  ];
  return [...canonicalIds, ...aliasIds];
}

export async function generateMetadata({ params }) {
  const canonicalId = resolveGuideId(params.id);
  const guia = guiasData.find((g) => g.id === canonicalId);
  if (!guia) return { title: 'Guía no encontrada' };
  return {
    title: `${guia.titulo} — Portal Información Migrante`,
    description: guia.descripcion,
  };
}

export default function GuiaPage({ params }) {
  const canonicalId = resolveGuideId(params.id);
  const guia = guiasData.find((g) => g.id === canonicalId);

  if (!guia) {
    notFound();
  }

  return <GuiaDetailClient guia={guia} />;
}
