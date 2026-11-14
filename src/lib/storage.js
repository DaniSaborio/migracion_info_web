// Arquitectura de Clases y Adaptador Local-First / Zero-Knowledge (OWASP Top 10:2025 + Ley 8968)
// Cumple con Anexo Fase 2 (Modelo_Datos_Local_Portal_Migrante.pdf y Diagrama_Clases_Frontend_Portal_Migrante.pdf)
// Incluye fallback automático a SessionStorage / Memoria para navegación privada (PT-LOC-04).

import guiasData from '@/data/guias_tramites.json';
import directorioData from '@/data/directorio.json';

const STORAGE_KEYS = {
  CHECKLISTS: 'checklists_estado',
  CHECKLISTS_COMPAT: 'portal_migrante_checklists',
  CHECKLISTS_TCU: 'tcu_checklist',
  PREFERENCES: 'portal_preferencias',
  PREFERENCES_COMPAT: 'portal_migrante_preferencias'
};

const GUIDE_ID_ALIASES = {
  'categoria-especial': 'categoria_especial_2026',
  'vinculo': 'residencia_vinculo',
  'dimex': 'dimex_renovacion',
  'ccss': 'seguro_ccss'
};

export function resolveGuideId(id) {
  if (!id) return '';
  return GUIDE_ID_ALIASES[id] || id;
}

const memoryStore = new Map();

// Sanitización anti-Prototype Pollution (OWASP A08:2025)
export function safeJsonParse(raw, fallback = null) {
  if (!raw || typeof raw !== 'string') return fallback;
  try {
    return JSON.parse(raw, (key, value) => {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return undefined;
      }
      return value;
    });
  } catch {
    return fallback;
  }
}

/**
 * «Adapter» StorageAdapter (LocalStorage con Fallback a SessionStorage y Memoria — PT-LOC-04)
 */
export class StorageAdapter {
  static isStorageAvailable(type = 'localStorage') {
    if (typeof window === 'undefined') return false;
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  static getItem(key, fallback = null) {
    if (typeof window === 'undefined') {
      return memoryStore.has(key) ? memoryStore.get(key) : fallback;
    }
    try {
      if (this.isStorageAvailable('localStorage')) {
        const raw = window.localStorage.getItem(key);
        if (raw !== null) return safeJsonParse(raw, fallback);
      }
      if (this.isStorageAvailable('sessionStorage')) {
        const raw = window.sessionStorage.getItem(key);
        if (raw !== null) return safeJsonParse(raw, fallback);
      }
    } catch {
      // Fallback silencioso a memoria
    }
    return memoryStore.has(key) ? memoryStore.get(key) : fallback;
  }

  static setItem(key, value) {
    memoryStore.set(key, value);
    if (typeof window === 'undefined') return true;
    const serialized = JSON.stringify(value);
    try {
      if (this.isStorageAvailable('localStorage')) {
        window.localStorage.setItem(key, serialized);
        return true;
      }
    } catch {
      // Cuota excedida o modo incógnito estricto -> usar sessionStorage (PT-LOC-04)
    }
    try {
      if (this.isStorageAvailable('sessionStorage')) {
        window.sessionStorage.setItem(key, serialized);
        return true;
      }
    } catch {
      // Respaldo en memoryStore ya aplicado
    }
    return true;
  }

  static removeItem(key) {
    memoryStore.delete(key);
    if (typeof window === 'undefined') return;
    try {
      if (this.isStorageAvailable('localStorage')) window.localStorage.removeItem(key);
      if (this.isStorageAvailable('sessionStorage')) window.sessionStorage.removeItem(key);
    } catch {}
  }
}

/**
 * «Manager» ChecklistManager (Diagrama UML de Clases Frontend)
 */
export class ChecklistManager {
  static getAll() {
    const primary = StorageAdapter.getItem(STORAGE_KEYS.CHECKLISTS, null);
    if (primary && typeof primary === 'object') return primary;
    const compat = StorageAdapter.getItem(STORAGE_KEYS.CHECKLISTS_COMPAT, null);
    if (compat && typeof compat === 'object') return compat;
    const tcu = StorageAdapter.getItem(STORAGE_KEYS.CHECKLISTS_TCU, null);
    if (tcu && typeof tcu === 'object') return tcu;
    return {};
  }

