<script id="file-handler-script">
// ============================================
// Single Responsibility: File Operations
// ============================================

class FileHandler {
  constructor(editor, tabManager, ui) {
    this.editor = editor;
    this.tabManager = tabManager;
    this.ui = ui;
  }

  openFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.md,.note';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.tabManager.createTab(file.name, event.target.result);
          this.ui.updateStatus(`Opened: ${file.name}`);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  save() {
    const tabs = this.tabManager.getAllTabs();
    StorageManager.set(CONFIG.STORAGE.TABS_KEY, tabs.map(tab => ({
      id: tab.id,
      fileName: tab.fileName,
      content: tab.id === this.tabManager.activeTabId ? this.editor.getContent() : tab.content
    })));
    StorageManager.set(CONFIG.STORAGE.ACTIVE_TAB_KEY, this.tabManager.activeTabId);
    this.ui.updateStatus('Saved');
  }

  download() {
    const content = this.editor.getContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const currentTab = this.tabManager.getCurrentTab();
    const fileName = currentTab && currentTab.fileName ? currentTab.fileName : 'untitled.txt';
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    this.ui.updateStatus('Downloaded');
  }
}
</script>


