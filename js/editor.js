<script id="editor-script">
// ============================================
// Single Responsibility: Editor Content Management
// ============================================

class EditorManager {
  constructor(onInput) {
    this.textarea = document.getElementById('editorTextarea');
    this.onInput = onInput;
    this.autoSaveTimer = null;
    
    this.init();
  }

  init() {
    this.textarea.addEventListener('input', () => this.handleInput());
  }

  handleInput() {
    clearTimeout(this.autoSaveTimer);
    
    if (this.onInput) {
      this.onInput();
    }

    this.autoSaveTimer = setTimeout(() => {
      if (this.onInput) {
        this.onInput(true);
      }
    }, CONFIG.AUTOSAVE.DELAY);
  }

  getContent() {
    return this.textarea.value;
  }

  setContent(content) {
    this.textarea.value = content;
  }

  getWordCount() {
    const text = this.textarea.value;
    const words = text.trim().split(/\s+/).filter(w => w).length;
    const chars = text.length;
    return { words, chars };
  }

  setFont(font) {
    this.textarea.style.fontFamily = font;
  }

  getWordAtCursor() {
    const text = this.textarea.value;
    const start = this.textarea.selectionStart;

    let wordStart = start;
    while (wordStart > 0 && /\w/.test(text[wordStart - 1])) {
      wordStart--;
    }

    let wordEnd = start;
    while (wordEnd < text.length && /\w/.test(text[wordEnd])) {
      wordEnd++;
    }

    const word = text.substring(wordStart, wordEnd);
    return /^[a-zA-Z]+$/.test(word) ? { word, start: wordStart, end: wordEnd } : null;
  }

  replaceWord(wordStart, wordEnd, newWord) {
    const text = this.textarea.value;
    const before = text.substring(0, wordStart);
    const after = text.substring(wordEnd);
    this.textarea.value = before + newWord + after;
    this.textarea.setSelectionRange(wordStart, wordStart + newWord.length);
  }

  focus() {
    this.textarea.focus();
  }
}
</script>


