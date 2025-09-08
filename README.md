# Markdown2PDF MCP Server (markdown2pdf-mcp)

An MCP server for converting Markdown documents to PDF files. This server provides a simple and efficient way to generate PDFs from Markdown content with support for syntax highlighting and custom styling. Also allows for watermarking on page 1.

Inspired by Alan Shaw's [markdown-pdf](https://github.com/alanshaw/markdown-pdf).

## Quick Start

**Package:** `@99xio/markdown2pdf-mcp@2.1.5`

**Install and run:**

```bash
npx @99xio/markdown2pdf-mcp
```

**MCP Configuration:**

```json
{
  "mcpServers": {
    "markdown2pdf": {
      "command": "npx",
      "args": ["@99xio/markdown2pdf-mcp"],
      "env": {
        "M2P_OUTPUT_DIR": "/path/to/output/directory"
      }
    }
  }
}
```

## Features

- Convert Markdown to PDF with a single command
- Syntax highlighting for code blocks
- Custom CSS styling for PDF output
- Support for standard Markdown formatting
- Mermaid diagram rendering
- Modern PDF generation using Chrome's rendering engine
- Excellent support for modern web features and fonts
- Reliable resource loading and rendering

## Limitations

The following markdown elements are not supported:

- LaTeX math equations (e.g., `$x^2$` or `$$\sum_{i=1}^n x_i$$`)
- Complex mathematical formulas or scientific notation

Stick to these supported markdown elements:

- Headers (all levels)
- Text formatting (bold, italic, strikethrough)
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Tables
- Blockquotes
- Links
- Images (both local files and external URLs)
- Task lists
- Mermaid diagrams

### Mermaid Diagrams

To render a Mermaid diagram, use a `mermaid` code block:

´´´markdown

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

´´´

If there is a syntax error in your diagram, the error message will be rendered in the PDF, helping you to debug it.

## Installation (from source)

```bash
# Clone the repository
git clone https://github.com/2b3pro/markdown2pdf-mcp.git

# Navigate to the project directory
cd markdown2pdf-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Installation (via npm)

```bash
# Install globally
npm install -g @99xio/markdown2pdf-mcp

# Or use with npx (no installation needed)
npx @99xio/markdown2pdf-mcp
```

## Usage

### Starting the Server

```bash
# Using npx (recommended)
npx @99xio/markdown2pdf-mcp

# Or if installed globally
@99xio/markdown2pdf-mcp

