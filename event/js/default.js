var smoking = false;
var smokingInit = false;
var mouseScroll = true;
var changePage = false;
var scrollPageIndex = 0;
var weekList = {
	一: "12/16 ~ 12/22",
	二: "12/23 ~ 12/29",
	三: "12/30 ~ 01/05",
	四: "01/06 ~ 01/12",
};
var scrollPage = [];
var $win = $(window);
if (isMobile.any) {
	var scrLeft = Math.abs(($win.width() - 1344) / 2);
} else {
	var scrLeft = Math.abs(($win.width() - 1920) / 2);
}
var mbOpen = false;

function checkH5() {
	var useragent = navigator.userAgent;
	var reg = /BeaGo/gi;
	if (useragent.indexOf("BeaGo") > -1 || reg.test(useragent)) {
		return true;
	}
}

function InitScrollPageArr() {
	$(".nav-li").each(function (v, i) {
		if ($(this).attr("data-page")) {
			var obj = { page: "", status: true };
			if ($(this).hasClass("coming")) {
				obj.status = false;
			}
			obj.page = $(this).attr("data-page");
			scrollPage.push(obj);
		}
	});
	scrollPage = scrollPage.filter(function (v) {
		return v.status;
	});
}

function getScrollIndex(page) {
	scrollPage.forEach(function (v, i) {
		if (v.page == page) {
			scrollPageIndex = i;
		}
	});
}

InitScrollPageArr();

//動態部分
// 修改20201126
function InitAnimate(page) {
	$("#smokeBg").show();
	$(window)
		.resize(function () {
			var imgW = 600;
			var imgH = 344;
			var ww = window.innerWidth;
			var vh = window.innerHeight;
			var s;
			if (ww / vh > imgW / imgH) {
				s = ww / imgW;
			} else {
				s = vh / imgH;
			}
			if (isMobile.any) {
				s = s * 1.5;
			}
			TweenMax.set($("#smokeBg"), {
				scale: s,
				x: "-50%",
				y: "-50%",
			});
		})
		.resize();

	$(".smoke_inner").animateSprite({
		fps: 20,
		loop: false,
		complete: function () {
			// use complete only when you set animations with 'loop: false'
			if ($(".smoke_inner").css("background-position") !== "0px 0px") {
				$("#smokeBg").css("display", "none");
				smoking = false;
				smokingInit = true;
				mouseScroll = true;
				changePage = true;
				var currPage = $("#app").attr("data-current");
				if (currPage != "main") {
					if (!$(".nav-wrap").hasClass("show")) {
						$(".nav-wrap").fadeIn();
						$(".nav-wrap").addClass("show");
					}
				} else {
					$(".nav-wrap").removeClass("show");
					$(".nav-wrap").hide();
				}
			}
		},
	});
	if (page) {
		contentOpacity(page);
	}
}

//----------煙霧特效
function smokeAniMotion(page) {
	$(".smoke_inner").css("background-position", "0 0");
	$("#smokeBg").css("display", "block");
	smoking = true;
	$(".smoke_inner").animateSprite("restart");
	if (page) {
		contentOpacity(page);
	}
}

function contentOpacity(page) {
	TweenMax.to($("." + page + " .section-contents"), 1.2, {
		autoAlpha: 1,
		delay: 1,
	});
}

var drag;
// 拖曳效果
function dragPage(page) {
	drag = Draggable.create(page + " .drag-wrap", {
		type: "scroll",
		edgeResistance: 1,
		throwProps: true,
	})[0];

	TweenMax.set(drag.scrollProxy, {
		scrollLeft: scrLeft,
		scrollTop: 0,
	});
}

function end(fn) {
	TweenMax.to(drag.scrollProxy, 0.6, {
		scrollLeft: scrLeft,
		scrollTop: 0,
		ease: Quint.easeOut,
	});

	videoRest($(".entry__video1"), 1, true).pause();
	// videoRest($(".entry__video1"), 0, false);
	videoRest($(".entry__video2"), 2, true).load();
	videoRest($(".entry__video2"), 2, true).play();
	elementScale($(".entry__contents"));
	if (fn) {
		fn();
	}
}

