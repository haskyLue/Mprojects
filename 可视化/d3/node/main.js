var diameter = 960;

var tree = d3.layout.tree().size([360, diameter / 2 - 120]) //定义tree布局的大小
.separation(function(a, b) {
    return (a.parent == b.parent ? 1 : 2) / a.depth;
}); //设置相邻节点的距离
var diagonal = d3.svg.diagonal.radial() //创建关系路径生成器(放射状)
.projection(function(d) {
    return [d.y, d.x / 180 * Math.PI];
}); //将聚群图（cluster）处理为发散状（radial）；设置每条路径映射的起始或者终点的xy坐标，y定义半径像素，x定义角度
var svg = d3.select("body").append("svg").attr("width", diameter).attr("height", diameter).append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var nodesArray = [],
linksArray = []; //全局数组存储节点，连接信息
d3.json("sast.json",function(error, root) {
    var nodes = tree.nodes(root),
    //节点数组
    links = tree.links(nodes); //节点映射关系数组（source，target） 
    nodesArray = nodes;
    linksArray = links;

    var link = svg.selectAll(".link").data(links).enter().append("path").attr("class", "link").attr("d", diagonal); //创建关系路径
    var node = svg.selectAll(".node").data(nodes).enter().append("g").attr("class", "node").attr("transform",
    function(d) {
        return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
    })

    node.append("circle").attr("r", 4.5);

    node.append("text").attr("dy", ".31em").attr("text-anchor",
    function(d) {
        return d.x < 180 ? "start": "end";
    }).attr("transform",
    function(d) {
        return d.x < 180 ? "translate(8)": "rotate(180)translate(-8)";
    }).text(function(d) {
        return d.name;
    });

    //样式调整
    (function() {
        for (i = 0; i < d3.selectAll("text")[0].length; i++) {
            var s = d3.selectAll("text")[0][i].textContent;
            if (s == "主席团 办公中心" || s == "主席团 创新中心" || s == "主席团 技术中心") {
                console.log("!!!!!!!");
                d3.selectAll("text")[0][i].parentNode.attributes.class.value = "chairperson node";
            }
        }
    })();
    mouse_event1();
    mouse_event2();

});