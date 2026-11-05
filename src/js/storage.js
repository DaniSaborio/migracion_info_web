// Adaptador de persistencia Local-First (window.localStorage)
// Cero comunicación con servidores; máxima privacidad y protección.

const STORAGE_KEYS = {
  CHECKLISTS: 'portal_migrante_checklists',
  PREFERENCES: 'portal_migrante_preferencias'
};

export const Storage = {
  // Obtener estado completo de checklists
  getChecklists() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error al leer de localStorage:', e);
      return {};
    }
  },

  // Guardar un requisito completado
  toggleRequisito(tramiteId, requisitoId) {
    try {
      const checklists = this.getChecklists();
      if (!checklists[tramiteId]) {
        checklists[tramiteId] = [];
      }

      const index = checklists[tramiteId].indexOf(requisitoId);
      if (index === -1) {
        checklists[tramiteId].push(requisitoId);
      } else {
        checklists[tramiteId].splice(index, 1);
      }

      localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(checklists));
      return checklists[tramiteId];
    } catch (e) {
      console.error('Error al actualizar checklist en localStorage:', e);
      return [];
    }
  },

  // Restablecer checklist de un trámite
  resetChecklist(tramiteId) {
    try {
      const checklists = this.getChecklists();
      checklists[tramiteId] = [];
      localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(checklists));
      return true;
    } catch (e) {
      return false;
    }
  },

  // Preferencias de usuario
  getPreferences() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return data ? JSON.parse(data) : { fontLarge: false, highContrast: false };
    } catch (e) {
      return { fontLarge: false, highContrast: false };
    }
  },

  setPreferences(prefs) {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (e) {
      console.error('Error guardando preferencias:', e);
    }
  }
};