function entryEnd() {
	end(function () {
		videoEnded(".entry__video2", function () {
			dragPage(".main");
			$(".main").show();
			$(".entry").fadeOut();
			videoRest($(".main__video1"), 2, true).load();
			videoRest($(".main__video1"), 2, true).play();
			videoEnded(".main__video1", function () {
				videoRest($(".main__video1"), 2, true).pause();
				TweenMax.to($(".main__title"), 2, {
					autoAlpha: 1,
					scale: 1,
				});
				setTimeout(function () {
					videoRest($(".main__video1"), 0, false);
				}, 1000);
				videoRest($(".main__video2"), 2, true).load();
				videoRest($(".main__video2"), 2, true).play();
				TweenMax.to($(".main__btn-group"), 1, {
					y: "0",
					autoAlpha: 1,
					onComplete: function () {
						mouseScroll = true;
						changePage = true;
					},
				});
			});
		});
	});
}

function videoEnded(video, callback) {
	$(video)[0].onended = callback;
}
function videoPlaying(video, callback) {
	$(video)[0].onplaying = callback;
}
function elementScale(target) {
	TweenMax.to(target, 1.2, {
		autoAlpha: 0,
		scale: 1.3,
		ease: Quint.easeIn,
	});
}

function videoRest(video, zindex, isShow) {
	TweenMax.set(drag.scrollProxy, {
		scrollLeft: scrLeft,
		scrollTop: top || 0,
	});
	if (isShow) {
		video.show();
	} else {
		video.hide();
	}
	video.css("zIndex", zindex);
	return video[0];
}

dragPage(".entry");

TweenMax.set($(".main__title"), {
	scale: 2,
	autoAlpha: 0,
});

TweenMax.set($(".main__btn-group"), {
	y: "100",
	autoAlpha: 0,
});

// 調整20201126
$(".entry__btn").on("click", function () {
	BGO.check_app_exist(function (res) {
		if (res.result != undefined) {
			if ($("#AccountToken").val() === "") {
				ErrorText("查無天堂M帳號，請重新輸入", "Logout.aspx");
			}
		}
	});

	var change = $(this).attr("data-change");
	$("#app").attr("data-current", change);
	mouseScroll = false;
	if (isMobile.any && mbOpen) {
		dragPage(".main");
		$(".main").show();
		$(".entry").fadeOut();
		TweenMax.to($(".main__title"), 2, {
			autoAlpha: 1,
			scale: 1,
		});
		TweenMax.to($(".main__btn-group"), 1, {
			y: "0",
			autoAlpha: 1,
			onComplete: function () {
				mouseScroll = true;
				changePage = true;
			},
		});
	} else {
		entryEnd();
	}
});

$("body").on("click", ".nav-li", function () {
	if ($(this).hasClass("coming")) {
		return;
	}
	var current = $("#app").attr("data-current");
	var page = $(this).attr("data-page");
	if (page && changePage) {
		changePage = false;
		mouseScroll = false;
		$("#app").attr("data-current", page);
		navAddClass(page);
		if (current == "entry") {
			end(function () {
				videoEnded(".entry__video2", function () {
					$(".entry").hide();
					pageAnim(page);
				});
			});
		} else {
			pageAnim(page);
		}
	}
});

$(".main__btn").on("click", function () {
	if ($(this).hasClass("coming")) {
		return;
	}
	var current = $("#app").attr("data-current");
	var page = $(this).attr("data-page");
	if (page && changePage) {
		changePage = false;
		mouseScroll = false;
		$("#app").attr("data-current", page);
		navAddClass(page);
		if (current == "entry") {
			end(function () {
				videoEnded(".entry__video2", function () {
					$(".entry").hide();
					document.cookie = "Page=" + page;
					pageAnim(page);
				});
			});
		} else {
			pageAnim(page);
			document.cookie = "Page=" + page;
		}
	}
});

// 切換選單
function navAddClass(target) {
	$(".nav-li[data-page=" + target + "]")
		.addClass("current")
		.siblings()
		.removeClass("current");
}

