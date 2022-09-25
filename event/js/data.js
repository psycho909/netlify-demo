var IsAjax = true;
var AccountToken;

function GetAccountToken() {
	AccountToken = $("#AccountToken").val() || "m0QKVNGD+Kn7TEF7sdANI+Psd1kr1/CJOe+KKdcOCw0RYmokaa+kLgFs5MrcBQxPdWwOcE7zAAk6MP+VUzVkCRJPP3//R8XF++o22OONX+eV/tj3tOafq7EoL8mEkMku2IFi3KnTLSSJSJetvMK8gS09D0VpOCTMZyIYowTvPpOgFQ3lJ0RO2fcvxJ9mfx8HcFk2dNwyoTI+aJlZcGwz2uSVUxL/aIrhbyKVtvWw+kXMxjGHM2GzTurA4cXHXkivF0KPO4y0eq2zYWjZOvF9IgHKoxiyXUed89pfU+PZn7ks4d3+pFYAsSvkfGxhRi3Yp0u8UbvpFWPZFUIvouY6AxkQwlQxt3h0RZs4ds9300u0UIfiE+w66U1lGXHyP0dSbbeZr3ddh6U1dhVI3exOYFXW2BB8FWr6EbrBMKjHBJIh5AriEkr3JkSOMy2q10B6d5eLLAkSI4HTmWOTop4ZDoOnwsNUlsofJVh16D+d06EfmFjjgnrcoh4gmvDJiPPSSHHE5Rhvy2M6u6iKdNHTrPp1Xtxptd1+LfYOTuM/Co7CykMqtdMGC16deT9Hyky4I9lkj3fKUDB9oRdsU6q0DXxeo/FM9/g+eSbSbfMXmdcMW3c7jq1emHbGopVI7nnq9ADUHeoxyeauDOlhR+Z1n9JrBTuO5rliPOLHyY6yjURV1ziPtEbotto/uPt6MzcAOSLgcEbjSQsBUS1hNCrRJjCunlOg6HeudH9NxsZUJi1kFbKoRjR7Tdvrge9nFYCWBjX2G3VoIfdCTLw4O2xBaVpYS6Jr2dl5lKgl/ze2cFmG/2g6BDqt/DvxEPHhj/nc5mOY3wrFL95UdT/wIHdP5dP4IgL0g7gJT3zc6r0BujBe2Ck2qnUbqFKIuh1O9I1OKct23utqgRO3pTYkGyEX5h5jrA77VvR00fbq7wyFs4gw40nwiJav2A7kZlMEFR4V9W08CIExMVUg7sQSwJu57Nhx8+q2voigz80W327+x29qZk7XDAHkKaf9l0SFmG8GD11+MBeAH6JQmIe/xA3sSchOWnIfRLb1p3cgzHl+vyoossDYqERHX2J/Y55gtyrGvtuo4dN4SlZOnAx2WdE+vbLXCNuAAsR7HmRKlcWXF7SzO9FXfaD8mkLA9Lj4+jgFFcNQeAJDdfyLkn4JqKpoAg+oncsqKeDcH6ve4y8hCH5+ncdCR7eSucpvfDhWavR7amlrQaYqodkJeuaRe+pEEEIOPpCVPz6eyZMI39sdLJZDI6TJnhC5LCFgYUKVG0rbi35/swy+7qYfLb0Yvobw1GRvKvnmu7eqVsKY8Qwarn1dvb8vkebWMnkMZADRHbjAXILNnd+vRfSpb3Q1fWumjESCEfe221aHr61YboZPwC+12pYQ1nxEOeD2/ITLtGmTBA+F7lZzd0OD1LXP7Gconj2fVr9i9TRaQ43abhqvVYCQ1ZytVLSNLZUs/OQ+HNl9x8FsK0LQ4QGVqt5aGpl7ofskNGiEdF9I7AQKGVqU11kk/zjmeGH8uIOL829/1Qj1aDzjjZ70YjyqN6uvw8jwKTtekQIRv3Sx1MalreL8C8AynClHRqJzSwH0weaQ52vF+prKEb9oIAbYSPTcxketn/ot5PIaZUKX1TOgIAGTFYMAg3NwLTcTKylTwkDMXVGuZvDfe8NK36HTDL6QKzh7S+EmgEF7QS1Bhc83nRaX90S/OGdV2zQAe1KKadeZTqIxVwWo8ocanJ7YmAIN79uNZeMZqlRKEBhPrcE6+mYoXLOWQ0/PgZymdpk2XPmduVDDAC1BLJZQlBrmSSZdSricRg==";
	return AccountToken;
}

