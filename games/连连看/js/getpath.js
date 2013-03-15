;define(function(require, exports, module) {
	require("./public");//确定需求模块
	var getpath={
		point : [null, null],
		savepath : [],//用于保存可以通过的每个路径
		isX : function(p1, p2) {
			return p1.y == p2.y ? true : false;
		},//判断两点是否都在X轴
		isY : function(p1, p2) {
			return p1.x == p2.x ? true : false;
		},//判断两点是否都在Y轴
		isXY : function(p1, p2) {
			return (this.isY(p1, p2) && this.isX(p1, p2)) ? true : false;
		},//判断两点是否在同一点
		isnone : function(p) {
			var str = '\{x\:' + p.x + ',y\:' + p.y + '\}';
			var content = document.getElementById(str).innerHTML;
			return content == "" ? true : false;
		},//判断该点是否有数值
		islinked : function(p1, p2) {
			var arr = new Array();
			if (this.isXY(p1, p2))
				return false;//两点不能重合
			if (this.isX(p1, p2)) {
				arr = this.positioned(p1, p2);
				p1 = arr[0];
				p2 = arr[1];
				for (var i = p1.x + 1; i < p2.x; i++) {
					var p = {
						x : i,
						y : p1.y
					};
					if (this.isnone(p))
						continue;
					else {
						return false
					};
				}
				return true;
			};//同X轴，扫描p1，p2两点之间是否都为空
			if (this.isY(p1, p2)) {
				arr = this.positioned(p1, p2);
				p1 = arr[0];
				p2 = arr[1];
				for (var i = p1.y + 1; i < p2.y; i++) {
					var p = {
						x : p1.x,
						y : i
					};
					if (this.isnone(p))
						continue;
					else {
						return false
					};
				}
				return true;
			}//同X轴，扫描p1，p2两点之间是否都为空
		},//判断两点之间是否可以通达
		getcontents : function(p) {
			var str = '\{x\:' + p.x + ',y\:' + p.y + '\}';
			var content = document.getElementById(str).innerHTML;
			return content;
		},//将点的x，y转化为对应的节点id，并借此获取其内容
		positioned : function(p1, p2) {
			if (p1.x > p2.x) {
				var t = p1;
				p1 = p2;
				p2 = t;
			} else if (p1.x == p2.x) {
				if (p1.y > p2.y) {
					var t = p1;
					p1 = p2;
					p2 = t;
				}
			};
			return [p1, p2]
		},//位置调整，确保p1在左上侧
		pathtoId : function(p1, p2) {
			function tostringX(a, b) {
				return a + "," + b + "-" + (a + 1) + "," + b;
			};
			function tostringY(a, b) {
				return a + "," + b + "-" + a + "," + (b + 1);
			};
			//获取两点间的路径对应的节点id

			if (this.islinked(p1, p2)) {
				this.isX(p1, p2) ? (function() {
					var min = p1.x < p2.x ? p1.x : p2.x, max = p1.x > p2.x ? p1.x : p2.x;
					for (var i = 0; i < max - min; i++) {
						getpath.savepath.push(tostringX(min + i, p1.y))
					}
				}//同x轴，保存p1，p2两点间所有路径对应的节点id
				)() : (function() {
					var min = p1.y < p2.y ? p1.y : p2.y, max = p1.y > p2.y ? p1.y : p2.y;
					for (var i = 0; i < max - min; i++) {
						getpath.savepath.push(tostringY(p1.x, min + i))
					}
				}
				)();//同Y轴，保存p1，p2两点间所有路径对应的节点id
			}
			console.dir(getpath.savepath);
		},//获取同轴两点之间路径对应的节点id

		//******************test*********************

		// console.log(this.getcontents(p1)+','+this.getcontents(p2));
		// console.log("this.isX:"+this.isX(p1,p2));
		// console.log("this.isY:"+this.isY(p1,p2));
		// console.log("this.isXY:"+this.isXY(p1,p2));
		// console.log("this.isnone:"+this.isnone(p1));
		// console.log("this.getcontents:"+this.getcontents(p1));
		// console.log("this.islinked:"+this.islinked(p1,p2));
		// console.log(this.getcontents(p1)+','+this.getcontents(p2));

		//******************test*********************

		//main below

		judge : function(p1, p2) {
			this.point = this.positioned(p1, p2);
			p1 = this.point[0];
			p2 = this.point[1];
			//调整P1，p2两点位置

//情况1：两点为同一点
			if (this.getcontents(p1) != this.getcontents(p2))
				return false;

//情况2：两点同轴，且可通达
			if ((this.isX(p1, p2) || this.isY(p1, p2)) && this.islinked(p1, p2)) {
				getpath.savepath = [];
				this.pathtoId(p1, p2);
				return true;
			}

//情况3：两点同轴，不可通达
			if (this.isX(p1, p2) && !this.islinked(p1, p2)) {
				for (var i = 0; i < tX(); i++) {
					var p3 = {
						x : p1.x,
						y : i
					};
					var p4 = {
						x : p2.x,
						y : i
					};
					if (!this.islinked(p1, p3) || !this.islinked(p2, p4) || !this.isnone(p3) || !this.isnone(p4) || !this.islinked(p3, p4))
						continue;
					else {
						getpath.savepath = [];
						this.pathtoId(p1, p3);
						this.pathtoId(p3, p4);
						this.pathtoId(p2, p4);
						return true;
					}

				}
				return false;
			}
			if (this.isY(p1, p2) && this.islinked(p1, p2) == false) {
				for (var i = 0; i < tY(); i++) {
					var p3 = {
						x : i,
						y : p1.y
					};
					var p4 = {
						x : i,
						y : p2.y
					};
					if (!this.islinked(p1, p3) || !this.islinked(p2, p4) || !this.isnone(p3) || !this.isnone(p4) || !this.islinked(p3, p4))
						continue;
					else {
						getpath.savepath = [];
						this.pathtoId(p1, p3);
						this.pathtoId(p3, p4);
						this.pathtoId(p2, p4);
						return true;
					}

				}
				return false;
			}
//情况4：不同轴
			//3点可以直接连接
			if (!this.isY(p1, p2) && !this.isX(p1, p2)) {
				var p3_1 = {
					x : p1.x,
					y : p2.y
				}, p3_2 = {
					x : p2.x,
					y : p1.y
				}
				if ((this.islinked(p1, p3_1) && this.islinked(p2, p3_1) && this.isnone(p3_1)) || (this.islinked(p1, p3_2) && this.islinked(p2, p3_2) && this.isnone(p3_2))) {
					this.isnone(p3_1) ? (function() {
						getpath.savepath = [];
						getpath.pathtoId(p2, p3_1);
						getpath.pathtoId(p1, p3_1);
					})() : (function() {
						getpath.savepath = [];
						getpath.pathtoId(p1, p3_2);
						getpath.pathtoId(p2, p3_2)
					})();
					return true;
				} else {       //4点可以直接连接
					for (var i = 0; i < tX(); i++)//
					{
						var p3 = {
							x : p1.x,
							y : i
						}, p4 = {
							x : p2.x,
							y : i
						};
						if (!this.islinked(p1, p3) || !this.isnone(p3) || !this.islinked(p2, p4) || !this.isnone(p4) || !this.islinked(p3, p4))
							continue;
						else {
							getpath.savepath = [];
							this.pathtoId(p1, p3);
							this.pathtoId(p2, p4);
							this.pathtoId(p4, p3);
							return true;
						}

					};
					for (var i = 0; i < tY(); i++)//scan every col
					{
						var p3 = {
							x : i,
							y : p1.y
						}, p4 = {
							x : i,
							y : p2.y
						};
						if (!this.islinked(p1, p3) || !this.isnone(p3) || !this.islinked(p2, p4) || !this.isnone(p4) || !this.islinked(p3, p4))
							continue;
						else {
							getpath.savepath = [];
							this.pathtoId(p1, p3);
							this.pathtoId(p2, p4);
							this.pathtoId(p4, p3);
							return true;
						}

					};
					return false;
				}
			}
		}
	};
	return getpath;

	
})
