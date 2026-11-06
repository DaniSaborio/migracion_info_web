// Módulo Directorio Regional Institucional (P6, P7, P8)
export function renderDirectorio(container, sedes) {
  window.directorioData = sedes;
  window.currentCanton = 'Todos';

  let html = `
    <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 6px;">Directorio Institucional de Apoyo</h2>
    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 14px;">Sedes confirmadas en la Región Huetar Norte para salud, trámites migratorios y orientación.</p>

    <div class="filter-tabs">
      <button class="filter-btn active" onclick="window.filterCanton('Todos', this)">Todos</button>
      <button class="filter-btn" onclick="window.filterCanton('San Carlos', this)">San Carlos</button>
      <button class="filter-btn" onclick="window.filterCanton('Venecia', this)">Venecia</button>
      <button class="filter-btn" onclick="window.filterCanton('Aguas Zarcas', this)">Aguas Zarcas</button>
      <button class="filter-btn" onclick="window.filterCanton('Upala', this)">Upala</button>
      <button class="filter-btn" onclick="window.filterCanton('Los Chiles', this)">Los Chiles</button>
    </div>

    <div id="directorio-cards-container">
  `;

  html += generateCardsHTML(sedes);
  html += `</div>`;

  container.innerHTML = html;
}

export function generateCardsHTML(sedes) {
  let html = '';
  sedes.forEach(s => {
    html += `
      <div class="card" style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <h3 class="card-title" style="margin-bottom: 0;">${s.nombre}</h3>
          <span style="background: #e2e8f0; color: #334155; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">${s.distrito || s.canton}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;"><strong>Dirección:</strong> ${s.direccion}</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;"><strong>Horario:</strong> ${s.horario}</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px;"><strong>Trámites:</strong> ${s.tramites}</p>
        
        <div style="display: flex; gap: 10px;">
          <a href="tel:${s.telefono.replace(/-/g, '')}" class="btn btn-primary" style="flex: 1; padding: 8px 12px; font-size: 0.85rem;">
            Llamar (${s.telefono})
          </a>
          <a href="https://maps.google.com/?q=${s.coordenadas.lat},${s.coordenadas.lng}" target="_blank" rel="noopener" class="btn btn-outline" style="flex: 1; padding: 8px 12px; font-size: 0.85rem;">
            Ver Mapa
          </a>
        </div>
      </div>
    `;
  });
  return html;
}
