# Minimal Notepad

A clean, distraction-free notepad application with real-time auto-save, intelligent spell checking, customizable fonts, and zoom controls. Built with a focus on simplicity and writing experience.

![Screenshot](https://github.com/Shaikhabdulh/minimal-notepad/raw/main/screenshot.png)

## ✨ Features

- **🎨 Ultra-Slim Design**: Bezel-less interface with minimal borders for maximum focus
- **💾 Real-time Auto-save**: Automatically saves your work every 2 seconds
- **✓ Intelligent Spell Checking**: Right-click on any word to check spelling and get definitions
- **🔤 Font Customization**: Choose from multiple fonts
- **🔍 Zoom Controls**: Zoom in/out with keyboard shortcuts or mouse wheel
- **📁 Multi-Tab Support**: Work on multiple files simultaneously
- **📊 Floating Status Bar**: Glassmorphic floating status indicators that stay out of your way
- **📝 File Operations**: Create, open, save, and download files
- **📈 Word/Character Count**: Real-time display of word and character count
- **🌐 Web-Based**: Works directly in any modern browser

## 🚀 Quick Start

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shaikhabdulh/minimal-notepad.git
   cd minimal-notepad
   ```

2. **Open in browser**:
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

## 📖 Usage Guide

### Basic Operations

- **Typing**: Simply start typing in the editor
- **Auto-save**: Your work is automatically saved to browser storage every 2 seconds
- **File Operations**: Click the three-dot menu (⋮) in the top-right corner

### Tab Management

- **New Tab**: Click the menu → "New Tab" or use the menu
- **Switch Tabs**: Click on any tab to switch
- **Close Tab**: Click the × button on the tab

### Zoom Controls

#### Using Buttons
1. Click the three-dot menu (⋮) in the top-right corner
2. Use the zoom controls:
   - **+**: Zoom in
   - **−**: Zoom out
   - **⊡**: Reset to 100%

#### Keyboard Shortcuts
- **Windows/Linux**: `Ctrl` + `+` (zoom in), `Ctrl` + `-` (zoom out), `Ctrl` + `0` (reset)
- **macOS**: `Cmd` + `+` (zoom in), `Cmd` + `-` (zoom out), `Cmd` + `0` (reset)

#### Mouse Wheel
- Hold `Ctrl` (Windows/Linux) or `Cmd` (macOS) and scroll up/down to zoom

### Font Customization

1. Click the three-dot menu (⋮) in the top-right corner
2. Select your preferred font from the dropdown
3. Your preference is automatically saved to browser storage

### Spell Checking

1. Enable spell check from the three-dot menu
2. Right-click on any word to:
   - Check spelling
   - View definitions
   - Get spelling suggestions for misspelled words

## 📁 Project Structure

```
minimal-notepad/
├── index.html           # Main HTML structure with embedded CSS and JS
├── css/
│   └── style.css       # All styling (embedded in index.html)
├── js/
│   ├── config.js       # Configuration constants
│   ├── storage.js      # LocalStorage management
│   ├── ui.js           # UI state management
│   ├── tabs.js         # Tab management
│   ├── editor.js       # Editor content management
│   ├── spell-checker.js # Spell checking functionality
│   ├── zoom.js         # Zoom controls
│   ├── file-handler.js # File operations
│   └── app.js          # Application initialization
├── README.md           # This file
├── LICENSE             # MIT License
└── .gitignore         # Git ignore rules
```

## 🏗️ Architecture & SOLID Principles

This project follows **SOLID principles** for clean, maintainable code:

### Single Responsibility Principle (SRP)
Each class has one specific responsibility:
- `StorageManager`: Handles localStorage operations
- `UIManager`: Manages UI state and interactions
- `TabManager`: Handles tab creation and switching
- `EditorManager`: Manages editor content
- `SpellChecker`: Handles spell checking functionality
- `ZoomManager`: Controls zoom operations
- `FileHandler`: Manages file operations
- `NotepadApp`: Coordinates all components

### Open/Closed Principle (OCP)
- Classes are open for extension but closed for modification
- New features can be added through new classes without modifying existing ones

### Liskov Substitution Principle (LSP)
- All manager classes follow consistent interfaces
- Methods return predictable types

### Interface Segregation Principle (ISP)
- Minimal, focused interfaces
- No class is forced to implement unused methods

### Dependency Inversion Principle (DIP)
- High-level modules don't depend on low-level modules
- Dependencies are injected through constructors

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: [Free Dictionary API](https://dictionaryapi.dev/) for spell checking
- **Storage**: Browser LocalStorage API
- **Design**: Glassmorphism, minimal borders, floating UI elements

## 🎨 Design Philosophy

### Ultra-Slim Interface
- **Bezel-less Design**: Minimal borders (0.5px) for a modern, clean look
- **32px Header**: Ultra-slim header with only essential controls
- **Floating Status Bar**: Glassmorphic pills that float above the content
- **Focus on Writing**: Maximum space dedicated to the editor

### Glassmorphism
- Semi-transparent backgrounds with backdrop blur
- Subtle borders and shadows
- Hover effects for better interaction feedback

## 🔌 API Integration

### Dictionary API Usage

**Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/<word>`

**Features**:
- Free to use, no API key required
- Provides definitions, phonetics, examples
- Data sourced from Wiktionary
- Non-commercial use license

**Implementation**:
1. Word extraction from cursor position
2. Asynchronous GET request to API
3. Response parsing and UI rendering
4. Error handling for network issues

## 💾 Storage & Persistence

### LocalStorage Data
- **Tabs**: `notepad_tabs` - All open tabs with content
- **Active Tab**: `notepad_active_tab` - Currently selected tab
- **Font**: `notepad_font` - User's font preference
- **Zoom**: `notepad_zoom` - Current zoom level

### File Operations
- Supports `.txt`, `.md`, `.note` file formats
- UTF-8 encoding for international characters
- Browser file system APIs for open/download

## 🔒 Security Considerations

- No remote code execution
- All data stored locally in browser
- API calls only to trusted dictionary API
- No user data tracking or transmission
- No external dependencies loaded from CDNs

## ⚡ Performance Optimization

### Memory Efficiency
- Debounced auto-save (2-second delay)
- Efficient DOM manipulation
- Minimal re-renders
- Lazy loading of resources

### Code Organization
- Modular JavaScript architecture
- Clear separation of concerns
- No global namespace pollution
- Event delegation where appropriate

## 🤝 AI Contributors

This project was developed with significant contributions from AI assistants:

### Claude (Anthropic)
**Model**: Claude Sonnet 4.5  
**Contribution Date**: November 2024

Claude contributed to:
- **Code Refactoring**: Implemented SOLID principles throughout the codebase
- **Architecture Design**: Modular, class-based structure with clear separation of concerns
- **UI/UX Enhancement**: Ultra-slim bezel-less design with glassmorphic floating elements
- **Code Organization**: Separated CSS and JavaScript into logical, maintainable modules
- **Documentation**: Comprehensive inline comments and README updates
- **Best Practices**: Modern ES6+ JavaScript patterns and CSS custom properties

**About Claude Sonnet 4.5**:
Claude is an advanced AI assistant created by Anthropic, designed to be helpful, harmless, and honest. The Sonnet 4.5 model excels at:
- Understanding and applying software engineering principles
- Writing clean, maintainable code
- Providing thoughtful architecture recommendations
- Creating user-friendly interfaces
- Generating comprehensive documentation

Claude's contribution was instrumental in transforming the codebase to follow industry best practices while maintaining simplicity and usability.

---

### GLM-4.6 (Z.ai)
**Initial Development**: Version 1.0.0

GLM-4.6 contributed to:
- **Initial Architecture**: Overall application structure
- **Core Functionality**: Basic notepad features
- **API Integration**: Dictionary API implementation
- **Cross-platform Support**: Electron-based desktop version
- **Documentation**: Initial guides and technical docs

**About GLM-4.6**:
GLM-4.6 is a state-of-the-art language model trained on diverse data, capable of understanding and generating human-like text across multiple domains.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- **🐛 Bug Reports**: Open an issue with detailed description
- **💡 Feature Requests**: Suggest improvements via issues
- **🔧 Code Contributions**: Submit pull requests
- **📚 Documentation**: Help improve guides and docs
- **🌍 Translations**: Add support for new languages

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/Shaikhabdulh/minimal-notepad.git
   cd minimal-notepad
   ```
3. **Make changes** and test in your browser
4. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
5. **Push and create Pull Request**:
   ```bash
   git push origin your-branch-name
   ```

### Code Style Guidelines

- Follow existing SOLID principles
- Use ES6+ features
- Add JSDoc comments for functions
- Maintain consistent indentation (2 spaces)
- Use semantic HTML elements
- Keep CSS variables in `:root`

## 🐛 Troubleshooting

### Common Issues

#### Content Not Saving
- Check browser's localStorage quota
- Clear browser cache if storage is full
- Ensure JavaScript is enabled

#### Spell Check Not Working
- Verify internet connection
- Check browser console for errors
- Test API: `curl https://api.dictionaryapi.dev/api/v2/entries/en/hello`

#### Zoom Not Working
- Check browser supports CSS transforms
- Try keyboard shortcuts: `Ctrl/Cmd + 0` to reset
- Clear browser cache and reload

#### Tabs Not Appearing
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`
- Refresh the page

## 📊 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full Support |
| Firefox | 88+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 90+     | ✅ Full Support |
| Opera   | 76+     | ✅ Full Support |

## 🙏 Acknowledgments

- [Dictionary API](https://dictionaryapi.dev/) - Free dictionary service
- [Wiktionary](https://www.wiktionary.org/) - Dictionary data source
- [Claude (Anthropic)](https://www.anthropic.com/) - AI development assistance (Nov 2024)
- [GLM-4.6 (Z.ai)](https://z.ai/) - Initial AI development assistance
- All contributors who have helped improve this project

## 📝 Version History

### v1.0.0 (Current - November 2024)
- Basic notepad functionality
- Auto-save feature
- Spell checking with API
- Font support
- Zoom controls
- Electron-based desktop builds
- ✨ Complete code refactoring with SOLID principles
- 🎨 Ultra-slim bezel-less design
- 💎 Glassmorphic floating status bar
- 📦 Modular JavaScript architecture
- 🚀 Improved performance and code organization
- 📚 Enhanced documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Repository**: [github.com/Shaikhabdulh/minimal-notepad](https://github.com/Shaikhabdulh/minimal-notepad)
- **Issues**: [GitHub Issues](https://github.com/Shaikhabdulh/minimal-notepad/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Shaikhabdulh/minimal-notepad/discussions)

---

**Thank you for using Minimal Notepad!** ✨

If you find this application useful, please consider:
- ⭐ Starring the repository on GitHub
- 🐛 Reporting any bugs you encounter
- 💡 Suggesting features you'd like to see
- 🤝 Contributing to the project
- 📢 Sharing with others who might find it useful

**Made with ❤️ and AI assistance**
