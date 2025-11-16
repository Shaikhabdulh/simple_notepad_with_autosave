<script id="zoom-script">
// ============================================
// Single Responsibility: Zoom Management
// ============================================

class ZoomManager {
  constructor() {
    this.currentZoom = CONFIG.ZOOM.DEFAULT;
    this.wrapper = document.getElementById('editorWrapper');
    this.display = document.getElementById('zoomDisplay');
    
    this.init();
  }

  init() {
    this.loadSavedZoom();
    this.setupKeyboardShortcuts();
    this.setupMouseWheel();
  }

  loadSavedZoom() {
    const saved = StorageManager.get(CONFIG.STORAGE.ZOOM_KEY);
    if (saved) {
      this.currentZoom = saved;
      this.apply();
    }
  }

  apply() {
    this.wrapper.style.transform = `scale(${this.currentZoom})`;
    this.display.textContent = `${Math.round(this.currentZoom * 100)}%`;
    StorageManager.set(CONFIG.STORAGE.ZOOM_KEY, this.currentZoom);
  }

  zoomIn() {
    if (this.currentZoom < CONFIG.ZOOM.MAX) {
      this.currentZoom = Math.round((this.currentZoom + CONFIG.ZOOM.STEP) * 10) / 10;
      this.apply();
    }
  }

  zoomOut() {
    if (this.currentZoom > CONFIG.ZOOM.MIN) {
      this.currentZoom = Math.round((this.currentZoom - CONFIG.ZOOM.STEP) * 10) / 10;
      this.apply();
    }
  }

  reset() {
    this.currentZoom = CONFIG.ZOOM.DEFAULT;
    this.apply();
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        this.zoomIn();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        this.zoomOut();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        this.reset();
      }
    });
  }

  setupMouseWheel() {
    this.wrapper.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          this.zoomIn();
        } else {
          this.zoomOut();
        }
      }
    });
  }
}
</script>