var Mobj = [];
var Wobj = [];
var M = 12;
var W = 5;
// 玩家任務列表與狀態
function GetMission(type) {
	if (!IsAjax) return;
	IsAjax = false;
	if (AccountToken == null || AccountToken == undefined) {
		location.href = "Logout.aspx";
		return;
	}
	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_J/GetMission";
	var data = {
		AccountToken: GetAccountToken(),
	};
	if (Mobj.length == 0 && Wobj.length == 0) {
		$.ajax({
			url: url,
			method: "POST",
			data: JSON.stringify(data),
			cache: false,
			success: function (data) {
				var mission = data.E20201209_UserData;
				for (var i = 1; i <= M; i++) {
					var obj = {};
					obj["M" + i] = mission["M" + i];
					obj["M" + i + "_Name"] = mission["M" + i + "_Name"];
					obj["M" + i + "_Unit"] = mission["M" + i + "_Unit"];
					obj["M" + i + "_Status"] = mission["M" + i + "_Status"];
					Mobj.push(obj);
				}
				for (var i = 1; i <= W; i++) {
					var obj = {};
					obj["W" + i] = mission["W" + i];
					obj["W" + i + "_Name"] = mission["W" + i + "_Name"];
					obj["W" + i + "_Unit"] = mission["W" + i + "_Unit"];
					obj["W" + i + "_Status"] = mission["W" + i + "_Status"];
					Wobj.push(obj);
				}
				switch (type) {
					case "person":
						$.gbox.open(taskPersonRender(Mobj), taskPersonObj);
						return;
					case "world":
						$.gbox.open(taskWorldRender(Wobj), taskPersonObj);
						return;
				}
			},
		});

		IsAjax = true;
	} else {
		IsAjax = true;
		switch (type) {
			case "person":
				$.gbox.open(taskPersonRender(Mobj), taskPersonObj);
				return;
			case "world":
				$.gbox.open(taskWorldRender(Wobj), taskPersonObj);
				return;
		}
	}
}

var HallofFameBetList;
var HallofFameList = [];
var HalloFameRankList;

// 20201209
var swiper = false;

// 20201209
function unSwiper() {
	if (swiper) {
		$(".glory__slider-wrapper").slick("destroy");
		swiper = false;
	}
}
// 20201209
function checkSwiper() {
	swiper = true;
	$(".glory__slider-wrapper").slick({
		centerMode: true,
		centerPadding: "0px",
		slidesToShow: 3,
		slidesToScroll: 1,
	});
}

// 名人堂列表
function GetHallofFame() {
	if (!IsAjax) return;
	IsAjax = false;
	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_J/GetHallofFame";
	var data = {
		AccountToken: GetAccountToken(),
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}
	$.ajax({
		url: url,
		data: JSON.stringify(data),
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(GHL)";
			ErrorText(message, "Logout.aspx");

			isAjax = true;
		},
		success: function (data) {
			IsAjax = true;
			if (!data.IsSuccess) {
				ErrorText(data.ErrorText, data.Url);
				return;
			}
			HallofFameBetList = data.List_E20201209_HallofFame;

			$.gbox.open(gloryBetRender(HallofFameBetList), gloryBetObj);
		},
	});
}

// 分享分數Bar
// 修改20201203
function ShareCntBar(cnt) {
	var per = 100 / 7;
	var range = [0, 5000, 10000, 20000, 30000, 50000, 70000, 100000];
	var share = 0;
	range.forEach(function (v, i) {
		if (cnt > v) {
			if (range[i + 1]) {
				var r = range[i + 1] - range[i];
				share = ((cnt - range[i]) / r) * per + i * per;
			} else {
				share = 100;
			}
		}
	});
	$(".glory__share-bar").css("width", share + "%");
}

// 名人堂列表&分享數&排行表
var isLike = true;

