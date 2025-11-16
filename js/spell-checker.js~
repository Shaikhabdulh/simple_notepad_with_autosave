<script id="spell-checker-script">
// ============================================
// Single Responsibility: Spell Checking
// ============================================

class SpellChecker {
  constructor(editor) {
    this.editor = editor;
    this.enabled = false;
    this.panel = document.getElementById('spellPanel');
    this.content = document.getElementById('spellContent');
    
    this.init();
  }

  init() {
    this.editor.textarea.addEventListener('contextmenu', (e) => {
      if (this.enabled) {
        e.preventDefault();
        this.handleContextMenu(e);
      }
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    const label = document.getElementById('spellCheckLabel');
    label.textContent = this.enabled ? 'Disable Spell Check' : 'Enable Spell Check';
    return this.enabled;
  }

  async handleContextMenu(event) {
    const wordData = this.editor.getWordAtCursor();
    if (!wordData) return;

    this.showPanel(event.clientX, event.clientY);
    await this.checkWord(wordData);
  }

  showPanel(x, y) {
    this.content.innerHTML = '<div class="spell-loading">⟳ Checking...</div>';
    this.panel.style.left = `${x}px`;
    this.panel.style.top = `${y}px`;
    this.panel.classList.add('active');
  }

  async checkWord({ word, start, end }) {
    try {
      const response = await fetch(CONFIG.API.DICTIONARY + word);
      this.content.innerHTML = '';

      if (response.ok) {
        const data = await response.json();
        this.renderCorrectWord(word, data);
      } else {
        this.renderIncorrectWord(word, start, end);
      }
    } catch (error) {
      this.renderError();
    }
  }

  renderCorrectWord(word, data) {
    const header = document.createElement('div');
    header.className = 'spell-header correct';
    header.textContent = `"${word}" is correct`;
    this.content.appendChild(header);

    if (data[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
      const definition = document.createElement('div');
      definition.className = 'spell-definition';
      definition.textContent = data[0].meanings[0].definitions[0].definition;
      this.content.appendChild(definition);
    }
  }

  renderIncorrectWord(word, start, end) {
    const header = document.createElement('div');
    header.className = 'spell-header incorrect';
    header.textContent = `"${word}" not in dictionary`;
    this.content.appendChild(header);

    const suggestions = this.generateSuggestions(word);
    if (suggestions.length > 0) {
      const label = document.createElement('div');
      label.className = 'spell-suggestions-label';
      label.textContent = 'Suggestions:';
      this.content.appendChild(label);

      suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'spell-suggestion';
        item.textContent = suggestion;
        item.addEventListener('click', () => {
          this.editor.replaceWord(start, end, suggestion);
          this.panel.classList.remove('active');
        });
        this.content.appendChild(item);
      });
    }
  }

  renderError() {
    this.content.innerHTML = '<div class="spell-loading">Error checking word</div>';
  }

  generateSuggestions(word) {
    const suggestions = new Set();
    const letters = 'abcdefghijklmnopqrstuvwxyz';

    // Substitutions
    for (let i = 0; i < word.length; i++) {
      for (const letter of letters) {
        if (letter !== word[i].toLowerCase()) {
          suggestions.add(word.substring(0, i) + letter + word.substring(i + 1));
        }
      }
    }

    // Insertions
    for (let i = 0; i <= word.length; i++) {
      for (const letter of letters) {
        suggestions.add(word.substring(0, i) + letter + word.substring(i));
      }
    }

    // Deletions
    for (let i = 0; i < word.length; i++) {
      suggestions.add(word.substring(0, i) + word.substring(i + 1));
    }

    return Array.from(suggestions).slice(0, 5);
  }
}
</script>

