var _pickMode = false;
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {      //接受来自后台或者注入脚本发送的消息
	if (request !== undefined && request !== null) {
		if (_pickMode !== request.pickMode) {
			_pickMode = request.pickMode;
			if (_pickMode) {
				(function(){
					$("body").css("position","relative");
					$(".chrome_backtotop").show(100);
					btop();
				})();
				sendResponse({msg: "OK"});
				
			} else {
				$(".chrome_backtotop").hide(100);
				sendResponse({msg: "off"});
			}
		}
	}
	console.dir(sender);
});
// 回到顶部
function btop(){
	$(".chrome_backtotop").click(function(){
		// window.scrollTo(0,0);
		$("body").animate({scrollTop:"0px"},700);
	})	
};
function init(){
	// (function(){
	// 	var p=document.createElement("script");
	// 	p.type="text/javascript";
	// 	p.src="http://code.jquery.com/jquery.min.js";
	// 	$("head").prepend(p);
	// })();//插入jquery
	(function(){
		divs=document.createElement("div");
		divs. setAttribute("class","chrome_backtotop");
		document.getElementsByTagName("body")[0].appendChild(divs);
	})();//创建点击div
	imgurl='url('+chrome.extension.getURL('img/backtotop.PNG')+') no-repeat center';
	$(".chrome_backtotop").css("background",imgurl).hide();
}
init();
// **************************************************************************************