function HallofFameLoad() {
	if (!IsAjax) return;
	IsAjax = false;
	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_J/HallofFameLoad";
	var data = {
		AccountToken: GetAccountToken(),
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}
	$.ajax({
		url: url,
		data: JSON.stringify(data),
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(HFL)";
			ErrorText(message, "Logout.aspx");

			isAjax = true;
		},
		success: function (data) {
			IsAjax = true;
			if (!data.IsSuccess) {
				// ErrorText(data.ErrorText, data.Url);
				return;
			}
			var ShareCnt = data.ShareCnt;
			isLike = data.IsLike;

			HallofFameList = data.List_E20201209_HallofFame;
			if (data.List_E20201209_HallofFame_Rank.length) {
				if ($(".glory__rank-coming").length) {
					$(".glory__rank-coming").remove();
					$(".glory__rank-title").show();
					$(".glory__rank-list").show();
					$(".glory__rank-sup").show();
				}
				HalloFameRankList = data.List_E20201209_HallofFame_Rank;
				// 修改20201208
				HalloFameRankList = HalloFameRankList.sort(function (a, b) {
					return a.Rank - b.Rank;
				});
				// 修改20201208

				var liHTML = "";
				HalloFameRankList.forEach(function (v, i) {
					var li = "<li>NO." + v.Rank + " " + v.Characteristic + "</li>";
					liHTML += li;
				});
				$(".glory__rank-list").html(liHTML);
				$(".glory__rank-week").text(weekList[HalloFameRankList[0]["Week"]]);
			} else {
				if (!$(".glory__rank-coming").length) {
					var comingHTML = '<div class="glory__rank-coming">\
						<div class="glory__rank-coming-text">排名將於<br>12/23公布</div>\
					</div>\
					';
					$(".glory__rank").prepend(comingHTML);
				}
				$(".glory__rank-title").hide();
				$(".glory__rank-list").hide();
				// $(".glory__rank-sup").hide();
			}

			ShareCntBar(ShareCnt);
			var slideHTML = "";
			for (var i = 0; i < HallofFameList.length; i++) {
				var slide = '<div class="glory__slider-slide swiper-slide swiper-no-swiping">\
                    <div class="glory__slider-role" data-seq="' + HallofFameList[i].Seq + '" data-char="' + HallofFameList[i].Class + '">\
                        <div class="glory__slider-btn-like"></div>\
                        <div class="glory__slider-role-light"></div>\
                        <div class="glory__slider-role-glory">' + HallofFameList[i].Characteristic + '</div>\
                        <div class="glory__slider-role-info">\
                            <span class="glory__slider-role-server">' + HallofFameList[i].Character + '</span>\
                            <span class="glory__slider-role-name">' + HallofFameList[i].ServerName + "</span>\
						</div>\
                    </div>\
                </div>";
				slideHTML += slide;
			}
			$(".glory__slider-wrapper").html(slideHTML);
			checkSwiper();
		},
	});
}

// 名人堂按讚
function Like(seq) {
	if (!IsAjax) return;
	IsAjax = false;
	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_J/Like";
	var data = {
		AccountToken: GetAccountToken(),
		HallofFameSeq: seq,
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}
	$.ajax({
		url: url,
		data: JSON.stringify(data),
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(LI)";
			ErrorText(message, "Logout.aspx");

			isAjax = true;
		},
		success: function (data) {
			IsAjax = true;
			if (!data.IsSuccess) {
				ErrorText(data.ErrorText, data.Url);
				return;
			}
			// 20201209
			$.gbox.open(data.SuccessText, defaultObj);
		},
	});
}

// 名人堂支持
function Support(seq, h5) {
	if (!IsAjax) return;
	IsAjax = false;

	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_J/Support";
	var data = {
		AccountToken: GetAccountToken(),
		HallofFameSeq: seq,
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}
	$.ajax({
		url: url,
		data: JSON.stringify(data),
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(SU)";
			ErrorText(message, "Logout.aspx");

			isAjax = true;
		},
		success: function (data) {
			IsAjax = true;
			if (!data.IsSuccess) {
				ErrorText(data.ErrorText, data.Url);
				return;
			}
			$.gbox.open(data.SuccessText);
		},
	});
}

function fbShare() {
	var url = location.href;
	var t = "";
	if (isMobile.any) {
		var winRef = window.open(url, "_blank");
		var fbhtml_url = window.location.toString();
		winRef.location = "http://www.facebook.com/sharer/sharer.php?u=" + fbhtml_url;
	} else {
		window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(t), "sharer", "toolbar=0,status=0,width=626,height=436");
	}
}

function getMeta(name) {
	var meta = document.getElementsByTagName("meta");
	var desc;
	for (var i = 0; i < meta.length; i++) {
		if (meta[i].name == name) {
			desc = meta[i].content;
		}
	}
	return desc;
}

// 手機板分享時使用
function mobileShare() {
	var url = location.href;
	var t = getMeta("description");
	var title = document.getElementsByTagName("title")[0].innerHTML;
	var shareData = {
		url: url, // 要分享的 URL
		title: title, // 要分享的標題
		text: t, // 要分享的文字內容
	};
	if (navigator.share) {
		navigator.share(shareData);
	} else {
		fbShare();
	}
}

