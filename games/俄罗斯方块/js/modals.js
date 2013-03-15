//——————————————————————构建对象，数据存储————————————————————
function Basic_squre() {
	this.pos = {
		x : 1,
		y : 3
	}, //!!! x-->行;y-->列；每种方块的初始位置
	this.stat = {
		"t0" : [],
		"t1" : [],
		"t2" : [],
		"t3" : []
	}, //保存每一种方块形状对应的4种变化状态
	this.statnum = 0, //每种变化状态对应一个序号；当前为0,初始状态
	this.nowStat = this.stat.t0, //当前变化状态
	this.speed = 1//运动速度
}
Basic_squre.prototype.movedown = function(speed) {
	for (var i in this.stat) {
		for (var j = 0; j < this.stat[i].length; j++) {
			this.stat[i][j][0] += this.speed;
		}
	}
	this.pos.x++;
};//	下移，将当前每一种变化状态的 行号+1
Basic_squre.prototype.moveleft = function(speed) {
	for (var i in this.stat) {
		for (var j = 0; j < this.stat[i].length; j++) {
			this.stat[i][j][1] -= this.speed;
		}
	}
	this.pos.y--;
};//	左移，将当前每一种变化状态的 列号-1
Basic_squre.prototype.moveright = function(speed) {
	for (var i in this.stat) {
		for (var j = 0; j < this.stat[i].length; j++) {
			this.stat[i][j][1] += this.speed;
		}
	}
	this.pos.y--;
};//	右移，将当前每一种变化状态的 列号+1
Basic_squre.prototype.changetype = function() {
	this.statnum == 0 ? this.statnum = 1 : this.statnum == 1 ? this.statnum = 2 : this.statnum == 2 ? this.statnum = 3 : this.statnum = 0
	switch(this.statnum) {
		case 0:
			this.nowStat = this.stat.t0;
			break;
		case 1:
			this.nowStat = this.stat.t1;
			break;
		case 2:
			this.nowStat = this.stat.t2;
			break;
		case 3:
			this.nowStat = this.stat.t3;
			break;
	}
	console.dir(this);
};//根据当前状态序号，确定下一个要变化的序号

/*继承；构建四种方块模型，并创建自己的变化状态数据库*/
function Type_0() {
	Basic_squre.call(this);
	this.stat = {
		"t0" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x, this.pos.y + 2], [this.pos.x, this.pos.y + 3]],
		"t1" : [[this.pos.x, this.pos.y], [this.pos.x + 1, this.pos.y], [this.pos.x + 2, this.pos.y], [this.pos.x + 3, this.pos.y]],
		"t2" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x, this.pos.y + 2], [this.pos.x, this.pos.y + 3]],
		"t3" : [[this.pos.x, this.pos.y], [this.pos.x + 1, this.pos.y], [this.pos.x + 2, this.pos.y], [this.pos.x + 3, this.pos.y]]
	}
};//方条形狀 4*1
function Type_1() {
	Basic_squre.call(this);
	this.stat = {
		"t0" : [[this.pos.x, this.pos.y + 1], [this.pos.x + 1, this.pos.y], [this.pos.x + 1, this.pos.y + 1], [this.pos.x + 1, this.pos.y + 2]],
		"t1" : [[this.pos.x, this.pos.y + 2], [this.pos.x + 1, this.pos.y + 1], [this.pos.x + 1, this.pos.y + 2], [this.pos.x + 2, this.pos.y + 2]],
		"t2" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x, this.pos.y + 2], [this.pos.x + 1, this.pos.y + 1]],
		"t3" : [[this.pos.x, this.pos.y], [this.pos.x + 1, this.pos.y], [this.pos.x + 1, this.pos.y + 1], [this.pos.x + 2, this.pos.y]]
	}
};//阶梯形状
function Type_2() {
	Basic_squre.call(this);
	this.stat = {
		"t0" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x + 1, this.pos.y], [this.pos.x + 1, this.pos.y + 1]],
		"t1" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x + 1, this.pos.y], [this.pos.x + 1, this.pos.y + 1]],
		"t2" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x + 1, this.pos.y], [this.pos.x + 1, this.pos.y + 1]],
		"t3" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x + 1, this.pos.y], [this.pos.x + 1, this.pos.y + 1]]
	}
}//正方形 2*2
function Type_3() {
	Basic_squre.call(this);
	this.stat = {
		"t0" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x, this.pos.y + 2], [this.pos.x + 1, this.pos.y + 2]],
		"t1" : [[this.pos.x, this.pos.y + 2], [this.pos.x + 1, this.pos.y + 2], [this.pos.x + 2, this.pos.y + 1], [this.pos.x + 2, this.pos.y + 2]],
		"t2" : [[this.pos.x, this.pos.y], [this.pos.x + 1, this.pos.y], [this.pos.x + 1, this.pos.y + 1], [this.pos.x + 1, this.pos.y + 2]],
		"t3" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x + 1, this.pos.y], [this.pos.x + 2, this.pos.y]]
	}
}//L形状
function Type_4() {
	Basic_squre.call(this);
	this.stat = {
		"t0" : [[this.pos.x, this.pos.y], [this.pos.x, this.pos.y + 1], [this.pos.x, this.pos.y + 2], [this.pos.x + 1, this.pos.y]],
		"t1" : [[this.pos.x, this.pos.y + 1], [this.pos.x, this.pos.y + 2], [this.pos.x + 1, this.pos.y + 2], [this.pos.x + 2, this.pos.y + 2]],
		"t2" : [[this.pos.x, this.pos.y + 2], [this.pos.x + 1, this.pos.y], [this.pos.x + 1, this.pos.y + 1], [this.pos.x + 1, this.pos.y + 2]],
		"t3" : [[this.pos.x, this.pos.y], [this.pos.x + 1, this.pos.y], [this.pos.x + 2, this.pos.y], [this.pos.x + 2, this.pos.y + 1]]
	}
}//镜面对折的L形状
Type_4.prototype = Type_3.prototype = Type_2.prototype = Type_1.prototype = Type_0.prototype = Basic_squre.prototype;//继承原型方法的模板
