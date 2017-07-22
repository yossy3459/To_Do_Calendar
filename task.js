/*******************************************************************
*** File Name           : task.js
*** Designer            : 小野 義基
*** Date                : 2017.07.04
*** Function            : taskに関するメソッドを定義する
*******************************************************************/
/*******************************************************************
*** Function Name       : task
*** Designer            : 小野 義基
*** Date                : 2017.07.04
*** Function            : taskに関するメソッドを定義する
                          (M1.2 タスク取得・保存処理)
*** return              : jsonファイルへの書き込み
*******************************************************************/

// database.json(F1 タスクDB)からタスクデータを読み込み、taskに代入
var jsonParse = require('fs');
const path = require('path');
var datafile = path.join(__dirname, 'database.json');
var task = JSON.parse(jsonParse.readFileSync(datafile, 'utf8'));


// 現在のタスクデータをdatabase.jsonへ書き込む
function writeDatabase(){
	var jsonStringify = require('fs');
	jsonStringify.writeFileSync(datafile, JSON.stringify(task, null, '    '));
}

// data.jsへtaskを渡す
exports.get = () => {
	return task;
}

// task[task.length]に新規タスクを追加し、database.jsonへ書き込む (C2 新規タスク入力処理で使用)
exports.add = (newTask) => {
	task.push(newTask);
	writeDatabase();
}

// task[numb]のデータを削除し、database.jsonへ書き込む (C3 タスク編集・削除処理で使用)
exports.splice = (numb) => {
	task.splice(numb,1);
	writeDatabase();
}

// 更新処理時、writeDatabaseを読み込む
exports.update = () => {
	writeDatabase();
}
