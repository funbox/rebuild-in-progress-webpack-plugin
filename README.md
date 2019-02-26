# @funboxteam/rebuild-in-progress-webpack-plugin

## Description

Sometimes external programs want to know the project building state.

E.g. it's important to know it during tests running (especially E2E), because we should start testing after webpack's building stage.

To solve this problem **RebuildInProgress** plugin was created.

It creates the file `node_modules/.rebuildInProgress` when webpack starts to build and removes it afterwards. 

File name can be set during plugin initialization. 

Using this file external programs can understand that the bundle building is over.

## Usage

Add the plugin in `plugins` array as usual:

```javascript
var RebuildInProgressPlugin = require('@funboxteam/rebuild-in-progress-webpack-plugin');

module.exports = {
  plugins: [
    new RebuildInProgressPlugin()
  ]
}
```

Set filename if you need to:

```javascript
var RebuildInProgressPlugin = require('@funboxteam/rebuild-in-progress-webpack-plugin');
const rebuildInProgressFile = 'node_modules/.alternativeName';

module.exports = {
  plugins: [
    new RebuildInProgressPlugin(rebuildInProgressFile)
  ]
}
```

## Build state watching

```javascript
const rebuildInProgressFile = 'node_modules/.rebuildInProgress';

fs.watch(path.dirname(rebuildInProgressFile), (eventType, filename) => {
  if (eventType === 'rename' && filename === path.basename(rebuildInProgressFile)) {
    if (fs.existsSync(rebuildInProgressFile)) {
      // Build has been started
    } else {
      // Build has been completed
    }
  }
});
```
