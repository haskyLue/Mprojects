var margin = {
    top: 10,
    right: 10,
    bottom: 100,
    left: 40
},
margin2 = {
    top: 430,
    right: 10,
    bottom: 20,
    left: 40
},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom,
height2 = 500 - margin2.top - margin2.bottom;

var parseDate = d3.time.format("%b %Y").parse;

var x = d3.time.scale().range([0, width]),
x2 = d3.time.scale().range([0, width]),
y = d3.scale.linear().range([height, 0]),
y2 = d3.scale.linear().range([height2, 0]);
// 设置映射目标定义域

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
yAxis = d3.svg.axis().scale(y).orient("left");
// 由映射目标定义域的数值范围设置XY轴参数

var area = d3.svg.area().interpolate("monotone").x(function(d) {
    return x(d.date);
}).y0(height).y1(function(d) {
    return y(d.price);
});
// 设置绘制区域路径参数

var area2 = d3.svg.area().interpolate("monotone") //设置插值模式，是离散点区域连续
.x(function(d) {
    return x2(d.date);
}).y0(height2).y1(function(d) {
    return y2(d.price);
});
// 设置绘制区域路径参数

var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
// 绘制创建svg
svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", width).attr("height", height);
// 绘制截断区域
var focus = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g").attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

focus.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")")
// .call(xAxis);
// 绘制x轴

focus.append("g").attr("class", "y axis")
// .call(yAxis);
// 建立Y轴

context.append("g").attr("class", "x axis").attr("transform", "translate(0," + height2 + ")")
// .call(xAxis2);
// 建立x轴

var dataArray = [];

// 以上公共部分 #########################################################

function datachange(files, i) {
    d3.csv(files,
    function(error, data) {

        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.price = +d.price;

        });
        // 处理转化数据
        // x.domain(d3.extent(data.map(function(d) { return d.date; })));
        // y.domain([0, d3.max(data.map(function(d) { return d.price; }))]);
        // x2.domain(x.domain());
        // y2.domain(y.domain());
        x.domain(d3.extent(data.map(function(d) {
            return d.date;
        })));
        y.domain([0, 2000]);
        x2.domain(x.domain());
        y2.domain(y.domain());
        //设置初始定义域

        // console.log(data);
        dataArray.push(data);

        focus.select(".y.axis").call(yAxis);
        focus.select(".x.axis").call(xAxis);
        context.select(".x.axis").call(xAxis2);
        // 绘制xy轴
        focus.insert("path", ":first-child").datum(data).attr("clip-path", "url(#clip)").attr("d", area).attr("class", i);
        // 绘制图形区域
        context.insert("path", ":first-child").datum(data).attr("d", area2).attr("class", i);
        // 绘制图形区域

        // svg.selectAll(".bar").data(data)
        //   .enter().insert("rect",".path_4")
        //     .attr("class", "bar")
        //     .attr("x", function(d) { return x(d.date); })
        //     .attr("width", 2)
        //     .attr("y", function(d) { return y(d.price); })
        //     .attr("height", function(d) { return height - y(d.price); });

    });
}
datachange("sp501.csv", "path_1");
datachange("sp500.csv", "path_2");
datachange("sp502.csv", "path_3");
datachange("sp503.csv", "path_4");
//############################################################
console.log(dataArray);

var brush = d3.svg.brush().x(x2).on("brush", brush);
// 绑定处理brush事件
context.append("g").attr("class", "x brush").call(brush).selectAll("rect").attr("y", -6).attr("height", height2 + 7);
// 添置brush事件
function brush() {
    x.domain(brush.empty() ? x2.domain() : brush.extent()); //将x的初值定义域设置为x2初值（已清空），选中的初值域（未清空）
    focus.selectAll("path").attr("d", area); //重新绘制区域
    // console.log(brush.extent());
    focus.select(".x.axis").call(xAxis); //重新绘制x轴
    focus.select(".y.axis").call(yAxis);

}

// date_Array.push([dataArray[0][i].date,x(dataArray[0][i].date),dataArray[0][i].price])
//显示详情
focus.select(".x.axis").on("mouseover",
function() {
    // console.log(d3.mouse(this)[0]);
    // console.log(Math.floor(x(dataArray[0][3].date)));
    for (i in dataArray[0]) {
        if (Math.floor(x(dataArray[0][i].date)) <= d3.mouse(this)[0] + 3 && Math.floor(x(dataArray[0][i].date)) >= d3.mouse(this)[0] - 3) {
            console.log(dataArray[0][i].date, dataArray[0][i].price);
            var p = document.getElementsByClassName("text")[0];
            var br = document.createElement("br");
            var q1 = document.createTextNode("时间：" + dataArray[0][i].date);
            var q2 = document.createTextNode("价格：" + dataArray[0][i].price);
            while (p.firstChild) {
                p.removeChild(p.firstChild)
            }
            p.appendChild(q1);
            p.appendChild(br);
            p.appendChild(q2);
        }
    }
})