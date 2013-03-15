;define(function(require, exports, module) {
	var getpath = require('./getpath');
	var users = {
		time : 0,
		point : [null, null],
		s_point : ['', ''],
		ifclear : false,
		within_time : [null, null],
		msg : ["good!please go on...", "we can't get there", "you win within \n"],
		ifcleared_all : function() {
			var td = document.getElementsByTagName("td");
			for (var i = 0; i < td.length; i++) {
				if (td[i].innerHTML != '')
					break;
				else {
					if (i == td.length - 1) {
						this.within_time[1] = new Date();
						return true;
						break;
					} else
						continue
				}
			}
			return
		},
		getObject : function(id) {
			var Obj = new Object();
			Obj.x = parseInt(id.split(",")[0].split(":")[1]);
			Obj.y = parseInt(id.split(",")[1].split(":")[1]);
			return Obj;
		},
		clearoutline : function() {
			var td = document.getElementsByTagName("td");
			for (var i = 0; i < td.length; i++) {
				if (td[i].style.border)
					td[i].style.border = "";
			}
		},
		showmsg : function() {
			var msg = this.msg;
			if (this.ifclear) {
				document.getElementById("msg").innerHTML = this.msg[0];
			} else
				document.getElementById("msg").innerHTML = this.msg[1];
			this.clearContent();
			if (this.ifcleared_all()) {
				var tmp = this.within_time[1] - this.within_time[0];
				document.getElementById("msg").innerHTML = this.msg[2] + tmp / 1000 + "seconds";
			} else {
				var p = window.setTimeout(function() {
					document.getElementById('msg').innerHTML = ''
				}, 1500);
			}
		},
		clearContent : function() {
			var p1 = this.s_point[0], p2 = this.s_point[1], hidepath = 0;
			if (this.ifclear) {
				for (var i in getpath.savepath)
				document.getElementById(getpath.savepath[i]).style.display = "block";
				document.getElementById(p1).innerHTML = "";
				document.getElementById(p2).innerHTML = "";
				hidepath = window.setTimeout(function() {
					for (var i in getpath.savepath)
					document.getElementById(getpath.savepath[i]).style.display = '';
				}, 500);
			} else
				return;
		},
		clock : function() {
			var clock = document.getElementById("clock"), date = new Date(), h = date.getHours(), m = date.getMinutes(), s = date.getSeconds(), str;
			str = h + ":" + m + ":" + s;
			clock.innerHTML = str;
		}, //dai xiu gai
		event : function(event) {
			var e = event.srcElement ? event.srcElement : event.target;

			if (this.point[0] == null) {
				this.s_point[0] = e.id;
				this.point[0] = this.getObject(e.id);
				//p1
				e.style.border = "#555 thin solid";
				// console.log(event.target)
			} else if (this.point[1] == null) {
				this.s_point[1] = e.id;
				this.point[1] = this.getObject(e.id)//p2

				this.ifclear = getpath.judge(this.point[0], this.point[1]);
				e.style.border = "#555 thin solid";
				this.point = [null, null];

				this.showmsg();
				this.time = window.setTimeout(users.clearoutline, 600)
				// this.ifcleared_all();
			}
		}
	};
	return users;

	// module.exports = users;

})
