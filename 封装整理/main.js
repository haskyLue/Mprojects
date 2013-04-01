(function() { //去除字符串首尾空白
	if (typeof String.trim == "undefined") {
		String.prototype.trim = function() {
			return this.replace(/(^\s*)|(\s*$)/g, "")
		}
	}
	if (!Function.bind) {
		Function.prototype.bind = function(obj) {
			var _func = this;
			console.log(_func);
			return function() {
				return _func.apply(obj, arguments)
			}
		}
	})() //调整作用域
function curry(fn, obj) {
	var obj = obj || window;
	var arg = [];
	for (var i = 2, len = arguments.length; i < len; i++) {
		arg.push(arguments[i])
	};
	return function() {
		var arg1 = [];
		for (var i = 0, len = arguments.length; i < len; i++) {
			arg1.push(arguments[i])
		};
		var args = arg.concat(arg1);
		return fn.call(obj, args)
	}
}
//事件

function getClickPositon(evt) {
	var evt = evt || window.event;
	var x, y;

	if (evt.pageX) {
		x = evt.pageX;
		y = evt.pageY;
	} else if (evt.clientX) {
		var offsetX, offsetY;
		offsetX = document.documentElement.scrollLeft || document.body.scrollLeft; //ie6以上||旧版本
		offsetY = document.documentElement.scrollTop || document.body.scrollTop;
		x = evt.clientX + offsetX;
		y = evt.clientY + offsetY
	}
	return [x, y]
}

function addlistener(target, type, handler) {
	if (target.addEventListener) {
		target.addEventListener(type, handler, false) //标准浏览器
	} else if (target.attachEvent) {
		type = "on" + type;
		target.attachEvent(type, handler) //ie浏览器,只支持事件冒泡
	} else {
		target["on" + type] = handler //一般方法，元素事件属性绑定函数
	}
}

function removelistener(target, type, handler) {
	if (target.addEventListener) {
		target.removeEventListener(type, handler, false) //标准浏览器
	} else if (target.attachEvent) {
		type = "on" + type;
		target.detachEvent(type, handler) //ie浏览器,只支持事件冒泡
	} else {
		target["on" + type] = null //一般方法，元素事件属性绑定函数
	}
}

function cancelPropagation(event) {
	try {
		event.stopPropagation(); //标准浏览器
	} catch (err) {
		event.cancelBubble = true; //ie浏览器
	}
}

//样式

function getStyle(ele, css_name, cssName) {
	if (ele.currentStyle) {
		return ele.currentStyle[css - name]
	} else if (document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(ele, null).getPropertyValue(cssName)
	} else {
		return null
	}
} //(string)

function pageSize() {
	var w, h;
	if (!window.innerWidth) { //ie
		w = (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);
		h = (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight)
	} else { //标准
		w = window.innerWidth;
		h = window.innerHeight;
	}
	return [w, h]
}

function eleRect(ele) {
	return ele.getBoundingClientRect(); //边界矩形，包含了矩形的top,bottom,right,left边界信息(以viewport顶部左边为参考点)，返回值包含padding,border
}

function XmlHttpRequest(xmlhttp) {
	try {
		xmlhttp = new XMLHttpRequest();
	} catch (e) {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
}