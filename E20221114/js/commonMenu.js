// 預設訊息
function WaitText(text) {
	$.gbox.open("<div class='error-text'>" + text + "</div>", {
		addClass: "default default-text",
		titleBar: " ",
		hasCloseBtn: true,
		hasActionBtn: false,
		afterOpen: function () {},
		afterClose: function () {
			$.gbox.close();
		},
	});
}
var serverTime = new Date($.ajax({ async: false }).getResponseHeader("Date"));

var LogoLinkList = [
	{ date: "2021/3/25 16:00:00", href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=5850", text: "遊戲攻略" },
	{ date: "2021/3/25 16:00:00", href: "https://tw.beanfun.com/game_zone/default.aspx?service_code=611639&service_region=T0", text: "啟動遊戲" },
	{ date: "2021/3/25 16:00:00", href: "https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/remastered/download/index.html", text: "遊戲下載" },
	{ date: "2021/3/25 16:00:00", href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=7082", text: "帳號申請" },
	{ date: "2021/4/1 16:00:00", href: "https://tw.hicdn.beanfun.com/beanfun/promo/LineageNew/E20210401_h/index.html", text: "改版主頁", box: "主頁即將上線，靜請期待。" },
];
var NavLinkList = [
	{ date: "2021/5/13 16:00:00", pc: true, mobile: true, href: "https://event.beanfun.com/LineageNew/E20210513/index.html", text: "<span>法師進化轉職活動</span>" },
	{ date: "2021/3/25 16:00:00", pc: true, mobile: true, href: "https://event.beanfun.com/LineageNew/E20210408/index.aspx", text: "<span>開城紀念好禮四選二</span>" },
	{ date: "2021/3/25 16:00:00", pc: true, mobile: true, href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=7469", text: "<span>熱門遊戲活動懶人包</span>" },
	{ date: "2021/3/25 16:00:00", pc: true, mobile: true, href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=7438", text: "<span>改版登入送加護</span>" },
	{ date: "2021/4/1 16:00:00", pc: true, mobile: true, href: "https://event.beanfun.com/Lineagenew/E20210318/Index.aspx", text: "英雄召集回歸活動" },
	{ date: "2021/4/1 16:00:00", pc: true, mobile: true, href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=7444", text: "改版抱團闖亞丁" },
	{ date: "2021/4/1 16:00:00", pc: true, mobile: true, href: "https://event.beanfun.com/LineageNew/E20210331/Index.aspx", text: "天堂寶物拍賣場" },
	{ date: "2021/3/25 16:00:00", pc: true, mobile: true, href: "https://event.beanfun.com/LineageNew/E20210311/index.aspx", text: "<span>勇士誕生祭壇</span><span>-開局小遊戲</span>" },
	{ date: "2021/4/1 16:00:00", pc: false, mobile: true, href: "https://tw.hicdn.beanfun.com/beanfun/promo/LineageNew/E20210401_h/index.html", text: "改版主頁" },
	{ date: "2021/3/25 16:00:00", pc: false, mobile: true, href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=7082", text: "帳號申請" },
	{ date: "2021/3/25 16:00:00", pc: false, mobile: true, href: "https://event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=5850", text: "遊戲攻略" },
];
var mCustomScrollbarCSS = '<link rel="stylesheet" href="https://tw.hicdn.beanfun.com/plugins/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css" />';
var mCustomScrollbarJS = '<script src="https://tw.hicdn.beanfun.com/plugins/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>';

var LogoBarHTML = '<section class="commonLogo-bar"><a href="https://tw.beanfun.com/lineagenew/www/index.aspx" class="commonLogo">logo</a><ul class="commonLogo-ul">{{liHTML}}</ul></section>';
var NavHTML = '<nav class="commonMenu-wrap on"><a href="https://tw.beanfun.com/lineagenew/www/index.aspx" class="commonMenu-logo"></a><a href="javascript:;" class="commonMenu-btn"></a><ul class="commonMenu-ul">{{liHTML}}</ul></nav>';

var LogoLiGroup = "";
var NavLiGroup = "";

LogoLinkList.forEach(function (link, i) {
	var openTime = link.date == "" ? "" : +new Date(link.date);
	var li = "";
	// li = '<li class="commonLogo-li"><a href="' + link.href + '" class="commonLogo-li__link" ' + (link.box ? "onclick=WaitText('" + link.box + "')" : 'target="_blank"') + ">" + link.text + "</a></li>";
	if (serverTime >= openTime && openTime !== "") {
		li = '<li class="commonLogo-li"><a href="' + link.href + '" class="commonLogo-li__link" target="_blank">' + link.text + "</a></li>";
	} else {
		li = '<li class="commonLogo-li"><a href="javascript:;" class="commonLogo-li__link" ' + (link.box ? "onclick=WaitText('" + link.box + "')" : 'target="_blank"') + ">" + link.text + "</a></li>";
	}
	LogoLiGroup += li;
});
NavLinkList.forEach(function (link, i) {
	var openTime = link.date == "" ? "" : +new Date(link.date);
	var li = "";
	if (serverTime >= openTime && openTime !== "") {
		li = '<li class="commonMenu-li" data-pc="' + link.pc + '" data-mobile="' + link.mobile + '"><a href="' + link.href + '" class="commonMenu-li__link" ' + (link.box ? "onclick=WaitText('" + link.box + "')" : '"') + ">" + link.text + "</a></li>";
	}
	NavLiGroup += li;
});

LogoBarHTML = LogoBarHTML.replace("{{liHTML}}", LogoLiGroup);
NavHTML = NavHTML.replace("{{liHTML}}", NavLiGroup);

// head.insertAdjacentHTML("beforeend", mCustomScrollbarCSS);
// head.insertAdjacentHTML("beforeend", mCustomScrollbarJS);

document.addEventListener("DOMContentLoaded", function () {
	var head = document.getElementsByTagName("head")[0];
	var body = document.getElementsByTagName("body")[0];
	body.insertAdjacentHTML("afterbegin", LogoBarHTML);
	body.insertAdjacentHTML("afterbegin", NavHTML);

	var menuBtn = document.querySelector(".commonMenu-btn");
	var menuWrap = document.querySelector(".commonMenu-wrap");
	var commonLogoWrap = document.querySelector(".commonLogo-bar");

	menuBtn.addEventListener("click", function () {
		if (menuWrap.className.split(" ").indexOf("on") > -1) {
			menuWrap.className = "commonMenu-wrap show";
		} else {
			menuWrap.className += " on";
		}
	});
	$(".commonMenu-ul").mCustomScrollbar({
		theme: "light",
	});
	setTimeout(function () {
		menuWrap.className += " show";
		commonLogoWrap.className += " show";
	}, 0);
});
