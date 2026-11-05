// Módulo Visor de Guías de Trámites (P2, P3, P4)
import { Storage } from './storage.js';

export function renderGuiasCatalog(container, guias) {
  let html = `
    <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 14px; color: var(--text-main);">Catálogo de Guías Oficiales</h2>
    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">Consulte cada guía paso a paso con los costos desglosados y los requisitos para su trámite.</p>
  `;

  guias.forEach(g => {
    html += `
      <div class="card" style="cursor: pointer;" onclick="window.appRouter.navigateToGuide('${g.id}')">
        <h3 class="card-title">${g.titulo}</h3>
        <p class="card-subtitle">${g.descripcion}</p>
        <div style="display: flex; gap: 8px; font-size: 0.85rem; font-weight: 600; color: #047857; margin-bottom: 12px;">
          <span>Costo: ${g.aranceles.usd > 0 ? 'US$' + g.aranceles.usd + ' (~₡' + g.aranceles.crc.toLocaleString() + ')' : 'Gratuito'}</span>
        </div>
        <button class="btn btn-outline" style="width: auto; padding: 8px 16px;">Abrir Guía y Requisitos</button>
      </div>
    `;
  });

  container.innerHTML = html;
}

export function renderGuiaDetail(container, guia) {
  const checklists = Storage.getChecklists();
  const marcados = checklists[guia.id] || [];
  const porcentaje = guia.requisitos.length > 0 ? Math.round((marcados.length / guia.requisitos.length) * 100) : 0;

  let html = `
    <button class="btn btn-outline" style="width: auto; padding: 6px 14px; margin-bottom: 14px;" onclick="window.appRouter.navigate('guias')">&larr; Volver a Guías</button>

    <div class="card" style="border-top: 4px solid var(--primary);">
      <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--primary);">${guia.titulo}</h2>
      <p style="font-size: 0.95rem; margin-top: 6px; color: var(--text-main);">${guia.descripcion}</p>
    </div>

    <div class="card">
      <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">Costos y Aranceles Oficiales</h3>
      <p style="font-size: 0.9rem; color: var(--text-muted);">${guia.aranceles.detalle}</p>
      <div class="alert-box" style="margin-top: 10px;">
        <strong>Cuenta de Pago Oficial:</strong> ${guia.cuenta_bancaria}
      </div>
      <div class="alert-box alert-danger">
        <strong>Prevención de Fraudes:</strong> ${guia.advertencia_fraude}
      </div>
      <p style="font-size: 0.9rem; margin-top: 10px;"><strong>Lugar de Gestión:</strong> ${guia.lugar}</p>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-size: 1.1rem; font-weight: 700;">Lista de Chequeo de Documentos</h3>
        <span id="progreso-texto" style="font-weight: 700; color: var(--secondary); font-size: 0.95rem;">${porcentaje}%</span>
      </div>
      
      <div class="progress-container">
        <div id="progreso-barra" class="progress-bar" style="width: ${porcentaje}%;"></div>
      </div>
      
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px;">Marque en su teléfono los documentos que ya tiene reunidos. Quedan guardados localmente sin enviar datos por internet.</p>

      <div id="requisitos-list">
  `;

  guia.requisitos.forEach(r => {
    const isChecked = marcados.includes(r.id);
    html += `
      <label class="checklist-item ${isChecked ? 'completed' : ''}" id="item-${r.id}">
        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="window.toggleItem('${guia.id}', '${r.id}')">
        <span style="font-size: 0.9rem; line-height: 1.4;">${r.texto}</span>
      </label>
    `;
  });

  html += `
      </div>
      <div style="display: flex; gap: 10px; margin-top: 16px;">
        <button class="btn btn-outline" style="font-size: 0.85rem;" onclick="window.resetCurrentChecklist('${guia.id}')">Restablecer Lista</button>
        <button class="btn btn-primary" style="font-size: 0.85rem;" onclick="window.printSummary('${guia.id}')">Imprimir / Guardar Resumen</button>
      </div>
    </div>

    <div class="card">
      <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">Pasos Oficiales a Seguir</h3>
      <ol style="padding-left: 20px; font-size: 0.9rem; display: flex; flex-direction: column; gap: 8px;">
  `;

  guia.pasos.forEach(p => {
    html += `<li>${p}</li>`;
  });

  html += `
      </ol>
    </div>
  `;

  container.innerHTML = html;
}
