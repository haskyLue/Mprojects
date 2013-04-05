google.load("visualization", "1.0", {
    packages: [ "corechart", "table", "treemap" ]
});

(function($) {
    var _VisiualType = [], _DataBasedLibs = {
        Googles: {
            corechart: [ "PieChart", "AreaChart", "BarChart", "BubbleChart", "CandlestickChart", "ColumnChart", "ComboChart", "LineChart", "ScatterChart", "SteppedAreaChart" ],
            other: [ "Table", "TreeMap" ]
        },
        D3: ""
    }, _Options = {
        useGoogle: true,
        useD3: false,
        datas: [],
        lables: [],
        visiualTypes: "",
        targetId: "",
        googleOptions: {}
    };
    function checkDatas(datas_, lables_) {
        if (!$.isArray(lables_) || !$.isArray(datas_)) {
            throw new Error("keep lables,datas Array");
        } else if (!$.isArray(datas_[0])) {
            throw new Error("keep datas 2D Array");
        } else {
            var tmpArray = datas_[0], tmp;
            for (var i = 0; i < tmpArray.length; i++) {
                tmp = tmpArray[i] === null ? "string" : $.isArray(tmpArray[i]) ? "timeofday" : Object.prototype.toString.call(tmpArray[i]).split(" ")[1].slice(0, -1).toLowerCase();
                if (tmp === "date") {
                    tmp = tmpArray[i].toString().indexOf("00:00:00") === -1 ? "datetime" : "date";
                }
                _VisiualType.push(tmp);
            }
        }
    }
    function checkType(types_) {
        var t1 = _DataBasedLibs.Googles.corechart, t2 = _DataBasedLibs.Googles.other, len = Math.max(t1.length, t2.length);
        for (var i = 0; i < len; i++) {
            if (types_ === t1[i] || types_ === t2[i]) {
                return true;
            }
        }
        throw new Error("type errors");
    }
    function CreateV(datas_, lables_, types_, id_) {
        var DataTable = new google.visualization.DataTable(), chart, options, len = datas_[0].length;
        for (var i = 0; i < len; i++) {
            DataTable.addColumn(_VisiualType[i], lables_[i]);
        }
        DataTable.addRows(datas_);
        options = {
            title: "google visualization based on jQuery",
            width: 700,
            height: 500,
            hAxis: {
                title: "Xline"
            },
            Axis: {
                title: "Yline"
            }
        };
        $.extend(options, _Options.googleOptions);
        eval("var chart = new google.visualization." + types_ + "(document.getElementById('" + id_ + "'))");
        chart.draw(DataTable, options);
    }
    function checkWhenStart(Options_) {
        try {
            if (!Options_.useGoogle && !Options_.useD3) throw "keep at least one Lib open";
            if (Options_.useD3) throw "no support for D3 right now";
            if (!Options_.targetId) throw "please set a div wrapper for this visualization";
            if (!Options_.datas || !Options_.visiualTypes || !Options_.lables) throw "datas,visiualTypes,lables is must";
            if (!Options_.googleOptions) console.warn("you've not set googleVisiualization options");
            if (typeof google == "undefined") throw "make sure google ajax api is loaded";
        } catch (err) {
            alert(err.message);
        }
    }
    $.fn.Jvisiuals = function(Options_, callback) {
        if (Options_) {
            $.extend(_Options, Options_);
            checkWhenStart(_Options);
        }
        if (_Options.useGoogle) {
            checkDatas(_Options.datas, _Options.lables);
            checkType(_Options.visiualTypes);
            google.setOnLoadCallback(CreateV(_Options.datas, _Options.lables, _Options.visiualTypes, _Options.targetId));
        }
        if (callback) {
            callback();
        }
    };
})(jQuery);