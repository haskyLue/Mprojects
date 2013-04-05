// chrome.browserAction.onClicked.addListener(function (tab) {
// 	chrome.browserAction.getBadgeText({tabId: tab.id}, function (result) {//设置browser action的badge文字，badge 显示在图标上面,text,tab可选重置
// 		if (result === 'ON') {
// 			chrome.browserAction.setBadgeText({text: '', tabId: tab.id});
// 			chrome.tabs.sendMessage(tab.id, {pickMode: false});
// 		} else {
// 			chrome.browserAction.setBadgeText({text: 'ON', tabId: tab.id});
// 			chrome.browserAction.setBadgeBackgroundColor({color: '#3FA9F5', tabId: tab.id});
// 			chrome.tabs.sendMessage(tab.id, {pickMode: true});
// 		}
// 	});
// });
