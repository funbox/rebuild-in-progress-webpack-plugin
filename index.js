const fs = require('fs');

class RebuildInProgressPlugin {
  constructor(filePath) {
    this.filePath = filePath;
  }

  apply(compiler) {
    compiler.plugin('compilation', () => {
      fs.writeFileSync(this.filePath, '');
      console.log('[RebuildInProgressPlugin] File has been created: %s', this.filePath);
    });
    compiler.plugin('done', () => {
      fs.unlinkSync(this.filePath);
      console.log('[RebuildInProgressPlugin] File has been removed: %s', this.filePath);
    });
  };
}

module.exports = RebuildInProgressPlugin;
