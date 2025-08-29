import fs from 'fs';
import path from 'path';

describe('markdown2pdf-mcp package', () => {

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
    expect(fs.existsSync('./build/runnings.js')).toBe(true);
  });

  test('built index.js should be executable', () => {
    const stats = fs.statSync('./build/index.js');
    expect(stats.mode & parseInt('755', 8)).toBeTruthy();
  });

  test('built index.js should have shebang', () => {
    const content = fs.readFileSync('./build/index.js', 'utf8');
    expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
  });

  test('source TypeScript files should exist', () => {
    expect(fs.existsSync('./src/index.ts')).toBe(true);
    expect(fs.existsSync('./src/css/pdf.css')).toBe(true);
    expect(fs.existsSync('./src/puppeteer/render.js')).toBe(true);
  });
});