// 分享按鈕
function Share() {
	if (!IsAjax) return;
	IsAjax = false;
	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_J/Share";
	var data = {
		AccountToken: GetAccountToken(),
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}
	$.ajax({
		url: url,
		data: JSON.stringify(data),
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(SH)";
			ErrorText(message, "Logout.aspx");

			isAjax = true;
		},
		success: function (data) {
			IsAjax = true;
			if (!data.IsSuccess) {
				ErrorText(data.ErrorText, data.Url);
				return;
			}
			var cnt = parseInt(data.ShareCnt);
			ShareCntBar(cnt);
			if (isMobile.any) {
				mobileShare();
			} else {
				fbShare();
			}
		},
	});
}

function StringToNum(str) {
	switch (str) {
		case "一":
			return 1;
		case "二":
			return 2;
		case "三":
			return 3;
		case "四":
			return 4;
	}
}

var GetSupportList = [];
// 支持紀錄
function GetSupportLog() {
	if (!IsAjax) return;
	IsAjax = false;
	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_J/GetSupportLog";
	var data = {
		AccountToken: GetAccountToken(),
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}
	if (GetSupportList.length == 0) {
		$.ajax({
			url: url,
			data: JSON.stringify(data),
			method: "POST",
			cache: false,
			error: function () {
				message = "系統異常(GSL)";
				ErrorText(message, "Logout.aspx");

				isAjax = true;
			},
			success: function (data) {
				IsAjax = true;
				if (!data.IsSuccess) {
					ErrorText(data.ErrorText, data.Url);
					return;
				}
				GetSupportList = data.List_E20201209_SupportLog;
				$.gbox.open(gloryBetStatusRender(GetSupportList), gloryBetStatusObj);
			},
		});
	} else {
		$.gbox.open(gloryBetStatusRender(GetSupportList), gloryBetStatusObj);
	}
}
// GetSupportLog()
var Marquee;
var ItemStats;
var ItemRewardInit = [];

var marqueeIndex = 0;
// 跑馬燈動畫
function MarqueeAnim(i) {
	TweenMax.set($(".gashapon__marquees").eq(i), {
		x: "100%",
		y: "-50%",
	});
	TweenMax.to($(".gashapon__marquees").eq(i), 5, {
		x: "0%",
		y: "-50%",
		onComplete: function () {
			TweenMax.to($(".gashapon__marquees").eq(i), 5, {
				x: "-100%",
				y: "-50%",
				delay: 1,
				onComplete: function () {
					marqueeIndex++;
					if (marqueeIndex >= Marquee.length) {
						marqueeIndex = 0;
					}
					MarqueeAnim(marqueeIndex);
				},
			});
		},
	});
}

function MarqueeInit(data) {
	marqueeIndex = 0;
	var spanHTML = "";
	for (var i = 0; i < data.length; i++) {
		spanHTML += '<span class="gashapon__marquees">' + data[i].Content + "</span>";
	}
	$(".gashapon__marquee-box").html(spanHTML);
	MarqueeAnim(marqueeIndex);
}

// 獎賞尚有數量
function ItemStatsInit(stats) {
	for (var i = 0; i < stats.length; i++) {
		$(".itemstats-num[data-type=" + stats[i].ItemType + "]")
			.find("span")
			.html(stats[i].ItemCnt);
	}
}

// 初始化(千萬轉蛋)
function Initialize() {
	if (!IsAjax) return;
	IsAjax = false;
	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_W/Initialize";
	var data = {
		AccountToken: GetAccountToken(),
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}

	$.ajax({
		url: url,
		data: data,
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(In)";
			ErrorText(message, "Logout.aspx");

			isAjax = true;
		},
		success: function (data) {
			IsAjax = true;
			console.log(2);
			if (!data.Success) {
				// ErrorText(data.ErrorText, data.Url);
				return;
			}
			var data = data.Data;
			var ItemRewardNormals;
			var ItemRewardSpecial;
			var ItemReward;

			ItemRewardInit = [];

			Marquee = data.Marquee;
			ItemStats = data.Stats;
			ItemReward = data.Reward;
			ItemRewardNormals = ItemReward.Normals;
			ItemRewardSpecial = ItemReward.Special["Data"];

			TweenMax.killTweensOf($(".gashapon__marquees"));
			MarqueeInit(Marquee);
			ItemStatsInit(ItemStats);
			$(".gashapon__counter-top").find("span").html(data.RewardCnt);
			$(".gashapon__counter-num").find("span").html(data.LogCnt);
			$(".gashapon__counter-key").find("span").html(data.KeyCnt);

			for (var i = 0; i < ItemRewardNormals.length; i++) {
				for (var j = 0; j < ItemRewardNormals[i]["Data"].length; j++) {
					ItemRewardInit.push(ItemRewardNormals[i]["Data"][j]);
				}
			}
			for (var i = 0; i < ItemRewardSpecial.length; i++) {
				var obj = {
					ItemType: "",
					ItemName: "",
					ItemCon: "",
					ItemCnt: 0,
				};
				obj["ItemType"] = "特殊獎項";
				obj["ItemCon"] = ItemRewardSpecial[i].ItemType;
				obj["ItemName"] = ItemRewardSpecial[i].ItemName;
				obj["ItemCnt"] = ItemRewardSpecial[i].ItemCnt;
				ItemRewardInit.push(obj);
			}
		},
	});
}