function pageAnim(page) {
	location.hash = "#" + page;
	getScrollIndex(page);
	navAddClass(page);
	$(window).scrollTop(0);
	if (smokingInit) {
		smokeAniMotion(page);
	} else {
		InitAnimate(page);
	}
	$(".section[data-page=" + page + "]")
		.css("zIndex", 5)
		.show();
	$(".section")
		.not($(".section[data-page=" + page + "]"))
		.css("zIndex", 1)
		.hide();

	var currPage = $("#app").attr("data-current");
	if (currPage != "main") {
		if (!$(".nav-wrap").hasClass("show")) {
			$(".nav-wrap").fadeIn();
			$(".nav-wrap").addClass("show");
		}
		$(".UNI-footer").not(".drag-page").show();
		if (!isMobile.any) {
			$("body").css("overflow", "auto");
			$("body").css("min-width", "1200px");
		}
	} else {
		$(".nav-wrap").removeClass("show");
		$(".nav-wrap").hide();
		$(".UNI-footer").not(".drag-page").hide();
		if (!isMobile.any) {
			$("body").css("overflow", "hidden");
			$("body").css("min-width", "auto");
		}
	}

	// $("#app").css("overflow", "auto");

	BGO.check_app_exist(function (res) {
		if (res.result == undefined) {
			checkLogin($("#AccountToken"));
		}
	});

	if (page == "glory") {
		unSwiper();
		HallofFameLoad();
		var gloryRankLikeNotice = '<div class="glory-popup-box">\
		<div class="glory-popup-text">每日點讚！獲得每日抽獎次數1次！</div>\
		<div class="glory-popup-text">選擇一個想投票的名人堂玩家，預測成功可獲得更多轉蛋次數。</div>\
		<div class="glory-popup-close"></div>\
		</div>\
		';
		if (!getCookieValue("LMReady")) {
			if ($(".glory-popup-box").length == 0) {
				$(".glory .section-contents").append(gloryRankLikeNotice);
			}
		}
	}
	if (page == "main") {
		dragPage(".main");
		if (isMobile.any && mbOpen) {
			TweenMax.to($(".main__title"), 2, {
				autoAlpha: 1,
				scale: 1,
			});
			TweenMax.to($(".main__btn-group"), 1, {
				y: "0",
				autoAlpha: 1,
			});
		} else {
			videoRest($(".main__video1"), 2, true).load();
			videoRest($(".main__video1"), 2, true).play();
			videoEnded(".main__video1", function () {
				videoRest($(".main__video1"), 2, true).pause();
				TweenMax.to($(".main__title"), 2, {
					autoAlpha: 1,
					scale: 1,
				});
				setTimeout(function () {
					videoRest($(".main__video1"), 0, false);
				}, 1000);
				videoRest($(".main__video2"), 2, true).load();
				videoRest($(".main__video2"), 2, true).play();
				TweenMax.to($(".main__btn-group"), 1, {
					y: "0",
					autoAlpha: 1,
				});
			});
		}
	}
	if (page == "gashapon") {
		TweenMax.killTweensOf($(".gashapon__marquees"));
		openGashaponInfo();
		marqueeIndex = 0;
		Initialize();
	}
}

if ($(".info__content-img").length) {
	$(".info__content-img").mCustomScrollbar({
		theme: "light",
	});
}
if ($(".event__content-img").length) {
	$(".event__content-img").mCustomScrollbar({
		theme: "light",
	});
}

// 千萬轉蛋按鈕區
$(".gashapon__btn").on("click", function () {
	var btn = $(this).data().btn;
	switch (btn) {
		case "info":
			$.gbox.open(gashaponNoticeHTML, gashaponNoticeObj);
			return;
		case "list":
			$.gbox.open(rewardListRender(ItemRewardInit), rewardListObj);
			return;
		case "search":
			FindRewardLog();
			return;
		case "person":
			GetMission("person");
			return;
		case "world":
			GetMission("world");
			return;
		case "glory":
			GetSupportLog();
			return;
	}
});

