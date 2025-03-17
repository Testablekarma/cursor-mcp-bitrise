# Cursor MCP for Bitrise

A Mission Control Panel integration for Bitrise CI/CD platform that can be used with Cursor IDE. This integration allows you to monitor and manage your Bitrise builds directly from Cursor.

## Features

- Get build status and details
- View build logs
- List all your Bitrise apps
- Abort running builds
- Monitor latest builds

## Setup

1. Install the package:
```bash
npm install cursor-mcp-bitrise
```

2. Create a `.env` file in your project root and add your Bitrise access token:
```bash
BITRISE_ACCESS_TOKEN=your_bitrise_token_here
```

To get your Bitrise access token:
1. Log in to Bitrise
2. Go to your Account Settings
3. Select Security
4. Generate a new token or use an existing one

## Usage in Cursor

1. Import the MCP in your Cursor configuration:

```javascript
const CursorBitriseMCP = require('cursor-mcp-bitrise');
const bitriseMcp = new CursorBitriseMCP();
```

2. Available methods:

```javascript
// Get build status
const status = await bitriseMcp.getBuildStatus({
  appSlug: 'your-app-slug',
  buildSlug: 'build-slug' // Optional, if not provided will get latest build
});

// Get build logs
const logs = await bitriseMcp.getBuildLog({
  appSlug: 'your-app-slug',
  buildSlug: 'build-slug'
});

// List all apps
const apps = await bitriseMcp.listApps();

// Abort a build
const result = await bitriseMcp.abortBuild({
  appSlug: 'your-app-slug',
  buildSlug: 'build-slug'
});
```

## Response Format

All methods return a response in the following format:

```javascript
{
  success: boolean,
  data?: any,
  error?: string
}
```

## Error Handling

The MCP includes built-in error handling and will return appropriate error messages when something goes wrong. All API calls are wrapped in try-catch blocks to ensure graceful error handling.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT