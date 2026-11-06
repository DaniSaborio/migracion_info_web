// Controlador Principal SPA y Enrutador
import { Storage } from './storage.js';
import { renderOrientador } from './orientador.js';
import { renderGuiasCatalog, renderGuiaDetail } from './guias.js';
import { renderDirectorio, generateCardsHTML } from './directorio.js';
import { renderEmergencias } from './emergencias.js';

let appData = {
  guias: [],
  directorio: [],
  emergencias: []
};

async function loadData() {
  try {
    const [resGuias, resDir, resEm] = await Promise.all([
      fetch('./src/data/guias_tramites.json').then(r => r.json()),
      fetch('./src/data/directorio.json').then(r => r.json()),
      fetch('./src/data/emergencias.json').then(r => r.json())
    ]);
    appData.guias = resGuias;
    appData.directorio = resDir;
    appData.emergencias = resEm;
    initRouter();
  } catch (e) {
    console.error('Error cargando datos JSON:', e);
  }
}

// Enrutador sencillo basado en Hash
window.appRouter = {
  currentView: 'inicio',
  currentGuideId: null,

  navigate(viewName) {
    this.currentView = viewName;
    this.currentGuideId = null;
    window.location.hash = viewName;
    this.render();
  },

  navigateToGuide(guideId) {
    this.currentView = 'guia_detalle';
    this.currentGuideId = guideId;
    window.location.hash = 'guia/' + guideId;
    this.render();
  },

  render() {
    const container = document.getElementById('view-container');
    // Actualizar nav activo
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === this.currentView);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (this.currentView === 'inicio') {
      renderOrientador(container, this.navigateToGuide.bind(this));
    } else if (this.currentView === 'guias') {
      renderGuiasCatalog(container, appData.guias);
    } else if (this.currentView === 'guia_detalle') {
      const guia = appData.guias.find(g => g.id === this.currentGuideId);
      if (guia) {
        renderGuiaDetail(container, guia);
      } else {
        this.navigate('guias');
      }
    } else if (this.currentView === 'checklist_global') {
      this.renderConsolidatedChecklist(container);
    } else if (this.currentView === 'directorio') {
      renderDirectorio(container, appData.directorio);
    } else if (this.currentView === 'emergencias') {
      renderEmergencias(container, appData.emergencias);
    }
  },

  renderConsolidatedChecklist(container) {
    const checklists = Storage.getChecklists();
    let totalItems = 0;
    let totalChecked = 0;

    appData.guias.forEach(g => {
      totalItems += g.requisitos.length;
      const done = (checklists[g.id] || []).length;
      totalChecked += done;
    });

    const porcentaje = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

    let html = `
      <div class="card" style="border-left: 4px solid var(--secondary);">
        <h2 style="font-size: 1.25rem; font-weight: 700;">Mi Lista Consolidada de Requisitos</h2>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">Progreso de documentos listos guardados en este teléfono:</p>
        <div class="progress-container">
          <div class="progress-bar" style="width: ${porcentaje}%;"></div>
        </div>
        <p style="font-size: 0.95rem; font-weight: 700; color: var(--secondary);">${totalChecked} de ${totalItems} requisitos completados (${porcentaje}%)</p>
      </div>
    `;

    appData.guias.forEach(g => {
      const doneIds = checklists[g.id] || [];
      html += `
        <div class="card">
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--primary); margin-bottom: 8px;">${g.titulo} (${doneIds.length}/${g.requisitos.length})</h3>
      `;

      g.requisitos.forEach(r => {
        const isDone = doneIds.includes(r.id);
        html += `
          <div style="font-size: 0.85rem; padding: 6px 0; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 8px;">
            <span>[${isDone ? 'LISTO' : 'PENDIENTE'}]</span>
            <span style="${isDone ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${r.texto}</span>
          </div>
        `;
      });

      html += `
          <button class="btn btn-outline" style="width: auto; padding: 6px 14px; margin-top: 10px; font-size: 0.8rem;" onclick="window.appRouter.navigateToGuide('${g.id}')">Editar en la Guía</button>
        </div>
      `;
    });

    container.innerHTML = html;
  }
};

// Listeners globales para interacciones de checklist
window.toggleItem = function(tramiteId, reqId) {
  const updated = Storage.toggleRequisito(tramiteId, reqId);
  const guia = appData.guias.find(g => g.id === tramiteId);
  if (guia) {
    const elItem = document.getElementById('item-' + reqId);
    if (elItem) {
      elItem.classList.toggle('completed', updated.includes(reqId));
    }
    const porcentaje = Math.round((updated.length / guia.requisitos.length) * 100);
    const elTexto = document.getElementById('progreso-texto');
    const elBarra = document.getElementById('progreso-barra');
    if (elTexto) elTexto.innerText = porcentaje + '%';
    if (elBarra) elBarra.style.width = porcentaje + '%';
  }
};

window.resetCurrentChecklist = function(tramiteId) {
  if (confirm('¿Desea desmarcar todos los requisitos de esta guía?')) {
    Storage.resetChecklist(tramiteId);
    window.appRouter.render();
  }
};

window.printSummary = function(tramiteId) {
  window.print();
};

window.filterCanton = function(canton, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = canton === 'Todos' ? appData.directorio : appData.directorio.filter(s => (s.canton === canton || s.distrito === canton));
  document.getElementById('directorio-cards-container').innerHTML = generateCardsHTML(filtered);
};

// Accesibilidad
window.toggleContrast = function() {
  document.body.classList.toggle('high-contrast');
  const prefs = Storage.getPreferences();
  prefs.highContrast = document.body.classList.contains('high-contrast');
  Storage.setPreferences(prefs);
};

window.toggleFont = function() {
  document.body.classList.toggle('font-large');
  const prefs = Storage.getPreferences();
  prefs.fontLarge = document.body.classList.contains('font-large');
  Storage.setPreferences(prefs);
};

// Monitor de Conectividad Online / Offline
function initNetworkMonitor() {
  const bar = document.getElementById('network-status');
  function update() {
    if (navigator.onLine) {
      bar.className = 'status-bar';
      bar.innerHTML = '<span>Conectado a Internet</span><span>Modo PWA Offline Activo</span>';
    } else {
      bar.className = 'status-bar offline';
      bar.innerHTML = '<span>Sin conexión de red</span><span>Modo Offline: Funcional</span>';
    }
  }
  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

function initRouter() {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('guia/')) {
    const id = hash.split('/')[1];
    window.appRouter.navigateToGuide(id);
  } else if (['inicio', 'guias', 'checklist_global', 'directorio', 'emergencias'].includes(hash)) {
    window.appRouter.navigate(hash);
  } else {
    window.appRouter.navigate('inicio');
  }
}

// Registro de Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('Service Worker registrado con éxito:', reg.scope);
    }).catch(err => {
      console.log('Fallo al registrar Service Worker:', err);
    });
  });
}

// Inicialización al cargar DOM
document.addEventListener('DOMContentLoaded', () => {
  const prefs = Storage.getPreferences();
  if (prefs.highContrast) document.body.classList.add('high-contrast');
  if (prefs.fontLarge) document.body.classList.add('font-large');

  initNetworkMonitor();
  loadData();
});
