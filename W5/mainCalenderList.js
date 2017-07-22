/*******************************************************************
*** File Name           : mainCalenderList.js
*** Designer            : 小野 義基
*** Date                : 2017.06.27
*** Function            : カレンダーリスト表示処理を行う
*******************************************************************/


/*******************************************************************
*** Function Name       : showCalendarList
*** Designer            : 小野 義基
*** Date                : 2017.06.27
*** Function            : カレンダーリストに現在登録されているタスクを表示
                          (M5.1 カレンダー描画処理)
*** Return              : なし
********************************************************************/

var showCalendarList = function (start, end, timezone, callback) {
	// 変数宣言
	var events = [];

	for ( i=0 ; i<task.length ; i++ ){
		// 色設定
		var c, c_string = 'white';
		switch(task[i].tag){
			case 1:  c = 'red';  break;
			case 2:  c = 'orange';  break;
			case 3:  c = 'yellow';  c_string = 'black';  break;
			case 4:  c = 'green';  break;
			case 5:  c = 'blue';  break;
			case 6:  c = '#165e83';  break;  // 藍色
			case 7:  c = 'purple';  break;
			default: c = 'black';  break;
		}
		// For debug
		// console.log(c);

		// data.jsのtaskを、eventsにpush
		events.push({
			title: task[i].name,
			start: task[i].deadline,
			color: c,
			textColor: c_string
		});
	}

	// コールバック
	callback(events);
}


/*******************************************************************
*** Function Name       : showTaskDetail
*** Designer            : 小野 義基
*** Date                : 2017.06.27
*** Function            : 右側のペインに、期限が「クリックされた日付」に
                          設定されているタスクの詳細
                          (タスク名、期限の時刻、メモ)を表示
						  (M5.2 タスク詳細表示処理)
*** Return              : なし
********************************************************************/

var showTaskDetail = function (date, jsEvent, view) {
	// 変数宣言: クリックした日にタスクが存在するかどうかを判定する
	var taskExistFlag = false;

	// For debug
	// alert('Date: ' + date.format() + '\ntitle: ' + task[2].name + '\nmemo: ' + task[2].memo);

	// 既存のtable削除
	$(".table").remove();

	// 新規table生成
	var table = document.createElement('table');
	table.classList.add('table');
	table.classList.add('table-striped');

	// For debug
	// console.log(table);

	// thead生成、日付の表示
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");
	var th = document.createElement("th");

	table.appendChild(thead);
	thead.appendChild(tr);
	tr.appendChild(th);
	th.setAttribute("colSpan", 3);
	th.classList.add('date');

	th.innerHTML = date.format("Y年 M月 D日");

	// tbody生成
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);

	// 該当タスク取得
	for ( var i=0 ; i<task.length ; i++ ){
		var temp_date = moment.utc(task[i].deadline);

		// 期限が一致した場合、時刻、タスク名、メモを表示
		if ( moment(date).isSame(temp_date,'day') ){
			// クリックした日にタスクが存在するので、taskExistFlagをTrueに
			taskExistFlag = true;

			// 色設定
			var c;
			switch(task[i].tag){
				case 1:  c = 'red';  break;
				case 2:  c = 'orange';  break;
				case 3:  c = 'yellow';  break;
				case 4:  c = 'green';  break;
				case 5:  c = 'blue';  break;
				case 6:  c = '#165e83';  break;  // 藍色
				case 7:  c = 'purple';  break;
				default: c = 'black';  break;
			}

			// タグ用のセルを生成
			var newtr = tbody.insertRow( tbody.rows.length );
			var newtd = newtr.insertCell( newtr.cells.length );

			// タグ用のセルにcssを適用し、task[i].tagの色を設定
			newtd.classList.add('tag');
			newtd.style.backgroundColor = c;
			newtd.style.borderColor = c;

			// 期限とタスク名用のセルを生成し、テキストを書き込む
			var newtd2 = newtr.insertCell( newtr.cells.length );
			newtd2.appendChild( document.createTextNode('\u00a0\u00a0'
			+ temp_date.add('days', 1).format("H:mm") + '\u00a0\u00a0'
			+ task[i].name) );
			newtd2.setAttribute("colSpan",2)

			// 期限とタスク名用のセルにcssを適用
			newtd2.classList.add('propertyRow1');

			// タグ用のセルを生成
			var newtr = tbody.insertRow( tbody.rows.length );
			var newtd = newtr.insertCell( newtr.cells.length );

			// タグ用のセルにcssを適用し、task[i].tagの色を設定
			newtd.classList.add('tag');
			newtd.style.backgroundColor = c;
			newtd.style.borderColor = c;

			// メモ用のセルを生成し、テキストを書き込む
			var tempMemo = task[i].memo;
			var tempMemoSprit = tempMemo.split("<br>");

			var tempMemoLength = tempMemoSprit.length;

			var newtd2 = newtr.insertCell( newtr.cells.length );
			newtd2.appendChild(document.createTextNode('\u00a0\u00a0\u00a0\u00a0' + "メモ: "));

			var newtd3 = newtr.insertCell( newtr.cells.length );
			newtd3.appendChild(document.createTextNode(tempMemoSprit[0]));

			if ( tempMemoLength>1 ){
				for ( var i=1 ; i<tempMemoLength ; ++i ){
					newtd3.appendChild(document.createElement('br'));
					newtd3.appendChild( document.createTextNode(tempMemoSprit[i]));
				}
			}

			// メモ用のセルにcssを適用
			newtd2.classList.add('propertyRow2');
			newtd3.classList.add('propertyRow3');

		}
	}

	// タスクが一つもない場合は "タスクがありません" と表示
	if (taskExistFlag == false){
		var newtr = tbody.insertRow( tbody.rows.length );
		var newtd = newtr.insertCell( newtr.cells.length );
		newtd.appendChild(document.createTextNode("\u00a0\u00a0タスクがありません"));
		newtd.classList.add('propertyRowInit1');
	}

	// css: property クラス付与
	document.getElementById('property').appendChild(table);
}
