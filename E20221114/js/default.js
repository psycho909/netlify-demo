var Share = {
	getMeta: function () {
		var meta = document.getElementsByTagName("meta");
		var desc;
		for (var i = 0; i < meta.length; i++) {
			if (meta[i].name === "description") {
				desc = meta[i].content;
			}
		}
		return desc;
	},
	fb: function () {
		var url = location.href;
		var t = "";
		if (isMobile.any) {
			var winRef = window.open(url, "_blank");
			var fbHtml_url = window.location.toString();
			winRef.location = "http://www.facebook.com/sharer/sharer.php?u=" + fbHtml_url;
		} else {
			window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(t), "sharer", "toolbar=0,status=0,width=626,height=436");
		}
	},
	mobileShare: function (url) {
		var url = url || location.href;
		var t = this.getMeta();
		var title = document.getElementsByTagName("title")[0].innerHTML;
		var shareData = {
			url: url, // 要分享的 URL
			title: title, // 要分享的標題
			text: t, // 要分享的文字內容
		};
		if (isMobile.any) {
			if (navigator.share) {
				navigator.share(shareData);
			} else {
				this.fb();
			}
		} else {
			this.fb();
		}
	},
};

// 骰子動畫
function animSprite(obj, callback) {
	var _data = {
		target: "",
		fps: 60,
		steps: 12,
		loop: false,
	};
	for (var o in obj) {
		_data[o] = obj[o];
	}
	var time = null;
	var fpsTotal = 0;
	var times = 0;
	if (_data.target.attr("data-anim") === undefined || _data.target.attr("data-anim") === "false") {
		_data.target.attr("data-anim", true);
	} else {
		return;
	}
	function animRun(obj, callback) {
		fpsTotal++;
		if (fpsTotal >= obj.steps && !obj.loop) {
			clearTimeout(time);
			obj.target.attr("data-anim", false);
			obj.target.css("transform", "translateX(0%)");
			if (callback) {
				callback();
			}
		} else {
			time = setTimeout(function () {
				if (fpsTotal >= obj.steps) {
					times = 0;
					fpsTotal = 0;
				} else {
					times += 100 / obj.steps;
				}
				obj.target.css("transform", "translateX(-" + times + "%)");
				animRun(obj, callback);
			}, 1000 / obj.fps);
		}
	}
	animRun(_data, callback);
}

animSprite({
	target: $(".play-knight__sprite-img"),
	fps: 8,
	steps: 12,
	loop: true,
});

$(".menu-ul").mCustomScrollbar({
	theme: "light",
});

var oMusic = document.getElementById("music");

// 音樂控制按鈕
$(".header-music__btn").on("click", function () {
	if (!$(this).hasClass("on")) {
		$(this).addClass("on");
		oMusic.muted = false;
		oMusic.loop = true;
		oMusic.play();
	} else {
		$(this).removeClass("on");
		oMusic.muted = true;
		oMusic.pause();
	}
});

// 選單控制
$(".menu-btn").on("click", function () {
	$(".menu-wrap").toggleClass("on");
});

// 怎麼玩 按鈕
$(".play-lb__btn-how").on("click", function () {
	$.gbox.open(howHTML, howObj);
});

// 手機板領獎提醒
function calenderCall(target, data) {
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
		if (navigator.userAgent.match("CriOS")) {
			DefaultText({
				text: "IOS玩家使用Safari開啟頁面即可獲此提醒。",
			});
			return;
		}
		if (navigator.userAgent.match("Line")) {
			DefaultText({
				text: "IOS玩家使用Safari開啟頁面即可獲此提醒。",
			});
			return;
		}
		if (navigator.userAgent.match("FB")) {
			DefaultText({
				text: "IOS玩家使用Safari開啟頁面即可獲此提醒。",
			});
			return;
		}
		calenderEvent = myCalendar.ical;
	}
	$(target).attr("href", calenderEvent);
}

var _event = {
	title: "天堂R 勇士誕生祭壇 領獎提醒 | 國際服", // 行事曆 標題 (可輸入可不輸入)
	start: new Date("2021/04/08 16:30:00"), // 行事曆 什麼時候開始
	end: new Date("2021/05/20 10:30:00"), // 行事曆 什麼時候結束
	description: "天堂R 勇士誕生祭壇 領獎提醒 | 國際服", // 行事曆 描述 (可輸入可不輸入)
};

isMobile.any ? calenderCall($(".call-fixed"), _event) : "";

function GetServerTime() {
	var serverTime = +new Date($.ajax({ async: false }).getResponseHeader("Date"));
	return serverTime;
}

loadingProgress({
	loadedFN: function () {
		// ItemRender(share);
		// console.log(100);
	},
});