  static saveAll(state) {
    const cleanState = state && typeof state === 'object' ? state : {};
    StorageAdapter.setItem(STORAGE_KEYS.CHECKLISTS, cleanState);
    StorageAdapter.setItem(STORAGE_KEYS.CHECKLISTS_COMPAT, cleanState);
    StorageAdapter.setItem(STORAGE_KEYS.CHECKLISTS_TCU, cleanState);
  }

  static marcarRequisito(tramiteId, itemId) {
    const canonicalId = resolveGuideId(tramiteId);
    const all = this.getAll();
    const list = Array.isArray(all[canonicalId]) ? [...all[canonicalId]] : [];
    if (!list.includes(itemId)) {
      list.push(itemId);
    }
    all[canonicalId] = list;
    this.saveAll(all);
    return list;
  }

  static desmarcarRequisito(tramiteId, itemId) {
    const canonicalId = resolveGuideId(tramiteId);
    const all = this.getAll();
    const list = Array.isArray(all[canonicalId]) ? all[canonicalId].filter((id) => id !== itemId) : [];
    all[canonicalId] = list;
    this.saveAll(all);
    return list;
  }

  static obtenerProgreso(tramiteId) {
    const canonicalId = resolveGuideId(tramiteId);
    const guia = guiasData.find((g) => g.id === canonicalId);
    if (!guia || !Array.isArray(guia.requisitos) || guia.requisitos.length === 0) return 0;
    const marcados = this.getAll()[canonicalId] || [];
    return Math.round((marcados.length / guia.requisitos.length) * 100);
  }

  static reiniciarChecklist(tramiteId = null) {
    if (!tramiteId) {
      StorageAdapter.removeItem(STORAGE_KEYS.CHECKLISTS);
      StorageAdapter.removeItem(STORAGE_KEYS.CHECKLISTS_COMPAT);
      StorageAdapter.removeItem(STORAGE_KEYS.CHECKLISTS_TCU);
      return {};
    }
    const canonicalId = resolveGuideId(tramiteId);
    const all = this.getAll();
    all[canonicalId] = [];
    this.saveAll(all);
    return [];
  }

  static exportarListaCompletada() {
    const all = this.getAll();
    return {
      version_catalogo: '2026.1',
      updated_at: new Date().toISOString(),
      tramites: guiasData.map((g) => {
        const marcados = all[g.id] || [];
        return {
          tramite_id: g.id,
          titulo: g.titulo,
          progreso_porcentaje: this.obtenerProgreso(g.id),
          completados: marcados.length,
          total: g.requisitos.length,
          items: g.requisitos.map((r) => ({
            id: r.id,
            label: r.texto,
            completado: marcados.includes(r.id)
          }))
        };
      })
    };
  }
}

/**
 * «Frontend Controller» TramiteController (Diagrama UML de Clases Frontend)
 */
export class TramiteController {
  static cargarCatalogoGuias() {
    return guiasData;
  }

  static consultarGuiaPorId(id) {
    const canonicalId = resolveGuideId(id);
    return guiasData.find((g) => g.id === canonicalId) || null;
  }

  static calcularArancelesTotales(tramiteId) {
    const guia = this.consultarGuiaPorId(tramiteId);
    if (!guia) return { usd: 0, crc: 0, detalle: 'No encontrado', gratuito: true };
    return {
      usd: guia.aranceles.usd,
      crc: guia.aranceles.crc,
      detalle: guia.aranceles.detalle,
      cuenta_bancaria: guia.cuenta_bancaria,
      gratuito: guia.aranceles.usd === 0
    };
  }

  static generarResumenImprimible() {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  }
}

/**
 * «Service» DirectorioService (Diagrama UML de Clases Frontend)
 */
export class DirectorioService {
  static filtrarPorCanton(canton) {
    if (!canton || canton === 'Todos') return directorioData;
    return directorioData.filter(
      (sede) => sede.canton === canton || sede.distrito === canton
    );
  }

  static filtrarPorTipoTramite(tipo) {
    if (!tipo || tipo === 'Todos') return directorioData;
    const q = tipo.toLowerCase();
    return directorioData.filter(
      (sede) =>
        sede.categoria.toLowerCase().includes(q) ||
        sede.tramites.toLowerCase().includes(q)
    );
  }

