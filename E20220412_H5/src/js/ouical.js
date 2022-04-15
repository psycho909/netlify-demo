function calenderCall(data, target) {
	var browserList = ["Messenger", "CriOS", "Line", "FB", "EdgiOS", "FxiOS"];
	var _default = {
		title: "",
		start: new Date("2020/08/18 16:00:00"),
		duration: 120,
		end: new Date("2020/08/18 18:00:00"),
		description: "",
	};
	var calenderData = $.extend(_default, data);
	var myCalendar = createCalendar({
		data: calenderData,
	});
	var calenderEvent = "";

	if (isMobile.android.device) {
		calenderEvent = myCalendar.google;
	}
	if (isMobile.apple.device) {
		var userAgent = navigator.userAgent;
		var _safari = userAgent.match("Safari");
		var _list = userAgent.match(/[a-z]+/gi);
		var target;
		for (var i = 0; i < browserList.length; i++) {
			for (var j = 0; j < _list.length; j++) {
				if (_list[j] == browserList[i]) {
					target = browserList[i];
					break;
				}
			}
		}
		if (!_safari) {
			alert("IOS玩家使用Safari開啟頁面即可獲此提醒。");
			$("#app").html("IOS玩家使用Safari開啟頁面即可獲此提醒。");
			return;
		}
		if (_target) {
			alert("IOS玩家使用Safari開啟頁面即可獲此提醒。");
			$("#app").html("IOS玩家使用Safari開啟頁面即可獲此提醒。");
			return;
		} else {
			calenderEvent = myCalendar.ical;
		}
	}
	target ? $(target).attr("href", calenderEvent) : (window.location.href = calenderEvent);
}

var _data = {
	title: "天堂國際服 勇士誕生祭壇 領獎提醒", // 行事曆 標題 (可輸入可不輸入)
	start: new Date("2021/03/25 17:00:00"), // 行事曆 什麼時候開始
	end: new Date("2021/03/25 17:00:00"), // 行事曆 什麼時候結束
	description: "天堂國際服 勇士誕生祭壇 領獎提醒", // 行事曆 描述 (可輸入可不輸入)
};

isMobile.any ? calenderCall(_data, $(".call-fixed")) : "";
