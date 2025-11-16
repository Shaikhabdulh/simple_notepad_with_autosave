<script id="app-script">
// ============================================
// Single Responsibility: Application Initialization & Coordination
// ============================================

class NotepadApp {
  constructor() {
    this.ui = new UIManager();
    this.editor = new EditorManager(() => this.handleEditorInput());
    this.tabManager = new TabManager((action, tab) => this.handleTabChange(action, tab));
    this.spellChecker = new SpellChecker(this.editor);
    this.zoom = new ZoomManager();
    this.fileHandler = new FileHandler(this.editor, this.tabManager, this.ui);
    
    this.init();
  }

  init() {
    this.loadPreferences();
    this.setupMenuActions();
    this.loadSavedTabs();
    this.editor.focus();
  }

  loadPreferences() {
    const savedFont = StorageManager.get(CONFIG.STORAGE.FONT_KEY);
    if (savedFont) {
      this.editor.setFont(savedFont);
      document.getElementById('fontSelect').value = savedFont;
    }
  }

  setupMenuActions() {
    document.querySelectorAll('[data-action]').forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleAction(action);
      });
    });

    document.getElementById('fontSelect').addEventListener('change', (e) => {
      const font = e.target.value || CONFIG.DEFAULTS.FONT;
      this.editor.setFont(font);
      StorageManager.set(CONFIG.STORAGE.FONT_KEY, font);
      this.ui.updateStatus('Font changed');
    });
  }

  handleAction(action) {
    const actions = {
      'new': () => {
        this.tabManager.createTab();
        this.ui.closeMenu();
      },
      'open': () => {
        this.fileHandler.openFile();
        this.ui.closeMenu();
      },
      'save': () => {
        this.fileHandler.save();
        this.ui.closeMenu();
      },
      'download': () => {
        this.fileHandler.download();
        this.ui.closeMenu();
      },
      'spell-check': () => {
        const enabled = this.spellChecker.toggle();
        this.ui.updateStatus(enabled ? 'Spell check enabled' : 'Spell check disabled');
      },
      'zoom-in': () => this.zoom.zoomIn(),
      'zoom-out': () => this.zoom.zoomOut(),
      'zoom-reset': () => this.zoom.reset()
    };

    if (actions[action]) {
      actions[action]();
    }
  }

  handleEditorInput(isAutoSave = false) {
    const { words, chars } = this.editor.getWordCount();
    this.ui.updateWordCount(words, chars);
    this.tabManager.updateCurrentTabContent(this.editor.getContent());
    
    if (isAutoSave) {
      this.fileHandler.save();
    }
  }

  handleTabChange(action, tab) {
    if (action === 'save') {
      return this.editor.getContent();
    } else if (action === 'load' && tab) {
      this.editor.setContent(tab.content);
      const { words, chars } = this.editor.getWordCount();
      this.ui.updateWordCount(words, chars);
      this.ui.updateStatus(tab.fileName);
    }
  }

  loadSavedTabs() {
    const savedTabs = StorageManager.get(CONFIG.STORAGE.TABS_KEY);
    const activeTabId = StorageManager.get(CONFIG.STORAGE.ACTIVE_TAB_KEY);

    if (savedTabs && savedTabs.length > 0) {
      savedTabs.forEach(tab => {
        this.tabManager.createTab(tab.fileName, tab.content);
      });
      
      if (activeTabId) {
        this.tabManager.setActiveTab(activeTabId);
      }
    } else {
      this.tabManager.createTab();
    }
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new NotepadApp();
});
</script>
</body>
</html>
