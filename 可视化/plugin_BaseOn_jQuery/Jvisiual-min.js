google.load("visualization","1.0",{packages:["corechart","table","treemap"]}),function($){function checkDatas(a,b){if(!$.isArray(b)||!$.isArray(a))throw Error("keep lables,datas Array");if(!$.isArray(a[0]))throw Error("keep datas 2D Array");for(var c,d=a[0],e=0;d.length>e;e++)c=null===d[e]?"string":$.isArray(d[e])?"timeofday":Object.prototype.toString.call(d[e]).split(" ")[1].slice(0,-1).toLowerCase(),"date"===c&&(c=-1===(""+d[e]).indexOf("00:00:00")?"datetime":"date"),_VisiualType.push(c)}function checkType(a){for(var b=_DataBasedLibs.Googles.corechart,c=_DataBasedLibs.Googles.other,d=Math.max(b.length,c.length),e=0;d>e;e++)if(a===b[e]||a===c[e])return!0;throw Error("type errors")}function CreateV(datas_,lables_,types_,id_){for(var DataTable=new google.visualization.DataTable,chart,options,len=datas_[0].length,i=0;len>i;i++)DataTable.addColumn(_VisiualType[i],lables_[i]);DataTable.addRows(datas_),options={title:"google visualization based on jQuery",width:700,height:500,hAxis:{title:"Xline"},Axis:{title:"Yline"}},$.extend(options,_Options.googleOptions),eval("var chart = new google.visualization."+types_+"(document.getElementById('"+id_+"'))"),chart.draw(DataTable,options)}function checkWhenStart(a){try{if(!a.useGoogle&&!a.useD3)throw"keep at least one Lib open";if(a.useD3)throw"no support for D3 right now";if(!a.targetId)throw"please set a div wrapper for this visualization";if(!a.datas||!a.visiualTypes||!a.lables)throw"datas,visiualTypes,lables is must";if(a.googleOptions||console.warn("you've not set googleVisiualization options"),"undefined"==typeof google)throw"make sure google ajax api is loaded"}catch(b){alert(b.message)}}var _VisiualType=[],_DataBasedLibs={Googles:{corechart:["PieChart","AreaChart","BarChart","BubbleChart","CandlestickChart","ColumnChart","ComboChart","LineChart","ScatterChart","SteppedAreaChart"],other:["Table","TreeMap"]},D3:""},_Options={useGoogle:!0,useD3:!1,datas:[],lables:[],visiualTypes:"",targetId:"",googleOptions:{}};$.fn.Jvisiuals=function(a,b){a&&($.extend(_Options,a),checkWhenStart(_Options)),_Options.useGoogle&&(checkDatas(_Options.datas,_Options.lables),checkType(_Options.visiualTypes),google.setOnLoadCallback(CreateV(_Options.datas,_Options.lables,_Options.visiualTypes,_Options.targetId))),b&&b()}}(jQuery);