// 千萬轉蛋按鈕區
$(".gashapon__menu-btn2").on("click", function () {
	var btn = $(this).data().btn;
	switch (btn) {
		case "info":
			$.gbox.open(gashaponNoticeHTML, gashaponNoticeObj);
			return;
		case "list":
			$.gbox.open(rewardListRender(ItemRewardInit), rewardListObj);
			return;
		case "search":
			FindRewardLog();
			return;
	}
});

$(".gashapon__menu-btn1").on("click", function () {
	var btn = $(this).data().btn;
	switch (btn) {
		case "person":
			GetMission("person");
			return;
		case "world":
			GetMission("world");
			return;
		case "glory":
			GetSupportLog();
			return;
	}
});

// 名人堂按鈕區
$(".glory__btn").on("click", function () {
	var btn = $(this).data().btn;
	switch (btn) {
		case "like":
			$.gbox.open(gloryLikeNoticeHTML, gloryNoticeObj);
			return;
		case "sup":
			$.gbox.open(gloryYYNoticeHTML, gloryNoticeObj);
			return;
		case "share":
			$.gbox.open(gloryShareNoticeHTML, gloryNoticeObj);
			return;
	}
});

$(".glory__menu-btn").on("click", function () {
	var btn = $(this).data().btn;
	switch (btn) {
		case "like":
			$.gbox.open(gloryLikeNoticeHTML, gloryNoticeObj);
			return;
		case "sup":
			$.gbox.open(gloryYYNoticeHTML, gloryNoticeObj);
			return;
		case "share":
			$.gbox.open(gloryShareNoticeHTML, gloryNoticeObj);
			return;
		case "rank":
			$.gbox.open(gloryRankRender(HalloFameRankList), gloryRankObj);
			return;
	}
});

var currTarget = {
	x: 0,
	y: 0,
};
function dragStop() {}
function dragStart() {}
// 轉蛋轉下去
$(".gashapon__main-btn").on("click", function () {
	AddRewardLog();
});

$(".gashapon__menu-open").on("click", function () {
	$(".gashapon__menu").addClass("show");
	$(".gashapon__menu-wrap").addClass("show");
	$("body").css("overflow", "hidden");
	$("#app").css("overflow", "hidden");
});
$(".gashapon__menu-close").on("click", function () {
	$(".gashapon__menu").removeClass("show");
	$(".gashapon__menu-wrap").removeClass("show");
	$("body").css("overflow", "auto");
	$("#app").css("overflow", "auto");
});

$(".glory__menu-open").on("click", function () {
	$(".glory__menu").addClass("show");
	$(".glory__menu-wrap").addClass("show");
	$("body").css("overflow", "hidden");
	$("#app").css("overflow", "hidden");
});
$(".glory__menu-close").on("click", function () {
	$(".glory__menu").removeClass("show");
	$(".glory__menu-wrap").removeClass("show");
	$("body").css("overflow", "auto");
	$("#app").css("overflow", "auto");
});

// 點讚
$("body").on("click", ".glory__slider-btn-like", function () {
	var seq = $(".slick-current").find(".glory__slider-role").attr("data-seq");
	Like(seq);
});

// 分享按鈕
$(".glory__share-btn").on("click", function () {
	Share();
});

// 支持
$(".glory__rank-sup").on("click", function () {
	GetHallofFame();
});

$(".glory__slider-btn-sup").on("click", function () {
	GetHallofFame();
});

// 判斷登入登出
function checkLogin(v) {
	var Logout = "Logout.aspx";
	var Login = "Login.aspx";

	if (v.val()) {
		$(".nav-li:not([data-page])").find("a").text("登出").attr("href", Logout);
	} else {
		$(".nav-li:not([data-page])").find("a").text("登入").attr("href", Login);
	}
}

function checkScrollEnd(e, page) {
	if ($("#gbox").length) {
		return false;
	}
	var page = page || scrollPage[scrollPageIndex].page;
	var h = $(document.body).height();
	var footer = $(".UNI-footer").outerHeight(true);
	if (page == "main" || page == "entry") {
		var pageHeight = $("." + page)
			.find(".draggabled")
			.outerHeight();
		var t = $("." + page)
			.find(".drag-wrap")
			.scrollTop();
		var total = pageHeight - h;
	} else {
		var pageHeight = $("." + page).outerHeight();
		var t = $(window).scrollTop();
		var total = pageHeight - h + footer;
	}
	if (h >= pageHeight) {
		return true;
	}

	if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
		if (Math.floor(t / total)) {
			return true;
		}
	}
	if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
		if (t == 0) {
			return true;
		}
	}

	return false;
}

