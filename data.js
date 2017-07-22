/*******************************************************************
*** File Name           : data.js
*** Designer            : 小野 義基
*** Date                : 2017.05.30
*** Function            : D1 タスク をtaskオブジェクトに保持する
*******************************************************************/

// Task.js の exports 変数を Task オブジェクトに取得
var Task = require('electron').remote.require('./task');
// Task.get()メソッドにより、変数 task にデータを格納
var task = Task.get();
