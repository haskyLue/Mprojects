document.addEventListener('DOMContentLoaded', function() {
			$(".option").bind("click", function(event) {
						$(".option").not(event.target).removeClass("selected");
						$(event.target).addClass("selected");
						if ($(event.target).attr("id") == "op1") {
								chrome.tabs.query({
											currentWindow : true,
											active : true
										}, function(Tab) {
											Tab = Tab[0];
											chrome.tabs.sendMessage(Tab.id, {
														pickMode : true
													}, function(response) {
														console.dir(response);// 显示对象属性及方法
														console.trace();// 跟踪函数
													})
										})								
						}
					})
		})