import { MarkdownPdfServer } from './build/index.js';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('MarkdownPdfServer', () => {
  let server;
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'markdown2pdf-test-'));
    process.env.M2P_OUTPUT_DIR = tempDir;
  });

  afterEach(async () => {
    if (server) {
      try {
        await server.server?.close();
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('should create MarkdownPdfServer instance', () => {
    server = new MarkdownPdfServer();
    expect(server).toBeInstanceOf(MarkdownPdfServer);
  });

  test('should have required server properties', () => {
    server = new MarkdownPdfServer();
    expect(server.server).toBeDefined();
  });

  test('package.json should have correct structure', () => {
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    expect(pkg.name).toBe('@99xio/markdown2pdf-mcp');
    expect(pkg.bin).toBeDefined();
    expect(pkg.bin['markdown2pdf-mcp']).toBe('build/index.js');
    expect(pkg.main).toBe('build/index.js');
  });

  test('build directory should exist with required files', () => {
    expect(fs.existsSync('./build')).toBe(true);
    expect(fs.existsSync('./build/index.js')).toBe(true);
    expect(fs.existsSync('./build/css/pdf.css')).toBe(true);
    expect(fs.existsSync('./build/puppeteer/render.js')).toBe(true);
  });

  test('built index.js should be executable', () => {
    const stats = fs.statSync('./build/index.js');
    expect(stats.mode & parseInt('755', 8)).toBeTruthy();
  });
});
