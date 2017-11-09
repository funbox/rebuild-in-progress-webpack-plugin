# funbox-rebuild-in-progress-webpack-plugin

## Description

Sometimes external programs want to know the project building state.

E.g. it's important to know it during tests running (especially E2E), because we should start testing after webpack's building stage.

To solve this problem **RebuildInProgress** plugin was created.

It creates the file `node_modules/.rebuildInProgress` when webpack starts to build and removes it afterwards. 

Using this file external programs can understand that the bundle building is over.

## Usage

Add the plugin in `plugins` array as usual:

```javascript
var RebuildInProgressPlugin = require('funbox-rebuild-in-progress-webpack-plugin');

module.exports = {
  plugins: [
    new RebuildInProgressPlugin()
  ]
}
```
