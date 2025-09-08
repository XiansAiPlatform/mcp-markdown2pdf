# Publishing to npm

This document explains how to publish a new version of the `@99xio/markdown2pdf-mcp` package to npm.

## Publishing Process

The publishing process is automated via GitHub Actions and is triggered by creating and pushing a git tag with a version number.

### Steps to Publish

1. **Update your code** and ensure all changes are committed and pushed to the main branch.

2. **Create a version tag** using one of these methods:

   **Option A: Using npm version (recommended)**
   ```bash
   # Patch version (1.0.0 → 1.0.1)
   npm version patch

   # Minor version (1.0.1 → 1.1.0)
   npm version minor

   # Major version (1.1.0 → 2.0.0)
   npm version major
   ```

   **Option B: Manual git tag**
   ```bash
   # Create and push a version tag manually
   git tag v1.0.1
   git push origin v1.0.1
   ```

3. **Push the tag** to trigger the GitHub Action:
   ```bash
   git push origin --tags
   ```

### What Happens Automatically

When you push a version tag (e.g., `v1.0.1`), the GitHub Action will:

- ✅ Extract the version from the tag
- ✅ Validate the version format (X.Y.Z or X.Y.Z-suffix)
- ✅ Update `package.json` with the new version
- ✅ Install dependencies and build the package
- ✅ Run tests to ensure everything works
- ✅ Verify build output is complete
- ✅ Test the npx command
- ✅ Publish to npm with public access
- ✅ Generate a build summary with usage instructions

### Version Format

The version must follow semantic versioning:
- `1.2.3` (standard release)
- `1.2.3-beta` (pre-release with suffix)

### Manual Trigger

You can also manually trigger the publish workflow from the GitHub Actions tab if needed.

### After Publishing

Once published, users can install and use the package:

```bash
# Install globally
npm install -g @99xio/markdown2pdf-mcp@latest

# Or use with npx
npx @99xio/markdown2pdf-mcp@latest
```

### MCP Configuration

Users can configure it in their MCP settings:
```json
{
  "mcpServers": {
    "markdown2pdf": {
      "command": "npx",
      "args": ["@99xio/markdown2pdf-mcp@latest"],
      "env": {
        "M2P_OUTPUT_DIR": "/path/to/output/directory"
      }
    }
  }
}
```
