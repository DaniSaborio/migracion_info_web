// Adaptador Local-First seguro para Next.js (SSR safe)
const STORAGE_KEYS = {
  CHECKLISTS: 'portal_migrante_checklists',
  PREFERENCES: 'portal_migrante_preferencias'
};

export const Storage = {
  getChecklists() {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHECKLISTS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getGuideChecklist(guideId) {
    const all = this.getChecklists();
    return all[guideId] || [];
  },

  toggleItem(guideId, itemId) {
    if (typeof window === 'undefined') return [];
    try {
      const all = this.getChecklists();
      if (!all[guideId]) all[guideId] = [];
      const idx = all[guideId].indexOf(itemId);
      if (idx === -1) {
        all[guideId].push(itemId);
      } else {
        all[guideId].splice(idx, 1);
      }
      localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(all));
      return all[guideId];
    } catch {
      return [];
    }
  },

  resetGuideChecklist(guideId) {
    if (typeof window === 'undefined') return [];
    try {
      const all = this.getChecklists();
      all[guideId] = [];
      localStorage.setItem(STORAGE_KEYS.CHECKLISTS, JSON.stringify(all));
      return [];
    } catch {
      return [];
    }
  },

  getPreferences() {
    if (typeof window === 'undefined') return { fontLarge: false, highContrast: false };
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return data ? JSON.parse(data) : { fontLarge: false, highContrast: false };
    } catch {
      return { fontLarge: false, highContrast: false };
    }
  },

  setPreferences(prefs) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch {}
  }
};