var Log;
var serverList;
// 獎勵查詢(千萬轉蛋)
function FindRewardLog() {
	if (!IsAjax) return;
	IsAjax = false;

	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_W/FindRewardLog";
	var data = {
		AccountToken: GetAccountToken(),
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		// location.href = "Logout.aspx";
		return;
	}

	$.ajax({
		url: url,
		data: data,
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(FRL)";
			// ErrorText(message, "Logout.aspx");

			isAjax = true;
		},
		success: function (data) {
			IsAjax = true;
			if (!data.Success) {
				ErrorText(data.ErrorText, data.Url);
				return;
			}
			if (data.Data == null) {
				ErrorText("目前沒有獎勵", null);
				return;
			}
			Log = data.Data.Log;
			Server = data.Data.Server;

			$.gbox.open(rewardSearchARender(Log, Server), rewardSearchAObj);
		},
	});
}

// 進行抽獎(千萬轉蛋)
function AddRewardLog() {
	if (!IsAjax) return;
	IsAjax = false;
	dragStop();
	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_W/AddRewardLog";
	var data = {
		AccountToken: GetAccountToken(),
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}

	$.ajax({
		url: url,
		data: data,
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(ARL)";
			ErrorText(message, "Logout.aspx");

			IsAjax = true;
			dragStart();
		},
		success: function (data) {
			//IsAjax = true;
			if (!data.Success) {
				IsAjax = true;
				ErrorText(data.ErrorText, data.Url);
				return;
			}
			var Item = data.Data.Reward;
			var actionArr = ["action1", "action2", "action3"];
			var randomAction = Math.floor(Math.random() * actionArr.length);
			$(".gashapon__main-btn").parent().addClass(actionArr[randomAction]);
			setTimeout(function () {
				$(".gashapon__main-btn").parent().removeClass(actionArr[randomAction]);
				$.gbox.open(gashaponGetRender("12323"), gashaponGetObj);
				//Initialize()
				dragStart();
			}, 1800);
		},
	});
}

// 領取獎勵(千萬轉蛋)
function AddItemToGameLog(info, reward) {
	if (!IsAjax) return;
	IsAjax = false;

	var url = "https://alpha-event.beanfun.com/LineageM/api/E20201209_W/AddItemToGameLog";
	var data = {
		AccountToken: GetAccountToken(),
		GameServer: info.GameServer,
		CharacterName: info.CharacterName,
		Reward: reward,
	};
	if (data.AccountToken == null || data.AccountToken == undefined || data.AccountToken == "") {
		location.href = "Logout.aspx";
		return;
	}

	$.ajax({
		url: url,
		data: data,
		method: "POST",
		cache: false,
		error: function () {
			message = "系統異常(AITGL)";
			ErrorText(message, "Logout.aspx");

			isAjax = true;
		},
		success: function (data) {
			IsAjax = true;
			if (!data.Success) {
				ErrorText(data.ErrorText, data.Url);
				return;
			} else {
				$.gbox.open("獎勵發送成功", defaultObj);
			}
		},
	});
}

// 錯誤訊息
function ErrorText(text, url) {
	$.gbox.open("<div class='error-text'>" + text + "</div>", {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {
			$(".gbox").prepend("<div class='layer-frame'></div>");
			setTimeout(function () {
				$(".gbox-close").addClass("error-close");
			}, 0);
		},
		afterClose: function () {
			if (url) {
				var href = location.href;
				var path = location.pathname;
				var pathSplit = location.pathname.split("/");
				var len = pathSplit.length;
				pathSplit[len - 1] = url;
				var newPath = pathSplit.join("/");
				location.href = href.replace(path, newPath);
			}
		},
	});
}
