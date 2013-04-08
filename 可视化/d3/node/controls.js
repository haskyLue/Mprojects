var mouse_event1 = function() {
    d3.selectAll(".node").on("mouseover",
    function() {
        var p = d3.event.target;
        // console.log(p.parentNode);
        s = p.parentNode.attributes.class.value; //全局
        p.parentNode.attributes.class.value += " hover";
        //------------------------字体
        var selectednodes = p.parentNode.__data__;
        var selections = svg.selectAll("path");
        for (i in nodesArray) {
            if (nodesArray[i] == selectednodes) {
                newnodes = tree.nodes(nodesArray[i]);
                newlinks = tree.links(newnodes);
            }
        }
        // console.log(newlinks);
        for (i = 0; i < newlinks.length; i++) {
            for (j = 0; j < selections[0].length; j++) {
                if (selections.data()[j].source == newlinks[i].source && selections.data()[j].target == newlinks[i].target) {
                    selections[0][j].attributes.class.value += " selectedlinks";
                }
            }
        }
        // for (i = 0; i < selections[0].length; i++) {
        //     if (selections.data()[i].source == selectednodes) {
        //         selections[0][i].attributes.class.value += " selectedlinks";
        //     }
        // }
        var contents = selectednodes.info;
        showtips(contents);
    })
}
var mouse_event2 = function() {
    d3.selectAll(".node").on("mouseout",
    function() {
        d3.event.target.parentNode.attributes.class.value = s;
        svg.selectAll(".link").attr("class", "link");
        p.style.display = "none";
    })
}

var mXY;
var showtips = function(contents) {
    p = document.getElementById("tips");
    p.style.top = mXY.y + 20 + "px";
    p.style.left = mXY.x + 20 + "px";
    p.style.display = "block";
    //contents
    var toclear = document.getElementsByTagName("p")[0];
    var para = document.createElement("p");
    var text = document.createTextNode(contents);
    p.removeChild(toclear);
    para.appendChild(text);
    p.appendChild(para);

}
document.onmousemove = function(event) {
    mXY = {
        "x": event.clientX,
        "y": event.clientY
    };
    // console.log(mXY.x)
    return mXY;
}