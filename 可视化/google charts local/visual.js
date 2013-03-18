google.load('visualization', '1', {
	'packages': ['annotatedtimeline','corechart','table']
});
// google.setOnLoadCallback(drawChart);

function ATL(e) {
	hidediv(event.target);
	var data = new google.visualization.DataTable(datas);
	data.addColumn('date', '时间');
	data.addColumn('number', '开支');
	data.addRows(ATL_filter(datas));
	var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('visual-1'));
	chart.draw(data, {
		allValuesSuffix: " RMB",
		colors: ["blue"]
	});
}
function Buble(e) {
	hidediv(event.target)
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'ID');
	data.addColumn('number', '月份');
	data.addColumn('number', '当天消费时刻');
	data.addColumn('string', '消费地点');
	data.addColumn('number', '花费开支');
	data.addRows(BC(datas));

	var options = {
		title: '某人n年消费情况',
		hAxis: {
			title: '月份'
		},
		vAxis: {
			title: '时刻'
		}
	};

	var chart = new google.visualization.BubbleChart(document.getElementById('visual-2'));
	chart.draw(data, options);
}
function Pie(e) {
	hidediv(event.target);
	var data = new google.visualization.DataTable();
	data.addColumn('string', '消费地点');
	data.addColumn('number', '同一地点的消费次数');
	data.addRows(PieChart_filter(datas));
	var options = {
		'title': '某人几年的消费情况'
		// 'width': 1000,
		// 'height': 700
	};
	var chart = new google.visualization.PieChart(document.getElementById('visual-3'));
	chart.draw(data, options);
}
function Table(e) {
	hidediv(event.target)
	var data = new google.visualization.DataTable();
	data.addColumn('date', '时间');
	data.addColumn('number', '开销/元');
	data.addColumn('string', '消费地点');
	data.addRows(datas);
	var formatter = new google.visualization.BarFormat({
		width: 50
	});
	formatter.format(data, 1);

	var table = new google.visualization.Table(document.getElementById('visual-4'));
	table.draw(data, {
		width: "900px",
		allowHtml: true
	});
}