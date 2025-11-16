

# Minimal Notepad

A clean, distraction-free notepad application with real-time auto-save, intelligent spell checking, customizable system fonts, and zoom controls.

![Screenshot](https://github.com/Shaikhabdulh/minimal-notepad/raw/main/screenshot.png)

## Features

- **Clean Interface**: Minimal design with no distractions
- **Real-time Auto-save**: Automatically saves your work every 2 seconds
- **Intelligent Spell Checking**: Right-click on any word to check spelling and get definitions
- **System Font Support**: Choose from fonts installed on your system
- **Zoom Controls**: Zoom in/out with keyboard shortcuts or mouse wheel
- **File Operations**: Create, open, save, and save as files
- **Word/Character Count**: Real-time display of word and character count
- **Cross-platform**: Works on Windows, macOS, and Linux

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shaikhabdulh/minimal-notepad.git
   cd minimal-notepad
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

## Usage Guide

### Basic Operations

- **Typing**: Simply start typing in the editor
- **Auto-save**: Your work is automatically saved every 2 seconds
- **File Operations**: Access from the three-dot menu (⋮) in the top-right corner

### Zoom Controls

#### Using Buttons
1. Click the three-dot menu (⋮) in the top-right corner
2. Use the zoom controls at the bottom of the menu:
   - **Plus (+)**: Zoom in
   - **Minus (-)**: Zoom out
   - **Compress (□)**: Reset to 100%

#### Keyboard Shortcuts
- **Windows/Linux**: `Ctrl` + `+` (zoom in), `Ctrl` + `-` (zoom out), `Ctrl` + `0` (reset)
- **macOS**: `Cmd` + `+` (zoom in), `Cmd` + `-` (zoom out), `Cmd` + `0` (reset)

#### Mouse Wheel
- Hold `Ctrl` (Windows/Linux) or `Cmd` (macOS) and scroll up/down to zoom

### Font Customization

1. Click the three-dot menu (⋮) in the top-right corner
2. Select your preferred font from the dropdown list
3. Your font preference is automatically saved

### Spell Checking

1. Enable spell check from the three-dot menu
2. Right-click on any word to:
   - Check spelling
   - View definitions
   - Get spelling suggestions for misspelled words

## Building for Distribution

### Create Executable Packages

#### Windows (.exe)

```bash
# Build for Windows
npm run build-win
```

This creates:
- `minimal-notepad Setup 1.0.0.exe` - Installer with all dependencies
- `minimal-notepad-win32-x64/` - Portable version folder

#### macOS (.dmg)

```bash
# Build for macOS
npm run build-mac
```

This creates:
- `minimal-notepad-1.0.0.dmg` - Disk image for macOS
- `minimal-notepad.app` - Application bundle

#### Linux (.deb/.AppImage)

```bash
# Build for Linux
npm run build-linux
```

This creates:
- `minimal-notepad_1.0.0_amd64.deb` - Debian/Ubuntu package
- `minimal-notepad-1.0.0.AppImage` - Universal Linux executable

### Build All Platforms

```bash
# Build for all platforms
npm run build
```

All built packages will be in the `dist/` directory.

### Distribution Requirements

- Built packages are standalone and require no additional installation
- Windows: Run the installer or extract portable version
- macOS: Open the DMG and drag to Applications
- Linux: Install with package manager or run AppImage directly

## Project Structure

```
minimal-notepad/
├── main.js              # Main Electron process with font detection
├── index.html            # UI, frontend logic, and styles
├── package.json          # Project configuration and dependencies
├── README.md             # This file
├── LICENSE               # MIT License
└── .gitignore           # Git ignore rules
```

## Technology Stack

- **Framework**: [Electron.js](https://www.electronjs.org/) v13.1.7
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: [Free Dictionary API](https://dictionaryapi.dev/) for spell checking
- **Icons**: [Font Awesome](https://fontawesome.com/) v6.4.0
- **Build Tool**: [electron-builder](https://www.electron-builder.io/) v22.11.7

## Font Detection Implementation

The application uses platform-specific methods to detect system fonts:

### Windows
- Reads from Windows Registry
- Command: `reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Fonts" /s`
- Extracts font names from registry entries

### macOS
- Uses system profiler
- Command: `system_profiler SPFontsDataType | grep "name:"`
- Parses font names from system output

### Linux
- Uses fontconfig
- Command: `fc-list :family`
- Extracts font family names from fontconfig output

### Fallback Fonts
Includes common web fonts for all systems:
- Arial, Calibri, Comic Sans MS, Courier New, Georgia, Helvetica
- Impact, Lucida Console, Monaco, Menlo, Tahoma
- Times New Roman, Trebuchet MS, Verdana, and more

## API Integration Details

### Dictionary API Usage

**Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/<word>`

**Features**:
- Free to use, no API key required
- Provides definitions, phonetics, examples, synonyms, antonyms
- Data sourced from Wiktionary
- Non-commercial use license

**Implementation**:
1. Word extraction from cursor position
2. GET request to API endpoint
3. Response parsing for definitions and suggestions
4. UI updates with results or error handling

## Storage and Persistence

### Local Storage
- **Auto-save content**: `localStorage['autosave-content']`
- **Font preference**: `localStorage['selected-font']`
- **Zoom level**: `localStorage['zoom-level']`

### File Operations
- Supports `.txt`, `.md`, and `.note` file formats
- UTF-8 encoding for international characters
- File dialogs for open/save operations

## Development Guide

### Setting Up Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/Shaikhabdulh/minimal-notepad.git
   cd minimal-notepad
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run in development mode**:
   ```bash
   npm start
   ```

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature-name
   ```
2. **Make your changes** to the code
3. **Test thoroughly** on your platform
4. **Commit changes**:
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature-name
   ```
6. **Create a Pull Request** on GitHub

### Code Style Guidelines

- Use ES6+ features where appropriate
- Follow existing code patterns
- Add comments for complex functions
- Maintain consistent indentation (2 spaces)
- Use semantic HTML elements

## Configuration Options

### package.json Build Configuration

```json
"build": {
  "appId": "com.example.minimalnotepad",
  "productName": "Minimal Notepad",
  "directories": {
    "output": "dist"
  },
  "files": [
    "**/*",
    "!node_modules/electron-builder/**/*"
  ],
  "mac": {
    "category": "public.app-category.productivity",
    "target": "dmg"
  },
  "win": {
    "target": "nsis"
  },
  "linux": {
    "target": [
      "deb",
      "AppImage"
    ]
  }
}
```

### Custom Build Options

For custom builds, modify the `build` section in `package.json`:

- **Windows**: Change `target` to `"portable"` for portable exe
- **macOS**: Add `"icon": "path/to/icon.icns"` for custom icon
- **Linux**: Change target to `"rpm"` for Red Hat/Fedora packages

## Troubleshooting

### Common Issues and Solutions

#### Application Won't Start
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Check Node.js version
node --version  # Should be v12 or higher
```

#### Font Not Loading
- Ensure font is properly installed on your system
- Restart application after installing new fonts
- Check font name matches exactly (case-sensitive)

#### Spell Check Not Working
- Verify internet connection
- Test API access: `curl https://api.dictionaryapi.dev/api/v2/entries/en/hello`
- Check firewall/antivirus settings

#### Auto-save Issues
- Verify file permissions
- Check disk space
- Ensure file path exists and is writable

#### Zoom Not Working
- Check if browser supports CSS transforms
- Try keyboard shortcuts as alternative
- Reset zoom: `Ctrl/Cmd + 0`

## Performance Optimization

### Memory Usage
- Lazy loading of font lists
- Debounced auto-save (2-second delay)
- Efficient DOM manipulation
- Minimal external dependencies

### File Size Optimization
- Embedded CSS and JavaScript (no external files)
- Compressed with electron-builder
- Only necessary dependencies included

## Security Considerations

- No remote code execution
- Local file access restricted to user-selected files
- API calls only to trusted dictionary API
- No user data tracking or transmission

## AI Contribution

This project was developed with assistance from **GLM-4.6**, a large language model created by Z.ai. The AI contributed to:

- **Architecture Design**: Overall application structure and component organization
- **UI/UX Implementation**: Clean, distraction-free interface design
- **API Integration**: Dictionary API implementation with error handling
- **Font Detection**: Cross-platform font detection system
- **Zoom Functionality**: Smooth zoom controls with multiple input methods
- **Code Optimization**: Performance and memory efficiency
- **Documentation**: Comprehensive guides and technical documentation

### About GLM-4.6

GLM-4.6 is a state-of-the-art language model trained on diverse data, capable of understanding and generating human-like text across multiple domains. It excels at:

- Code generation and debugging
- Technical documentation
- UI/UX design principles
- API integration strategies
- Cross-platform development

The AI's contribution was instrumental in creating a well-structured, efficient, and user-friendly notepad application.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Ways to Contribute

- **Bug Reports**: Open an issue with detailed description
- **Feature Requests**: Suggest improvements via issues
- **Code Contributions**: Submit pull requests
- **Documentation**: Help improve guides and docs
- **Translations**: Add support for new languages

## Acknowledgments

- [Dictionary API](https://dictionaryapi.dev/) - Free dictionary service
- [Electron](https://www.electronjs.org/) - Cross-platform framework
- [Font Awesome](https://fontawesome.com/) - Icon library
- [GLM-4.6](https://z.ai/) - AI development assistance
- [Wiktionary](https://www.wiktionary.org/) - Dictionary data source

## Version History

### v1.0.0 (Current)
- Initial release
- Basic notepad functionality
- Auto-save feature
- Spell checking with API
- System font support
- Zoom controls
- Cross-platform builds

## Contact

- **Issues**: [GitHub Issues](https://github.com/Shaikhabdulh/simple_notepad_with_autosave/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Shaikhabdulh/simple_notepad_with_autosave/discussions)

---

**Thank you for using Minimal Notepad!** 🎉

If you find this application useful, please consider:
- ⭐ Starring the repository on GitHub
- 🐛 Reporting any bugs you encounter
- 💡 Suggesting features you'd like to see
- 📝 Contributing to the project
