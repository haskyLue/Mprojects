var time_1,//定时器，控制方块下落 
	time_2, //定时器，控制方块更新
	create = CreateModals(),//首次启动时，创建的一个方块模型对象（以后每次直接接受来自create_pre传递的值）
	create_pre,//下一个可预览的方块模型
	board = [],//维护当前背景上 除了运动方块以外的 有颜色的区域（行列号构成的二维数组）
	points = 0;//分值，即每次消行时得到的反馈奖励
function init() {
	create_pre = CreateModals();
	colorRender();//渲染当前运动区块的颜色
	updateboard();//更新除运动区块 有颜色的部分
	/*以上创建部分完成*/
	
	/*绑定按键事件*/
	document.onkeydown = function(event) {
		keyevents(create, event);
	}
	
	/*显示 预览下一个方块 的区域*/
	showPre(create_pre);
	
	/*主启动程序*/
	if (checkGameOver()) {
		alert("game over!You score "+points+"points")
		window.clearTimeout(time_2);//判断是否结束，否则开始或继续
	} else {
		time_1 = window.setInterval(function() {	//下落时定时	
			if (checkdown()) {	//判断是否可以继续下落
				clears();	//清除运动区块的所有颜色
				create.movedown();	//所有运动区块下移
				colorRender();	//重新渲染下移后的运动区块
				updateboard();	//更新当前有颜色的区块
			} else {
				clearInterval(time_1);	//结束下落
				create = create_pre;	//将预览的下一个对象给当前运动区块
				time_2 = window.setTimeout(init, 1000)	//重新开始渲染颜色 更新有色区块等操作
			}
		}, 1000);
	}
	/*移除程序开始的点击事件*/
	removeClick();
}

/*主要功能函数*/
function get(classname) {
	return document.getElementsByClassName("[" + classname.join() + "]");
}//接受数组，并转换到对应的dom元素
function random(num) {
	return Math.floor(Math.random() * num)
}//生成num以内的随机整数
function isArrayEqual(array1, array2) {
	for (var i = 0; i < array1.length; i++) {
		if (array1[i] != array2[i])
			return false
	}
	return true
}//比较两个数组的元素是否一一相等（不能直接比较，否则比较的是数组的地址）

/*主体相关的模块函数*/
function CreateModals(modals) {
	var statTmp;
	switch(random(5)) {
		case 0:
			modals = new Type_0;
			break;
		case 1:
			modals = new Type_1;
			break;
		case 2:
			modals = new Type_2;
			break;
		case 3:
			modals = new Type_3;
			break;
		case 4:
			modals = new Type_4
	};
	modals.nowStat = (( statTmp = random(4)) == 0 ? modals.stat.t0 : statTmp == 1 ? modals.stat.t1 : statTmp == 2 ? modals.stat.t2 : modals.stat.t3)
	return modals;
}//随机生成四个方块对象中的一个，并随机生成四个运动状态中的一个 赋予 当前状态（即对应4个运动区块）
function clears(rownum) {
	if (!rownum) {
		for (var i = 0; i < create.nowStat.length; i++)
			get(create.nowStat[i])[0].style.backgroundColor = '';
		//用于清除当前运动区块的颜色 仅有4个区块
	} else {
		var tmp = document.getElementsByClassName("row-"+rownum)[0];
		for (var i = 0; i < tmp.children.length; i++) {
			tmp.children[i].style.backgroundColor = "";
		}//用于清除指定行的所有区块的颜色
	}
}//根据参数ronum的性质选择对应的清除方法
function updateboard() {
	var widths = 7,
		heights = 18, 
		tmp = 0;
	board = [];
	for (var j = 1; j <= heights; j++) {	//按行扫描
		tmp = board.length;
		for (var i = 1; i <= widths; i++) {
			if (get([j,i])[0].style.backgroundColor != "" && !isArrayEqual([j, i], create.nowStat[0]) && !isArrayEqual([j, i], create.nowStat[1]) && !isArrayEqual([j, i], create.nowStat[2]) && !isArrayEqual([j, i], create.nowStat[3]))
				board.push([j, i])
		};	//将每一行中有颜色的区域 并且不包含当前运动的四个区域 存入数组
		
		if (board.length - tmp == 7) {	//如果数组增加了7个（即该行颜色已满）
			for (var t = 0; t < 7; t++)
				board.pop();	//去除刚保存的 该行 所有区块
			clears(j);	//消去这一行
			document.getElementsByClassName("point")[0].innerHTML = (points += 10); //每消去一行 分值增加10
			for (var t = board.length - 1; t >= 0; t--) {	//接着，将 该行以上的 所有行 下移一个单位 （注意倒续）
				get(board[t])[0].style.backgroundColor = '';	//清楚原来位置的颜色
				board[t][0]++;	//下移一个单位
				get(board[t])[0].style.backgroundColor = 'blue';	//渲染新的区域的颜色
			}
		}
	}
	// console.log(board)
}//更新所有 有颜色的 区块（除运动区块），并确定是否消行
function colorRender() {
	for (var i = 0; i < create.nowStat.length; i++) {
		get(create.nowStat[i])[0].style.backgroundColor = 'blue';
	}
}//渲染填充 运动区块 的颜色 （仅4个）
function showPre(modals) {
	var p = document.getElementById("next").getElementsByTagName("td"),
		statTmp = modals.nowStat,
		targets;
	for (var i = 0; i < p.length; i++) {
		p[i].style.backgroundColor = "";
	}
	for (var i = 0; i < statTmp.length; i++) {
		targets = get([statTmp[i][0],statTmp[i][1]-2])[1];
		targets.style.backgroundColor = "black";
	}
}//提供下一个方块对象，处理预览部分

