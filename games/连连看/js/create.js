;define(function(require, exports, module) {
	var users = require('./users');
	require("./public");//依赖的模块
	var Create = {
		random_sort : function(arr) {
			var tmp = new Array(), len = arr.length;
			for (var i = 0; i < len; i++) {
				tmp[i] = arr.splice(Math.floor(Math.random()*arr.length),1)[0];
			}
			return tmp;
		},//数组的随机排序
		data : function() {
			var row = tX(), col = tY(), total = (col - 2) * (row - 2), //数据的个数
			counts = total / 2, //数的种类
			tmp_datas = new Array(), datas = new Array();

			for (var i = 0; i < counts; i++) {
				tmp_datas[i] = Math.floor(counts * Math.random())
			}//随机生成counts个0～counts以内的数
			datas=tmp_datas.concat(tmp_datas)
			//复制一份保存

			// console.log(datas.length);
			// console.log(this.random_sort(datas));
			return this.random_sort(datas);//对数据随机排序之后返回
		},//生成成对出现的数据
		path : function(id, top, left, width, height) {
			var div = document.createElement("div"), path = document.getElementById("path");
			style = "top:" + top + "px;left:" + left + "px;width:" + width + "px;height:" + height + "px";
			div.setAttribute("class", "paths");
			div.setAttribute("id", id);
			div.setAttribute("style", style);
			path.appendChild(div);

		},//创建路径div的函数
		init_path : function() {
			var row = tX(), col = tY(), p = document.getElementsByTagName("td")[0].scrollWidth, top_basic = (p - 4) / 2, left_basic = p / 2, cell_basic = p, path = document.getElementById("path");

			path.style.top = document.getElementById("matrix").offsetTop + "px";
			path.style.left = document.getElementById("matrix").offsetLeft + "px";//将路径的容器定位到单元格容器的相同位置

			for (var i = 0; i < col; i++) {
				for (var j = 0; j < row - 1; j++) {
					this.path(j + "," + i + "-" + (j + 1) + "," + i, top_basic + cell_basic * i, left_basic + cell_basic * j, p, 4)
				}
			}
			for (var i = 0; i < row; i++) {
				for (var j = 0; j < col - 1; j++) {
					this.path(i + "," + j + "-" + i + "," + (j + 1), left_basic + cell_basic * j, top_basic + cell_basic * i, 4, p)
				}
			}//动态生成行列路径,id为相邻单元格坐标（以“-”连接）的字符串

		},
		init_table : function() {
			var row = tX(), col = tY(), matrix = document.getElementById("matrix"), str = '<table border=\"0\">', data;
			var e = "seajs.use('./js/users',function(tmps){tmps.event(event);})";//给每个单元格绑定点击事件
			(col * row % 2 == 0) ? (function() {
				data = Create.data();
				for (var i = 0; i < col; i++) {
					str += "<tr>";
					for (var j = 0; j < row; j++) {
						if (i == 0 || i == col - 1 || j == 0 || j == row - 1) {//创建表格时保证首尾左右为空行列
							str += "<td id=\'\{x\:" + j + "\,y\:" + i + "\}\'>" + "</td>";
							continue;
						}
						str += "<td onclick=" + e + " id=\'{x:" + j + "\,y\:" + i + "}'>" + data[(i - 1) * (row - 2) + j - 1] + "</td>"
					}
					str += "</tr>"
				}
				str += "</table>";
				matrix.innerHTML = str;
				Create.init_path();//初始化表格,id为对应表格的坐标
			})() : alert("please select even number!");//在表格内，含有数据内容单元格的数目要为偶数

			var clock_ = window.setInterval(users.clock, 1000);//时钟每个一秒获取一次值
			users.within_time[0] = new Date();//记录开始的时刻

		}
	};

	return Create;//结束并提供对外的接口

})
