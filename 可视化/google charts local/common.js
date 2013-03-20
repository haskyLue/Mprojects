var datas;

function filterDatas(data) {
	var item = [];
	for (var i = 0; i < data.length; i++) {
		item[i] = data[i].split(",");
		item[i][0] = new Date(item[i][4]);
		item[i][1] = parseFloat(item[i][2]);
		item[i][2] = item[i][5];
		item[i] = item[i].slice(0, 3);
	}
	return item
}//array filter

// function getdatas() {
// 	var xmlhttp = new XMLHttpRequest(), text, targets = document.getElementById("show");
// 	xmlhttp.onreadystatechange = function() {
// 		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
// 			datas = xmlhttp.responseText.split(/\n/);
// 			datas = filterDatas(datas)
// 		}
// 	}
// 	xmlhttp.open("GET", "B10040628.csv", false);
// 	xmlhttp.send();
// }

/***************************************************/
//for PieChart

function PieChart_filter(data) {
	if (!data instanceof Array)
		return;
	var len = data.length, tmp = [],
	// num=0,
	ifFind = false;
	console.log(len);
	for (var i = 0; i < len; i++) {
		for (var j = 0; j < tmp.length; j++) {
			if (tmp[j][0] === data[i][2]) {
				tmp[j][1]++;
				ifFind = true;
				// num++;
				break;
			} else
				ifFind = false;
		}
		if (!ifFind) {
			tmp.push([data[i][2], 1]);
			// num++;
			ifFind = false;
		}
	}
	// console.info(num);
	return tmp;
}//[str]][num]

//Annotated Time Line

function ATL_filter(data) {
	if ( data instanceof Array == false)
		return;
	var item = [], len = data.length;
	for (var i = 0; i < len; i++) {
		item[i] = data[i].slice(0, 2)
	}
	return item;
}//[date][num]

//Bubble Chart

function BC(data) {
	if ( data instanceof Array == false)
		return;
	var len = data.length, tmp = [];
	for (var i = 0; i < len; i++) {
		tmp.push(new Array(4))
		tmp[i][1] = parseFloat((data[i][0].getHours() + data[i][0].getMinutes() / 60).toFixed(2))
		tmp[i][0] = data[i][0].getMonth();
		tmp[i][2] = data[i][2];
		tmp[i][3] = data[i][1]
		tmp[i].unshift(" ");
	}
	return tmp
}//[id][num][num][num/str][str]