/*以下时提供检测的函数,提前左移 右移 下移 变化*/
function checkleft() {
	for (var i = 0; i < create.nowStat.length; i++) {
		if (create.nowStat[i][1] - 1 <= 0)
			return false	//判断是否越界
		else {
			for (var j = 0; j < board.length; j++) {
				if (isArrayEqual(board[j], [create.nowStat[i][0], create.nowStat[i][1]-1]))
					return false
			}
		}	//跟board中存储的 所有有色区块 比较，排除与该部分重合的区块
	}
	return true
}
function checkright() {
	for (var i = 0; i < create.nowStat.length; i++) {
		if (create.nowStat[i][1] + 1 >= 8)
			return false
		else {
			for (var j = 0; j < board.length; j++) {
				if (isArrayEqual(board[j], [create.nowStat[i][0], create.nowStat[i][1] + 1]))
					return false
			}
		}
	}
	return true
}//类似上面
function checkdown() {
	for (var i = 0; i < create.nowStat.length; i++) {
		if (create.nowStat[i][0] + 1 >= 19)
			return false
		else {
			for (var j = 0; j < board.length; j++) {
				if (isArrayEqual(board[j], [create.nowStat[i][0] + 1, create.nowStat[i][1]]))
					return false
			}
		}
	}
	return true
}//类似上面
function checkRotate() {
	var tmp;
	create.statnum == 0 ? tmp = create.stat.t1 : create.statnum == 1 ? tmp = create.stat.t2 : create.statnum == 2 ? tmp = create.stat.t3 : tmp = create.stat.t0;
	for (var i = 0; i < tmp.length; i++) {
		if (tmp[i][0]  >= 19 || tmp[i][1]  <= 0 || tmp[i][1]  >= 8)
			return false
		else {
			for (var j = 0; j < board.length; j++) {
				if (isArrayEqual(board[j], [tmp[i][0] , tmp[i][1]]))
					return false
			}
		}
	}
	return true;
}//类似上面
function checkGameOver() {
	if (!checkdown() && !checkleft() && checkright() && !checkRotate()) {
		return true
	}
}//当无法下移 左移 右移 变化时，即可判断gameover


/*事件函数*/
function keyevents(square, event) {
	var key = event.which || window.event.keycode;
	switch(key) {
		case 37: {
			if (checkleft()) {
				clears();	//去色
				square.moveleft();	//下移
				colorRender();	//填色
				updateboard();	//更新
			}
			break;
		}
		case 38: {
			if (checkRotate()) {
				clears();
				square.changetype();
				colorRender();
				updateboard();
			}
			break;
		}
		case 39: {
			if (checkright()) {
				clears();
				square.moveright();
				colorRender();
				updateboard();
			}
			break;
		}
		case 40: {
			if (checkdown()) {
				clears();
				square.movedown();
				colorRender();
				updateboard();
			}
			break;
		}
	}
}
function removeClick() {
	var p = document.getElementsByClassName("starts")[0];
	p.removeEventListener("click", init, false)
}//移除点击事件


