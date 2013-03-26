google.load('visualization', '1', {
	'packages': ['annotatedtimeline','corechart','table']
});
// google.setOnLoadCallback(drawChart);

function ATL(event) {
	var tmp=document.getElementById('visual-1');
	hidediv(event.target);//显示当前div，隐藏其他
	if(tmp.innerHTML=="")
	{
		var data = new google.visualization.DataTable(datas);
		data.addColumn('date', "Date");
		data.addColumn('number', 'Expenses');
		data.addRows(ATL_filter(datas));
		var chart = new google.visualization.AnnotatedTimeLine(tmp);
		chart.draw(data, {
			allValuesSuffix: " RMB",
			colors: ["blue"],
			title: 'Someone\'s consumption in recent years'
		});
	}
}
function Buble(event) {
	var tmp=document.getElementById('visual-2');
	hidediv(event.target);
	if(tmp.innerHTML=="")
	{
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'ID');
		data.addColumn('number', 'Months');
		data.addColumn('number', 'Time');
		data.addColumn('string', 'Place');
		data.addColumn('number', 'Expenses');
		data.addRows(BC(datas));
	
		var options = {
			title: 'Someone\'s consumption in recent years',
			hAxis: {
				title: 'Months'
			},
			vAxis: {
				title: "Time"
			}
		};
		var chart = new google.visualization.BubbleChart(tmp);
		chart.draw(data, options);
	}
}
function Pie(event) {
	var tmp=document.getElementById('visual-3')
	hidediv(event.target);
	if(tmp.innerHTML=="")
	{
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Place');
		data.addColumn('number', 'Consumption times');
		data.addRows(PieChart_filter(datas));
		var options = {
			'title': 'Someone\'s consumption in recent years'
		};
		var chart = new google.visualization.PieChart(tmp);
		chart.draw(data, options);
	}
}
function Table(event) {
	var tmp=document.getElementById('visual-4')
	hidediv(event.target);
	if(tmp.innerHTML=="")
	{
		var data = new google.visualization.DataTable();
		data.addColumn('date', 'Time');
		data.addColumn('number', 'Expenses/yuan');
		data.addColumn('string', 'Place');
		data.addRows(datas);
		var formatter = new google.visualization.BarFormat({
			width: 50
		});
		formatter.format(data, 1);
	
		var table = new google.visualization.Table(tmp);
		table.draw(data, {
			width: "900px",
			allowHtml: true,
			title: 'Someone\'s consumption in recent years'
		});
	}
}