# Or from source
npm start
```

### Using the MCP Tools

The server provides two tools for converting markdown to PDF:

#### 1. `create_pdf_from_markdown`

Convert markdown content directly to PDF with the following parameters:

```typescript
{
  // Required parameters
  markdown: string;    // Markdown content to convert

  // Optional parameters with defaults
  outputFilename?: string;  // Filename for the PDF (e.g., "output.pdf")
  paperFormat?: string;     // 'letter' (default), 'a4', 'a3', 'a5', 'legal', 'tabloid'
  paperOrientation?: string; // 'portrait' (default), 'landscape'
  paperBorder?: string;     // '2cm' (default), accepts decimal values with CSS units (e.g., '1.5cm', '2.5mm', '0.5in', '10.5px')
  watermark?: string;       // Optional watermark text (max 15 characters, uppercase)
}
```

#### 2. `create_pdf_from_markdown_file`

Convert a markdown file to PDF by providing the file path with the following parameters:

```typescript
{
  // Required parameters
  filePath: string;    // Path to the markdown file to convert

  // Optional parameters with defaults
  outputFilename?: string;  // Filename for the PDF (e.g., "output.pdf")
  paperFormat?: string;     // 'letter' (default), 'a4', 'a3', 'a5', 'legal', 'tabloid'
  paperOrientation?: string; // 'portrait' (default), 'landscape'
  paperBorder?: string;     // '2cm' (default), accepts decimal values with CSS units (e.g., '1.5cm', '2.5mm', '0.5in', '10.5px')
  watermark?: string;       // Optional watermark text (max 15 characters, uppercase)
}
```

### Examples

Example with `create_pdf_from_markdown` (direct content):

```typescript
await use_mcp_tool({
  server_name: "markdown2pdf",
  tool_name: "create_pdf_from_markdown",
  arguments: {
    markdown: "# Hello World\n\nThis is a test document.",
    outputFilename: "output.pdf",
    paperFormat: "a4",
    paperOrientation: "landscape",
    paperBorder: "1.5cm",
    watermark: "DRAFT",
  },
});
```

Example with `create_pdf_from_markdown_file` (from file):

```typescript
await use_mcp_tool({
  server_name: "markdown2pdf",
  tool_name: "create_pdf_from_markdown_file",
  arguments: {
    filePath: "/path/to/your/document.md",
    outputFilename: "output.pdf",
    paperFormat: "a4",
    paperOrientation: "landscape",
    paperBorder: "1.5cm",
    watermark: "DRAFT",
  },
});
```

Example minimal usage (direct content):

```typescript
await use_mcp_tool({
  server_name: "markdown2pdf",
  tool_name: "create_pdf_from_markdown",
  arguments: {
    markdown: "# Hello World\n\nThis is a test document.",
    outputFilename: "output.pdf",
  },
});
```

Example minimal usage (from file):

```typescript
await use_mcp_tool({
  server_name: "markdown2pdf",
  tool_name: "create_pdf_from_markdown_file",
  arguments: {
    filePath: "/path/to/your/document.md",
  },
});
```

## Configuration

### Output Directory

You can configure the output directory in your MCP settings file for apps that use MCP such as Cline or Claude. If not configured, it will save files to $HOME:

```json
{
  "mcpServers": {
    "markdown2pdf": {
      "command": "npx",
      "args": ["@99xio/markdown2pdf-mcp@2.1.5"],
      "env": {
        "M2P_OUTPUT_DIR": "/path/to/output/directory"
      }
    }
  }
}
```

**Alternative configurations:**

Using latest version:

```json
{
  "mcpServers": {
    "markdown2pdf": {
      "command": "npx",
      "args": ["@99xio/markdown2pdf-mcp"],
      "env": {
        "M2P_OUTPUT_DIR": "/path/to/output/directory"
      }
    }
  }
}
```

Using global installation:

```json
{
  "mcpServers": {
    "markdown2pdf": {
      "command": "@99xio/markdown2pdf-mcp",
      "env": {
        "M2P_OUTPUT_DIR": "/path/to/output/directory"
      }
    }
  }
}
```

Using local build (from source):

```json
{
  "mcpServers": {
    "markdown2pdf": {
      "command": "node",
      "args": ["/path/to/markdown2pdf-mcp/build/index.js"],
      "env": {
        "M2P_OUTPUT_DIR": "/path/to/output/directory"
      }
    }
  }
}
```

The tool automatically handles file name conflicts by appending incremental numbers (e.g., output.pdf, output-1.pdf, output-2.pdf).

## Dependencies

- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) - MCP SDK for server implementation
- [remarkable](https://github.com/jonschlinkert/remarkable) - Markdown parser
- [highlight.js](https://github.com/highlightjs/highlight.js) - Syntax highlighting
- [puppeteer](https://github.com/puppeteer/puppeteer) - Modern PDF generation using [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing/) (v131.0.6778.204)

## Chrome Version

This package uses Chrome v131.0.6778.204 for consistent PDF generation across all installations. This version is automatically installed when you run `npm install`.

- [tmp](https://github.com/raszi/node-tmp) - Temporary file handling

## Development

```bash
# Build the project
npm run build

# Start the server
npm start
```

## Publishing

This package uses automated publishing via GitHub Actions. To publish a new version:

1. **Update the version** in `package.json`:

   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. **Create and push a version tag**:

   ```bash
   git push origin main
   git push origin --tags
   ```

3. **The GitHub Action will automatically**:
   - Build the project
   - Run tests
   - Verify build output
   - Publish to npm
   - Generate a release summary

### Manual Publishing

If you need to publish manually:

```bash
# Make sure you're logged in to npm
npm login

# Build and publish
npm run build
npm publish
```

### NPM Token Setup

For automated publishing, you need to set up an `NPM_TOKEN` secret in your GitHub repository:

1. Go to [npmjs.com](https://www.npmjs.com) and create an access token
2. In your GitHub repository, go to Settings → Secrets and variables → Actions
3. Add a new secret named `NPM_TOKEN` with your npm access token

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
