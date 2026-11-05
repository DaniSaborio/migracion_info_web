// Módulo Líneas de Emergencia y Soporte Humanitario (P9)
export function renderEmergencias(container, numeros) {
  let html = `
    <div class="card" style="background: #fef2f2; border: 1.5px solid #f87171;">
      <h2 style="font-size: 1.25rem; font-weight: 700; color: #991b1b; margin-bottom: 4px;">Líneas de Emergencia y Apoyo</h2>
      <p style="font-size: 0.9rem; color: #7f1d1d;">Acceso garantizado en modo desconectado. Todas las llamadas al 911 son 100% gratuitas desde cualquier teléfono celular aun sin saldo.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 12px;">
  `;

  numeros.forEach(num => {
    html += `
      <div class="card" style="margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">${num.nombre}</h3>
          <span style="font-weight: 800; font-size: 1.15rem; color: #dc2626;">${num.telefono}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">${num.descripcion}</p>
        <a href="tel:${num.telefono.replace(/-/g, '')}" class="btn btn-danger" style="padding: 10px 16px;">
          Llamar de Inmediato al ${num.telefono}
        </a>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}
