const fs = require('fs');
const path = require('path');

class RebuildInProgressPlugin {
  constructor(filePath) {
    this.filePath = filePath || this.getDefaultRebuildInProgressStatusFile();
  }

  getDefaultRebuildInProgressStatusFile() {
    return path.resolve('node_modules/.rebuildInProgress');
  }

  apply(compiler) {
    compiler.hooks.compile.tap('RebuildInProgressPlugin', () => {
      fs.writeFileSync(this.filePath, '');
      console.log('[RebuildInProgressPlugin] File has been created: %s', this.filePath);
    });
    compiler.hooks.done.tap('RebuildInProgressPlugin', () => {
      fs.unlinkSync(this.filePath);
      console.log('[RebuildInProgressPlugin] File has been removed: %s', this.filePath);
    });
  };
}

module.exports = RebuildInProgressPlugin;
