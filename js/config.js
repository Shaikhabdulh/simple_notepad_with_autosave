// ============================================
// FILE: js/config.js
// Single Responsibility: Application Configuration
// ============================================

const CONFIG = {
  ZOOM: {
    MIN: 0.5,
    MAX: 2.0,
    STEP: 0.1,
    DEFAULT: 1.0
  },
  STORAGE: {
    TABS_KEY: 'notepad_tabs',
    ACTIVE_TAB_KEY: 'notepad_active_tab',
    FONT_KEY: 'notepad_font',
    ZOOM_KEY: 'notepad_zoom'
  },
  AUTOSAVE: {
    DELAY: 2000
  },
  DEFAULTS: {
    FONT: "'Courier New', monospace",
    TAB_NAME: 'Untitled'
  },
  API: {
    DICTIONARY: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
  }
};