function scrollPageRun() {
	var pageObj = scrollPage[scrollPageIndex];
	if (!pageObj.status) {
		return false;
	}
	navAddClass(pageObj.page);
	$("#app").attr("data-current", pageObj.page);
	$(this).addClass("current").siblings().removeClass("current");
	pageAnim(pageObj.page);
}

$(window).on("mousewheel DOMMouseScroll", function (e) {
	if (!isMobile.any) {
		if (!mouseScroll) return;
		// 滑鼠往下滾
		if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
			var currentPage = $("#app").attr("data-current");
			if (currentPage == "entry") {
				if (!checkScrollEnd(e, currentPage)) {
					return false;
				}
				mouseScroll = false;
				entryEnd();
			} else {
				if (!checkScrollEnd(e)) {
					return false;
				}
				if (scrollPageIndex == scrollPage.length - 1) {
					return false;
				}
				mouseScroll = false;
				scrollPageIndex++;
				if (scrollPageIndex == scrollPage.length) {
					scrollPageIndex = 0;
				}
				scrollPageRun();
			}
		}
		// 滑鼠往上滾
		if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
			var currentPage = $("#app").attr("data-current");
			if (currentPage != "entry") {
				if (!checkScrollEnd(e)) {
					return false;
				}
				if (scrollPageIndex == 0) {
					return false;
				}
				mouseScroll = false;
				scrollPageIndex--;
				if (scrollPageIndex < 0) {
					scrollPageIndex = scrollPage.length - 1;
				}
				scrollPageRun();
			}
		}
	}
});

function openGashaponInfo() {
	if (!getCookieValue("gashaponInfo")) {
		$.gbox.open(gashaponNoticeHTML, gashaponNoticeObj);
	}
}

function setCookieValue(name) {
	document.cookie = name + "=true";
}

function getCookieValue(name) {
	var nameString = name + "=";
	var value = document.cookie.split(";").filter(function (item) {
		return item.indexOf(nameString) > -1;
	});
	if (value.length) {
		return value[0].trim().substring(nameString.length, value[0].length);
	} else {
		return "";
	}
}

// 我知道了
$("body").on("click", ".privacy-btn__agree", function () {
	setCookieValue("LM");
	$(".privacy").remove();
});

// 獎勵清單查詢 - 全選
var checkAll = true;
$("body").on("change", ".reward-search-a__checkbox-all", function () {
	if (checkAll) {
		checkAll = false;
		$(".reward-search-a__checkbox").each(function (i, v) {
			if (!$(this).prop("disabled")) {
				$(this).prop("checked", true);
			}
		});
	} else {
		checkAll = true;
		$(".reward-search-a__checkbox").each(function (i, v) {
			if (!$(this).prop("disabled")) {
				$(this).prop("checked", false);
			}
		});
	}
});
$("body").on("click", ".reward-search-a__checkbox-all-btn", function () {
	if (checkAll) {
		checkAll = false;
		$(this).text("取消全選");
		$(".reward-search-a__checkbox").each(function (i, v) {
			if (!$(this).prop("disabled")) {
				$(this).prop("checked", true);
			}
		});
	} else {
		checkAll = true;
		$(this).text("全選");
		$(".reward-search-a__checkbox").each(function (i, v) {
			if (!$(this).prop("disabled")) {
				$(this).prop("checked", false);
			}
		});
	}
});

// 獲取hash
function getTarget(hash) {
	var h = hash;
	var page = h.slice(1);
	var findPage = scrollPage.filter(function (v) {
		return v.page == page;
	});
	if (findPage.length) {
		goPage(page);
	}
}

function goPage(page) {
	$("#app").attr("data-current", page);
	$(".entry").hide();
	navAddClass(page);
	pageAnim(page);
}

