<script id="ui-script">
// ============================================
// Single Responsibility: UI State Management
// ============================================

class UIManager {
  constructor() {
    this.elements = {
      menuBtn: document.getElementById('menuBtn'),
      closeBtn: document.getElementById('closeBtn'),
      menuDropdown: document.getElementById('menuDropdown'),
      statusText: document.getElementById('statusText'),
      statusInfo: document.getElementById('statusInfo'),
      spellPanel: document.getElementById('spellPanel')
    };
    
    this.init();
  }

  init() {
    this.setupMenuToggle();
    this.setupCloseButton();
    this.setupClickOutside();
  }

  setupMenuToggle() {
    this.elements.menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });
  }

  setupCloseButton() {
    this.elements.closeBtn.addEventListener('click', () => {
      if (confirm('Close this tab? Unsaved changes are auto-saved locally.')) {
        // Close current tab or window
        window.close();
      }
    });

    // Keyboard shortcut Ctrl+W to close
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        if (confirm('Close this tab?')) {
          window.close();
        }
      }
    });
  }

  setupClickOutside() {
    document.addEventListener('click', (e) => {
      if (!this.elements.menuDropdown.contains(e.target)) {
        this.closeMenu();
      }
      if (!this.elements.spellPanel.contains(e.target)) {
        this.closeSpellPanel();
      }
    });
  }

  toggleMenu() {
    this.elements.menuDropdown.classList.toggle('active');
    this.elements.menuBtn.classList.toggle('active');
  }

  closeMenu() {
    this.elements.menuDropdown.classList.remove('active');
    this.elements.menuBtn.classList.remove('active');
  }

  closeSpellPanel() {
    this.elements.spellPanel.classList.remove('active');
  }

  updateStatus(message) {
    this.elements.statusText.textContent = message;
  }

  updateWordCount(words, chars) {
    this.elements.statusInfo.textContent = `${words} words, ${chars} chars`;
  }
}
</script>