  static buscarInstitucion(query) {
    if (!query || !query.trim()) return directorioData;
    const q = query.trim().toLowerCase();
    return directorioData.filter(
      (sede) =>
        sede.nombre.toLowerCase().includes(q) ||
        sede.canton.toLowerCase().includes(q) ||
        (sede.distrito && sede.distrito.toLowerCase().includes(q)) ||
        sede.tramites.toLowerCase().includes(q) ||
        sede.direccion.toLowerCase().includes(q)
    );
  }

  static abrirMarcadorTelefono(telefono) {
    const clean = String(telefono || '').replace(/[^\d+]/g, '');
    const href = `tel:${clean}`;
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
    return href;
  }

  static abrirMapaUbicacion(lat, lng) {
    const url = `https://maps.google.com/?q=${Number(lat)},${Number(lng)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    return url;
  }
}

/**
 * «Service Worker Manager» OfflineManager (Diagrama UML de Clases Frontend)
 */
export class OfflineManager {
  static async registrarServiceWorker() {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return false;
    }
    try {
      await navigator.serviceWorker.register('/sw.js');
      return true;
    } catch {
      return false;
    }
  }

  static verificarConectividad() {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine !== false;
  }

  static async precargarRecursosCriticos() {
    if (typeof caches === 'undefined') return;
    try {
      const cache = await caches.open('portal-migrante-next-v2.0.0');
      await cache.addAll([
        '/',
        '/emergencias/',
        '/data/guias_tramites.json',
        '/data/directorio.json',
        '/data/emergencias.json'
      ]);
    } catch {}
  }
}

export const Storage = {
  getChecklists() {
    return ChecklistManager.getAll();
  },

  getGuideChecklist(guideId) {
    const canonicalId = resolveGuideId(guideId);
    const all = ChecklistManager.getAll();
    return all[canonicalId] || [];
  },

  toggleItem(guideId, itemId) {
    const canonicalId = resolveGuideId(guideId);
    const current = this.getGuideChecklist(canonicalId);
    if (current.includes(itemId)) {
      return ChecklistManager.desmarcarRequisito(canonicalId, itemId);
    }
    return ChecklistManager.marcarRequisito(canonicalId, itemId);
  },

  resetGuideChecklist(guideId) {
    return ChecklistManager.reiniciarChecklist(guideId);
  },

  resetAllChecklists() {
    return ChecklistManager.reiniciarChecklist(null);
  },

  getPreferences() {
    const raw =
      StorageAdapter.getItem(STORAGE_KEYS.PREFERENCES, null) ||
      StorageAdapter.getItem(STORAGE_KEYS.PREFERENCES_COMPAT, null);
    if (!raw || typeof raw !== 'object') {
      return {
        fontLarge: false,
        highContrast: false,
        tamano_fuente: 'normal',
        modo_alto_contraste: false,
        filtro_canton_activo: 'Todos'
      };
    }
    return {
      fontLarge: Boolean(raw.fontLarge || raw.tamano_fuente === 'grande'),
      highContrast: Boolean(raw.highContrast ?? raw.modo_alto_contraste),
      tamano_fuente: raw.tamano_fuente || (raw.fontLarge ? 'grande' : 'normal'),
      modo_alto_contraste: Boolean(raw.modo_alto_contraste ?? raw.highContrast),
      filtro_canton_activo: raw.filtro_canton_activo || 'Todos',
      ultima_actualizacion: raw.ultima_actualizacion || new Date().toISOString()
    };
  },

  setPreferences(prefs) {
    const normalized = {
      fontLarge: Boolean(prefs.fontLarge),
      highContrast: Boolean(prefs.highContrast),
      tamano_fuente: prefs.fontLarge ? 'grande' : 'normal',
      modo_alto_contraste: Boolean(prefs.highContrast),
      filtro_canton_activo: prefs.filtro_canton_activo || 'Todos',
      ultima_actualizacion: new Date().toISOString()
    };
    StorageAdapter.setItem(STORAGE_KEYS.PREFERENCES, normalized);
    StorageAdapter.setItem(STORAGE_KEYS.PREFERENCES_COMPAT, normalized);
  }
};