// hash改變時
window.addEventListener("hashchange", function () {
	var hash = location.hash;
	if (hash) {
		getTarget(hash);
	}
});

function privacyAppend() {
	privacyHTML = "";
	if (isMobile.any) {
		privacyHTML = '<div class="privacy">\
			<div class="privacy-box">\
				<div class="privacy-text">\
					<span>本網站使用瀏覽器紀錄(Cookie)為您提供更好的使用體驗，繼續瀏覽本網站表示您</span>\
					<span>閱讀並同意我們的隱私權保護政策。閱讀我們的<a href="https://event.beanfun.com/LineageM/PrivacyM/index.aspx" class="pricacy-text__pop" target="_blank">隱私權保護政策</a>以了解更多詳情。</span>\
				</div>\
				<a href="javascript:;" class="privacy-btn__agree">我知道了</a>\
			</div>\
		</div>\
		';
	} else {
		privacyHTML = '<div class="privacy">\
			<div class="privacy-box">\
				<div class="privacy-text">\
					<span>本網站最適合Chrome/IE11以上瀏覽器，顯示器建議1920x1080解析度，文字、應用程式，與其他項目的建議大小100%</span>\
					<span>瀏覽器紀錄(Cookie)為您提供更好的使用體驗， 繼續瀏覽本網站表示您閱讀並同意我們的隱私權保護政策。閱讀我們的</span>\
					<span><a href="https://event.beanfun.com/LineageM/PrivacyM/index.aspx" class="pricacy-text__pop" target="_blank">隱私權保護政策</a>以了解更多詳情。</span>\
				</div>\
				<a href="javascript:;" class="privacy-btn__agree">我知道了</a>\
			</div>\
		</div>\
		';
	}
	if (!getCookieValue("LM")) {
		$("#app").append(privacyHTML);
	}
}

// loading讀取時
loadingProgress({
	loadedFN: function () {
		var hash = location.hash;
		if (hash) {
			getTarget(hash);
		}
		if (!mbOpen) {
			// $(".entry__video1")[0].load();
			$(".entry__video1")[0].play();
		} else {
			// 測試
			// $(".entry__video1")[0].load();
			$(".entry__video1")[0].play();
		}
		var footerHTML = "";
		privacyAppend();
		if ($("#game-footer").length) {
			var footer = $(".UNI-footer").html();
			var footerHTML = "<div class='UNI-footer dark drag-page fixed'>" + footer + "</div>";
		}
		if (isMobile.any) {
			$(".UNI-footer").remove();
			var nav = $(".nav-wrap").html();
			var navHTML = "<div class='nav-wrap'>" + nav + "</div>";
			$(".nav-wrap").remove();
			$(".gashapon .section-contents").append(navHTML);
			$(".glory .section-contents").append(navHTML);
			if ($(".info").length) {
				$(".info .info__contents").append(navHTML);
			}
			if ($(".event").length) {
				$(".event .event__contents").append(navHTML);
			}
			$("#app").append(footerHTML);
			$(".section-contents").css("height", window.innerHeight + "px");
		} else {
			$(".entry .draggabled").append(footerHTML);
			$(".main .draggabled").append(footerHTML);
		}
		if (hash === "#main" || hash === "") {
			$(".UNI-footer").not(".drag-page").hide();
			if (!isMobile.any) {
				$("body").css("overflow", "hidden");
				$("body").css("min-width", "auto");
			}
		} else {
			$(".UNI-footer").not(".drag-page").show();
			if (!isMobile.any) {
				$("body").css("overflow", "auto");
				$("body").css("min-width", "1200px");
			}
		}
	},
});

$("body").on("click", ".glory-popup-close", function () {
	setCookieValue("LMReady");
	$(".glory-popup-box").remove();
});

$(".entry__video1")[0].onplaying = function () {
	$(".entry__video1").addClass("show");
};
$(".entry__video2")[0].onplaying = function () {
	$(".entry__video2").addClass("show");
};
$(".main__video1")[0].onplaying = function () {
	$(".main__video1").addClass("show");
};
$(".main__video2")[0].onplaying = function () {
	$(".main__video2").addClass("show");
};
