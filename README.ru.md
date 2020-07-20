# @funboxteam/rebuild-in-progress-webpack-plugin

[![npm](https://img.shields.io/npm/v/@funboxteam/rebuild-in-progress-webpack-plugin.svg)](https://www.npmjs.com/package/@funboxteam/rebuild-in-progress-webpack-plugin)

Плагин для Вебпака, создающий файл-индикатор во время сборки и удаляющий его после неё.

## Назначение

Иногда внешним программам может потребоваться знание о том, в каком состоянии находится сборка проекта. Например, 
для тестов (особенно приемочных) важно понимать, что Вебпак собрал файлы проекта и можно начинать процесс тестирования.

Для решения этой задачи был создан плагин **RebuildInProgress**. В начале сборки он создает файл статуса прогресса 
`node_modules/.rebuildInProgress`, а когда сборка окончена — удаляет его. 

## Использование

Подключение и использование плагина стандартно:

```javascript
const RebuildInProgressPlugin = require('@funboxteam/rebuild-in-progress-webpack-plugin');

module.exports = {
  plugins: [
    new RebuildInProgressPlugin()
  ]
}
```

Можно передать свой путь до файла, если стандартный не подходит по каким-то причинам:

```javascript
const RebuildInProgressPlugin = require('@funboxteam/rebuild-in-progress-webpack-plugin');
const rebuildInProgressPath = 'node_modules/.alternativeName';

module.exports = {
  plugins: [
    new RebuildInProgressPlugin(rebuildInProgressPath)
  ]
}
```

## Отслеживание статуса сборки

Пример того, как можно отслеживать статус сборки с помощью встроенной в Node.js 
[библиотеки `fs`](https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener):

```javascript
const fs = require('fs');
const rebuildInProgressPath = 'node_modules/.rebuildInProgress';

fs.watch(path.dirname(rebuildInProgressPath), (eventType, filename) => {
  if (eventType === 'rename' && filename === path.basename(rebuildInProgressPath)) {
    if (fs.existsSync(rebuildInProgressPath)) {
      // Сборка началась
    } else {
      // Сборка закончилась
    }
  }
});
```

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
