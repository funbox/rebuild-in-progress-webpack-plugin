# @funboxteam/rebuild-in-progress-webpack-plugin

[![npm](https://img.shields.io/npm/v/@funboxteam/rebuild-in-progress-webpack-plugin.svg)](https://www.npmjs.com/package/@funboxteam/rebuild-in-progress-webpack-plugin)

Webpack plugin that creates the file indicator at the beginning of the build and deletes it at the end.

[По-русски](./README.ru.md)

## Rationale

Sometimes external programs have to know the project building state. E.g. it's important to have this knowledge for 
tests running (especially E2E), because testing should be started when the project is completely built.

To solve this problem **RebuildInProgress** plugin was created. It creates the file `node_modules/.rebuildInProgress` 
when webpack starts to build the project and removes it at the end. 

## Usage

Add the plugin in `plugins` array as usual:

```javascript
const RebuildInProgressPlugin = require('@funboxteam/rebuild-in-progress-webpack-plugin');

module.exports = {
  plugins: [
    new RebuildInProgressPlugin()
  ]
}
```

Set the path to the file if the default one isn't suitable:

```javascript
const RebuildInProgressPlugin = require('@funboxteam/rebuild-in-progress-webpack-plugin');
const rebuildInProgressPath = 'node_modules/.alternativeName';

module.exports = {
  plugins: [
    new RebuildInProgressPlugin(rebuildInProgressPath)
  ]
}
```

## Build state watching

Here's an example of watching for build state using 
[`fs`]((https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener)):

```javascript
const fs = require('fs');
const rebuildInProgressPath = 'node_modules/.rebuildInProgress';

fs.watch(path.dirname(rebuildInProgressPath), (eventType, filename) => {
  if (eventType === 'rename' && filename === path.basename(rebuildInProgressPath)) {
    if (fs.existsSync(rebuildInProgressPath)) {
      // Build has been started
    } else {
      // Build has been completed
    }
  }
});
```

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
