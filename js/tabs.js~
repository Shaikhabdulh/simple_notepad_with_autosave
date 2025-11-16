<script id="tabs-script">
// ============================================
// Single Responsibility: Tab Management
// ============================================

class TabManager {
  constructor(onTabChange) {
    this.tabs = [];
    this.activeTabId = null;
    this.onTabChange = onTabChange;
    this.container = document.getElementById('tabsBar');
  }

  createTab(fileName = null, content = '') {
    const id = Date.now();
    const name = fileName || CONFIG.DEFAULTS.TAB_NAME;

    const tabElement = this.createTabElement(id, name);
    this.container.appendChild(tabElement);

    const tab = {
      id,
      fileName: name,
      content,
      element: tabElement
    };

    this.tabs.push(tab);
    this.setActiveTab(id);
    
    return id;
  }

  createTabElement(id, name) {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.dataset.tabId = id;

    const label = document.createElement('span');
    label.className = 'tab-label';
    label.textContent = name;

    const closeBtn = document.createElement('span');
    closeBtn.className = 'tab-close';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeTab(id);
    });

    tab.appendChild(label);
    tab.appendChild(closeBtn);

    tab.addEventListener('click', () => this.setActiveTab(id));

    return tab;
  }

  setActiveTab(id) {
    const tab = this.tabs.find(t => t.id === id);
    if (!tab) return;

    if (this.activeTabId && this.onTabChange) {
      const currentTab = this.tabs.find(t => t.id === this.activeTabId);
      if (currentTab) {
        currentTab.content = this.onTabChange('save');
      }
    }

    this.activeTabId = id;

    this.tabs.forEach(t => t.element.classList.remove('active'));
    tab.element.classList.add('active');

    if (this.onTabChange) {
      this.onTabChange('load', tab);
    }
  }

  closeTab(id) {
    const index = this.tabs.findIndex(t => t.id === id);
    if (index === -1) return;

    const tab = this.tabs[index];
    tab.element.remove();
    this.tabs.splice(index, 1);

    if (this.activeTabId === id) {
      if (this.tabs.length > 0) {
        const newIndex = index < this.tabs.length ? index : index - 1;
        this.setActiveTab(this.tabs[newIndex].id);
      } else {
        this.createTab();
      }
    }
  }

  getCurrentTab() {
    return this.tabs.find(t => t.id === this.activeTabId);
  }

  updateCurrentTabContent(content) {
    const tab = this.getCurrentTab();
    if (tab) {
      tab.content = content;
    }
  }

  getAllTabs() {
    return this.tabs;
  }
}
</script>


