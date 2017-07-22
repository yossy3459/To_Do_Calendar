/*******************************************************************
*** File Name           : index.js
*** Designer            : 小野 義基
*** Date                : 2017.05.30
*** Function            : Electronの制御を行う (M1.1 Electron起動処理)
*******************************************************************/

/*******************************************************************
*** Function Name       : index
*** Designer            : 小野 義基
*** Date                : 2017.05.30
*** Function            : Electronの制御を行う (M1.1 Electron起動処理)
*** return              : なし
*******************************************************************/

"use strict";

// 宣言
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

// task.js内のmodule.exportsを読み込む
var start = require("./task");

// 全てのウィンドウが閉じたらアプリ終了
app.on('window-all-closed', function () {
  app.quit();
})

// Electronの初期化完了後に実行
app.on('ready', function() {
	// メイン画面(W1)の表示
	mainWindow = new BrowserWindow({
		width: 1080,
		height: 720,
		center: true,
		resizable: false,
		nodeIntegration: true,
		useContentSize: true
	});

	// メイン画面呼び出し
	mainWindow.loadURL('file://' + __dirname + '/W5/W5.html');

	// メイン画面が閉じられたら、mainWindowオブジェクトを空にする
	mainWindow.on('closed', function(){
		mainWindow = null;
	});
});
