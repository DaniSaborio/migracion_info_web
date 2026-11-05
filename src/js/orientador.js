// Módulo Orientador Inicial (P1: ¿En cuál situación estás?)
export function renderOrientador(container, onSelectTramite) {
  const situaciones = [
    {
      id: "refugio",
      titulo: "Salió de su país por peligro y no tiene papeles al día",
      badge: "Gratuito",
      badgeColor: "#10b981",
      guia: "Guía 1: Solicitud de Refugio"
    },
    {
      id: "categoria_especial_2026",
      titulo: "Es de Nicaragua, Venezuela, Cuba o Colombia y su refugio está pendiente o denegado",
      badge: "Resolución 2026",
      badgeColor: "#0284c7",
      guia: "Guía 2: Categoría Especial 2026"
    },
    {
      id: "residencia_vinculo",
      titulo: "Tiene una hija o hijo costarricense, o cónyuge costarricense",
      badge: "Vínculo de 1.er Grado",
      badgeColor: "#8b5cf6",
      guia: "Guía 3: Residencia por Vínculo"
    },
    {
      id: "dimex_renovacion",
      titulo: "Ya tiene DIMEX y se le va a vencer, o se lo acaban de aprobar",
      badge: "Documentación",
      badgeColor: "#f59e0b",
      guia: "Guía 4: Sacar y Renovar DIMEX"
    },
    {
      id: "seguro_ccss",
      titulo: "Necesita atención médica, citas en el EBAIS o seguro para trámites",
      badge: "Salud Pública",
      badgeColor: "#ef4444",
      guia: "Guía 5: Seguro Social de la CCSS"
    }
  ];

  let html = `
    <div class="card" style="border-left: 4px solid var(--primary); background: #f0f9ff;">
      <h2 style="font-size: 1.25rem; font-weight: 700; color: #0369a1; margin-bottom: 6px;">Orientador Rápido de Trámites</h2>
      <p style="font-size: 0.95rem; color: #334155;">Seleccione su situación actual para conocer los pasos exactos, aranceles bancarios oficiales y requisitos obligatorios sin intermediarios.</p>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 14px;">
  `;

  situaciones.forEach(s => {
    html += `
      <div class="card" style="cursor: pointer; border: 1.5px solid var(--border-color);" onclick="window.appRouter.navigateToGuide('${s.id}')">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <span style="background: ${s.badgeColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">${s.badge}</span>
        </div>
        <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; color: var(--text-main);">${s.titulo}</h3>
        <p style="font-size: 0.9rem; color: var(--primary); font-weight: 600;">Ver ${s.guia} &rarr;</p>
      </div>
    `;
  });

  html += `
    </div>
    <div class="alert-box" style="margin-top: 20px;">
      <strong>Consejo clave:</strong> Todos los pagos a Migración se hacen únicamente en la cuenta 242480-0 del Banco de Costa Rica (BCR). Nunca pague a personas particulares por conseguir citas de Migración; las citas son siempre gratuitas.
    </div>
  `;

  container.innerHTML = html;
}
