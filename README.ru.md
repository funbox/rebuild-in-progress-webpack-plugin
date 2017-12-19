# funbox-rebuild-in-progress-webpack-plugin

## Описание плагина

Иногда внешним программам может потребоваться знание о том, в каком состоянии находится сборка проекта.

Например, для тестов (особенно приемочных) важно понимать, что webpack собрал файлы проекта и можно начинать процесс тестирования.

Для решения этой задачи был создан плагин **RebuildInProgress**.

В начале сборки он создает файл статуса прогресса `node_modules/.rebuildInProgress`, а когда сборка окончена — удаляет этот файл.

Имя файла статуса прогресса сборки можно передать при инициализации плагина.

Используя эти знания, сторонние программы могут понять, когда сборка готова.

## Использование плагина в проекте

Подключение и использование плагина стандартно:

```javascript
var RebuildInProgressPlugin = require('funbox-rebuild-in-progress-webpack-plugin');

module.exports = {
  plugins: [
    new RebuildInProgressPlugin()
  ]
}
```

Подключение плагина с нестандартным именем:

```javascript
var RebuildInProgressPlugin = require('funbox-rebuild-in-progress-webpack-plugin');
const rebuildInProgressFile = 'node_modules/.alternativeName';

module.exports = {
  plugins: [
    new RebuildInProgressPlugin(rebuildInProgressFile)
  ]
}
```

## Отслеживание статуса сборки

```javascript
const rebuildInProgressFile = 'node_modules/.rebuildInProgress';

fs.watch(path.dirname(rebuildInProgressFile), (eventType, filename) => {
  if (eventType === 'rename' && filename === path.basename(rebuildInProgressFile)) {
    if (fs.existsSync(rebuildInProgressFile)) {
      // Сборка началась
    } else {
      // Сборка закончилась
    }
  }
});
```
