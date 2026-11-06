import { notFound } from 'next/navigation';
import guiasData from '@/data/guias_tramites.json';
import GuiaDetailClient from '@/components/GuiaDetailClient';

// Static export param generator para Cloudflare Pages
export async function generateStaticParams() {
  return guiasData.map((g) => ({
    id: g.id,
  }));
}

export async function generateMetadata({ params }) {
  const guia = guiasData.find((g) => g.id === params.id);
  if (!guia) return { title: 'Guía no encontrada' };
  return {
    title: `${guia.titulo} — Portal Información Migrante`,
    description: guia.descripcion,
  };
}

export default function GuiaPage({ params }) {
  const guia = guiasData.find((g) => g.id === params.id);

  if (!guia) {
    notFound();
  }

  return <GuiaDetailClient guia={guia} />;
}
